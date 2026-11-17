import type { ContactSubmissionStatus } from "@/types/supabase";

export interface InquiryStatusUpdateParams {
  referenceNumber: string;
  fullName: string;
  subject: string;
  service?: string | null;
  status: ContactSubmissionStatus;
  adminNotes?: string | null;
  siteUrl: string;
}

interface StatusConfig {
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  headline: string;
  summary: string;
  nextSteps: string;
}

const STATUS_CONFIGS: Record<ContactSubmissionStatus, StatusConfig> = {
  in_review: {
    label: "Under Technical Review",
    badgeBg: "#FEF3C7",
    badgeBorder: "#FDE68A",
    badgeText: "#92400E",
    headline: "Your Inquiry is Under Architectural Review",
    summary:
      "Our senior software architects and engineering team are actively reviewing your project specifications, tech stack requirements, and scope documentation.",
    nextSteps:
      "A technical lead will assess architecture feasibility, estimation, and deliverable milestones. We will get in touch with you shortly.",
  },
  contacted: {
    label: "Consultation in Progress",
    badgeBg: "#EFF6FF",
    badgeBorder: "#BFDBFE",
    badgeText: "#1E40AF",
    headline: "Consultation Workflow Initiated",
    summary:
      "A DeepLayer Solutions technical lead or enterprise solution consultant has initiated direct correspondence regarding your project inquiry.",
    nextSteps:
      "Please check your inbox or communication channel for our follow-up. You can also reply directly to this email to coordinate schedules.",
  },
  closed: {
    label: "Inquiry Resolved / Finalized",
    badgeBg: "#F0FDF4",
    badgeBorder: "#BBF7D0",
    badgeText: "#008F53",
    headline: "Inquiry Finalized & Closed",
    summary:
      "Your inquiry and technical scope review under this reference has been marked as resolved/finalized in our systems.",
    nextSteps:
      "If you require further architectural consulting, system design, or engineering sprints in the future, simply reply to this email or submit a new brief.",
  },
  new: {
    label: "Received & Queued",
    badgeBg: "#F0FDF4",
    badgeBorder: "#BBF7D0",
    badgeText: "#008F53",
    headline: "Inquiry Registered in Queue",
    summary:
      "Your project brief is registered in our engineering pipeline awaiting triage assignment.",
    nextSteps:
      "Our technical team will review your requirements and follow up within one business day.",
  },
  spam: {
    label: "Flagged",
    badgeBg: "#F1F5F9",
    badgeBorder: "#E2E8F0",
    badgeText: "#64748B",
    headline: "Inquiry Flagged",
    summary: "Your inquiry has been archived.",
    nextSteps: "No action required.",
  },
};

export function generateInquiryStatusUpdateEmail(params: InquiryStatusUpdateParams) {
  const { referenceNumber, fullName, subject, service, status, adminNotes, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.in_review;

  const emailSubject = `Status Update on Inquiry #${referenceNumber}: ${config.label} | DeepLayer Solutions`;

  const plainText = `
DeepLayer Solutions
Inquiry Status Update: ${config.label}

Reference: ${referenceNumber}
Dear ${fullName},

${config.summary}

STATUS DETAILS:
- Inquiry Ref:  ${referenceNumber}
- Current Status: ${config.label}
- Service Area: ${service || "Enterprise Engineering"}
- Project Subject: ${subject}
${adminNotes ? `\nMESSAGE FROM TECHNICAL TEAM:\n${adminNotes}\n` : ""}
WHAT'S NEXT:
${config.nextSteps}

If you have additional scope documents or questions:
Reply directly to this email or contact our technical team at ${normalizedSiteUrl}/contact.

Sincerely,
DeepLayer Solutions Technical Architecture Team
${normalizedSiteUrl}
Lahore, Pakistan
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; -webkit-font-smoothing: antialiased; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);">
          
          <!-- Top Accent Line -->
          <tr>
            <td style="background-color: #008F53; height: 4px; line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 36px 20px 36px; border-bottom: 1px solid #F1F5F9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
                      DeepLayer <span style="color: #008F53;">Solutions</span>
                    </div>
                    <div style="font-size: 12px; font-weight: 500; color: #64748B; margin-top: 2px;">
                      Software Architecture &amp; Artificial Intelligence
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; background-color: ${config.badgeBg}; border: 1px solid ${config.badgeBorder}; border-radius: 6px; font-size: 11px; font-weight: 700; color: ${config.badgeText};">
                      ${config.label}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 36px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0F172A; line-height: 1.3;">
                ${config.headline}
              </h1>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Dear ${fullName},
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                ${config.summary}
              </p>

              <!-- Status Details Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; width: 35%;">Reference</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #008F53; font-family: ui-monospace, Menlo, Consolas, monospace;">${referenceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B;">Updated Status</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 700; color: ${config.badgeText};">${config.label}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B;">Service Domain</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0F172A;">${service || "Enterprise Engineering"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B;">Project Subject</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0F172A;">${subject}</td>
                </tr>
              </table>

              ${
                adminNotes
                  ? `
              <!-- Admin Note / Instructions Callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                      Note from DeepLayer Technical Team:
                    </div>
                    <div style="font-size: 13px; color: #14532D; line-height: 1.6; white-space: pre-wrap;">${adminNotes}</div>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }

              <!-- What's Next Box -->
              <div style="padding: 16px 20px; background-color: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                  Next Steps
                </div>
                <div style="font-size: 13px; color: #4B5563; line-height: 1.6;">
                  ${config.nextSteps}
                </div>
              </div>

              <!-- Action Link -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 0 16px 0;">
                    <a href="${normalizedSiteUrl}/contact" style="display: inline-block; padding: 12px 28px; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Contact Engineering Team
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748B; line-height: 1.6;">
                You can also reply directly to this email at any time to share additional project specifications, timeline updates, or questions.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748B;">
                DeepLayer Solutions &bull; Software Architecture &amp; Artificial Intelligence
              </p>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #94A3B8;">
                Lahore, Pakistan &bull; Phone: +92 316 6007316 &bull; Email: deeplayersolutions@gmail.com
              </p>
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                <a href="${normalizedSiteUrl}" style="color: #008F53; text-decoration: none;">www.deeplayersolutions.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return {
    subject: emailSubject,
    plainText,
    text: plainText,
    html,
  };
}
