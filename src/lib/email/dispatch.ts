import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getResendClient, getFromEmail, getCompanyEmail, getSiteUrl } from "./resend";
import {
  generateContactNotificationEmail,
  ContactNotificationParams,
} from "./templates/contactNotificationEmail";
import {
  generateContactConfirmationEmail,
  ContactConfirmationParams,
} from "./templates/contactConfirmationEmail";

export interface EmailDispatchResult {
  recipient: string;
  type: string;
  status: "sent" | "failed" | "skipped";
  providerMessageId?: string | null;
  error?: string | null;
}

/**
 * Safely records an email dispatch attempt to the Supabase email_logs audit table.
 * Never throws an error that interrupts the caller.
 */
async function logEmailAttempt(params: {
  recipient: string;
  emailType:
    | "contact_notification"
    | "contact_autoresponder"
    | "newsletter_confirmation"
    | "newsletter_welcome"
    | "system_alert";
  relatedRecordId?: string | null;
  providerMessageId?: string | null;
  status: "queued" | "sent" | "delivered" | "failed" | "bounced";
  errorMessage?: string | null;
}) {
  try {
    const supabase = createAdminClient();
    await supabase.from("email_logs").insert({
      recipient: params.recipient.toLowerCase().trim(),
      email_type: params.emailType,
      related_record_id: params.relatedRecordId || null,
      provider_message_id: params.providerMessageId || null,
      status: params.status,
      error_message: params.errorMessage || null,
    });
  } catch (err: any) {
    console.error("[EMAIL LOG INSERT ERROR]", err?.message || err);
  }
}

/**
 * Dispatches both the internal company alert and the client confirmation email
 * for a validated, stored contact inquiry.
 *
 * CRITICAL RELIABILITY RULES:
 * 1. The inquiry record is already committed in PostgreSQL before this function is called.
 * 2. An email dispatch failure or unconfigured API key NEVER rolls back or loses the inquiry.
 * 3. All dispatch attempts are recorded in `email_logs`.
 */
export async function sendContactInquiryEmails(inquiry: {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  company?: string | null;
  service?: string | null;
  subject: string;
  message: string;
  submittedAt: string;
}): Promise<{
  notification: EmailDispatchResult;
  confirmation: EmailDispatchResult;
}> {
  const resend = getResendClient();
  const fromEmail = getFromEmail();
  const companyEmail = getCompanyEmail();
  const siteUrl = getSiteUrl();

  // If Resend API key is not yet configured, record failed status in audit log and return gracefully
  if (!resend) {
    console.warn(
      `[RESEND UNCONFIGURED] Inquiry ${inquiry.referenceNumber} saved to DB. Email dispatch skipped: RESEND_API_KEY is not set.`
    );

    const unconfiguredResult: EmailDispatchResult = {
      recipient: companyEmail,
      type: "contact_notification",
      status: "failed",
      error: "RESEND_API_KEY environment variable is not configured.",
    };

    await logEmailAttempt({
      recipient: companyEmail,
      emailType: "contact_notification",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage: "RESEND_API_KEY is not configured in environment.",
    });

    await logEmailAttempt({
      recipient: inquiry.email,
      emailType: "contact_autoresponder",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage: "RESEND_API_KEY is not configured in environment.",
    });

    return {
      notification: unconfiguredResult,
      confirmation: {
        recipient: inquiry.email,
        type: "contact_autoresponder",
        status: "failed",
        error: "RESEND_API_KEY environment variable is not configured.",
      },
    };
  }

  // --------------------------------------------------------------------------
  // EMAIL 1: Company Notification Alert
  // --------------------------------------------------------------------------
  let notificationResult: EmailDispatchResult;
  try {
    const notificationTemplate = generateContactNotificationEmail(inquiry);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [companyEmail],
      replyTo: inquiry.email, // Allows one-click reply directly to client
      subject: notificationTemplate.subject,
      html: notificationTemplate.html,
      text: notificationTemplate.text,
    });

    if (error || !data?.id) {
      const errStr = error?.message || "Resend rejected company notification";
      console.error(`[RESEND NOTIFICATION ERROR] Ref: ${inquiry.referenceNumber}:`, errStr);
      notificationResult = {
        recipient: companyEmail,
        type: "contact_notification",
        status: "failed",
        error: errStr,
      };
      await logEmailAttempt({
        recipient: companyEmail,
        emailType: "contact_notification",
        relatedRecordId: inquiry.id,
        status: "failed",
        errorMessage: errStr,
      });
    } else {
      console.info(`[RESEND NOTIFICATION SENT] Ref: ${inquiry.referenceNumber} | ID: ${data.id}`);
      notificationResult = {
        recipient: companyEmail,
        type: "contact_notification",
        status: "sent",
        providerMessageId: data.id,
      };
      await logEmailAttempt({
        recipient: companyEmail,
        emailType: "contact_notification",
        relatedRecordId: inquiry.id,
        providerMessageId: data.id,
        status: "sent",
      });
    }
  } catch (err: any) {
    const errStr = err?.message || "Unexpected error during notification dispatch";
    console.error(`[RESEND NOTIFICATION EXCEPTION] Ref: ${inquiry.referenceNumber}:`, errStr);
    notificationResult = {
      recipient: companyEmail,
      type: "contact_notification",
      status: "failed",
      error: errStr,
    };
    await logEmailAttempt({
      recipient: companyEmail,
      emailType: "contact_notification",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage: errStr,
    });
  }

  // --------------------------------------------------------------------------
  // EMAIL 2: Visitor Confirmation Autoresponder
  // --------------------------------------------------------------------------
  let confirmationResult: EmailDispatchResult;
  try {
    const confirmationTemplate = generateContactConfirmationEmail({
      referenceNumber: inquiry.referenceNumber,
      fullName: inquiry.fullName,
      subject: inquiry.subject,
      service: inquiry.service,
      submittedAt: inquiry.submittedAt,
      siteUrl,
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [inquiry.email],
      replyTo: companyEmail,
      subject: confirmationTemplate.subject,
      html: confirmationTemplate.html,
      text: confirmationTemplate.text,
    });

    if (error || !data?.id) {
      const errStr = error?.message || "Resend rejected visitor confirmation";
      console.error(`[RESEND CONFIRMATION ERROR] Ref: ${inquiry.referenceNumber}:`, errStr);
      confirmationResult = {
        recipient: inquiry.email,
        type: "contact_autoresponder",
        status: "failed",
        error: errStr,
      };
      await logEmailAttempt({
        recipient: inquiry.email,
        emailType: "contact_autoresponder",
        relatedRecordId: inquiry.id,
        status: "failed",
        errorMessage: errStr,
      });
    } else {
      console.info(`[RESEND CONFIRMATION SENT] Ref: ${inquiry.referenceNumber} | ID: ${data.id}`);
      confirmationResult = {
        recipient: inquiry.email,
        type: "contact_autoresponder",
        status: "sent",
        providerMessageId: data.id,
      };
      await logEmailAttempt({
        recipient: inquiry.email,
        emailType: "contact_autoresponder",
        relatedRecordId: inquiry.id,
        providerMessageId: data.id,
        status: "sent",
      });
    }
  } catch (err: any) {
    const errStr = err?.message || "Unexpected error during confirmation dispatch";
    console.error(`[RESEND CONFIRMATION EXCEPTION] Ref: ${inquiry.referenceNumber}:`, errStr);
    confirmationResult = {
      recipient: inquiry.email,
      type: "contact_autoresponder",
      status: "failed",
      error: errStr,
    };
    await logEmailAttempt({
      recipient: inquiry.email,
      emailType: "contact_autoresponder",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage: errStr,
    });
  }

  return {
    notification: notificationResult,
    confirmation: confirmationResult,
  };
}

