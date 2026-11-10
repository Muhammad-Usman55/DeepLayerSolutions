import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  getGmailClient,
  getFromEmail,
  getCompanyEmail,
  getSiteUrl,
  sendGmailMessage,
} from "./gmail";
import { generateContactNotificationEmail } from "./templates/contactNotificationEmail";
import { generateContactConfirmationEmail } from "./templates/contactConfirmationEmail";
import { generateNewsletterConfirmationEmail } from "./templates/newsletterConfirmationEmail";
import { generateNewsletterWelcomeEmail } from "./templates/newsletterWelcomeEmail";
import { generateUnsubscribeToken } from "./tokens";

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
 * for a validated, stored contact inquiry via Google Cloud Gmail API.
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
  const gmail = getGmailClient();
  const companyEmail = getCompanyEmail();
  const siteUrl = getSiteUrl();

  // If Gmail API credentials are not yet configured, record failed status in audit log and return gracefully
  if (!gmail) {
    console.warn(
      `[GMAIL UNCONFIGURED] Inquiry ${inquiry.referenceNumber} saved to DB. Email dispatch skipped: GOOGLE_CLIENT_SECRET or GOOGLE_REFRESH_TOKEN is not set.`
    );

    const unconfiguredResult: EmailDispatchResult = {
      recipient: companyEmail,
      type: "contact_notification",
      status: "failed",
      error:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured.",
    };

    await logEmailAttempt({
      recipient: companyEmail,
      emailType: "contact_notification",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured in environment.",
    });

    await logEmailAttempt({
      recipient: inquiry.email,
      emailType: "contact_autoresponder",
      relatedRecordId: inquiry.id,
      status: "failed",
      errorMessage:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured in environment.",
    });

    return {
      notification: unconfiguredResult,
      confirmation: {
        recipient: inquiry.email,
        type: "contact_autoresponder",
        status: "failed",
        error:
          "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured.",
      },
    };
  }

  // --------------------------------------------------------------------------
  // EMAIL 1: Company Notification Alert
  // --------------------------------------------------------------------------
  let notificationResult: EmailDispatchResult;
  try {
    const notificationTemplate = generateContactNotificationEmail(inquiry);

    const sendRes = await sendGmailMessage({
      to: companyEmail,
      replyTo: inquiry.email, // Allows one-click reply directly to client
      subject: notificationTemplate.subject,
      html: notificationTemplate.html,
      text: notificationTemplate.text,
    });

    console.info(
      `[GMAIL NOTIFICATION SENT] Ref: ${inquiry.referenceNumber} | ID: ${sendRes.id}`
    );
    notificationResult = {
      recipient: companyEmail,
      type: "contact_notification",
      status: "sent",
      providerMessageId: sendRes.id,
    };
    await logEmailAttempt({
      recipient: companyEmail,
      emailType: "contact_notification",
      relatedRecordId: inquiry.id,
      providerMessageId: sendRes.id,
      status: "sent",
    });
  } catch (err: any) {
    const errStr =
      err?.message || "Unexpected error during Gmail notification dispatch";
    console.error(
      `[GMAIL NOTIFICATION ERROR] Ref: ${inquiry.referenceNumber}:`,
      errStr
    );
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

    const sendRes = await sendGmailMessage({
      to: inquiry.email,
      replyTo: companyEmail,
      subject: confirmationTemplate.subject,
      html: confirmationTemplate.html,
      text: confirmationTemplate.text,
    });

    console.info(
      `[GMAIL CONFIRMATION SENT] Ref: ${inquiry.referenceNumber} | ID: ${sendRes.id}`
    );
    confirmationResult = {
      recipient: inquiry.email,
      type: "contact_autoresponder",
      status: "sent",
      providerMessageId: sendRes.id,
    };
    await logEmailAttempt({
      recipient: inquiry.email,
      emailType: "contact_autoresponder",
      relatedRecordId: inquiry.id,
      providerMessageId: sendRes.id,
      status: "sent",
    });
  } catch (err: any) {
    const errStr =
      err?.message || "Unexpected error during Gmail confirmation dispatch";
    console.error(
      `[GMAIL CONFIRMATION ERROR] Ref: ${inquiry.referenceNumber}:`,
      errStr
    );
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

/**
 * Dispatches a double opt-in confirmation email to a new or pending subscriber.
 * Contains a secure 48-hour confirmation link.
 */
export async function sendNewsletterConfirmationEmail(params: {
  email: string;
  rawToken: string;
  subscriberId?: string | null;
}): Promise<EmailDispatchResult> {
  const { email, rawToken, subscriberId } = params;
  const gmail = getGmailClient();
  const siteUrl = getSiteUrl();

  if (!gmail) {
    console.warn(
      `[GMAIL UNCONFIGURED] Newsletter confirmation for ${email} skipped: GOOGLE_CLIENT_SECRET or GOOGLE_REFRESH_TOKEN is not set.`
    );
    const unconfiguredResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_confirmation",
      status: "failed",
      error:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured.",
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_confirmation",
      relatedRecordId: subscriberId || null,
      status: "failed",
      errorMessage:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured in environment.",
    });
    return unconfiguredResult;
  }

  try {
    const template = generateNewsletterConfirmationEmail({
      email,
      rawToken,
      siteUrl,
    });

    const sendRes = await sendGmailMessage({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.info(`[GMAIL NEWSLETTER CONFIRMATION SENT] ${email} | ID: ${sendRes.id}`);
    const successResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_confirmation",
      status: "sent",
      providerMessageId: sendRes.id,
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_confirmation",
      relatedRecordId: subscriberId || null,
      providerMessageId: sendRes.id,
      status: "sent",
    });
    return successResult;
  } catch (err: any) {
    const errStr =
      err?.message || "Unexpected error during Gmail confirmation dispatch";
    console.error(`[GMAIL NEWSLETTER CONFIRMATION ERROR] ${email}:`, errStr);
    const exceptionResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_confirmation",
      status: "failed",
      error: errStr,
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_confirmation",
      relatedRecordId: subscriberId || null,
      status: "failed",
      errorMessage: errStr,
    });
    return exceptionResult;
  }
}

/**
 * Dispatches a welcome email to a newly confirmed newsletter subscriber.
 * Includes a cryptographic one-click unsubscribe link.
 */
export async function sendNewsletterWelcomeEmail(params: {
  email: string;
  subscriberId?: string | null;
}): Promise<EmailDispatchResult> {
  const { email, subscriberId } = params;
  const gmail = getGmailClient();
  const siteUrl = getSiteUrl();

  const unsubscribeKey = generateUnsubscribeToken(email);

  if (!gmail) {
    console.warn(
      `[GMAIL UNCONFIGURED] Newsletter welcome for ${email} skipped: GOOGLE_CLIENT_SECRET or GOOGLE_REFRESH_TOKEN is not set.`
    );
    const unconfiguredResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_welcome",
      status: "failed",
      error:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured.",
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_welcome",
      relatedRecordId: subscriberId || null,
      status: "failed",
      errorMessage:
        "Gmail API credentials (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) are not configured in environment.",
    });
    return unconfiguredResult;
  }

  try {
    const template = generateNewsletterWelcomeEmail({
      email,
      unsubscribeKey,
      siteUrl,
    });

    const sendRes = await sendGmailMessage({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.info(`[GMAIL NEWSLETTER WELCOME SENT] ${email} | ID: ${sendRes.id}`);
    const successResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_welcome",
      status: "sent",
      providerMessageId: sendRes.id,
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_welcome",
      relatedRecordId: subscriberId || null,
      providerMessageId: sendRes.id,
      status: "sent",
    });
    return successResult;
  } catch (err: any) {
    const errStr =
      err?.message || "Unexpected error during Gmail welcome dispatch";
    console.error(`[GMAIL NEWSLETTER WELCOME ERROR] ${email}:`, errStr);
    const exceptionResult: EmailDispatchResult = {
      recipient: email,
      type: "newsletter_welcome",
      status: "failed",
      error: errStr,
    };
    await logEmailAttempt({
      recipient: email,
      emailType: "newsletter_welcome",
      relatedRecordId: subscriberId || null,
      status: "failed",
      errorMessage: errStr,
    });
    return exceptionResult;
  }
}
