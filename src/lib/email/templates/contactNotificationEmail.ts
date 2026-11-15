export interface ContactNotificationParams {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  company?: string | null;
  service?: string | null;
  subject: string;
  message: string;
  submittedAt: string;
}

export function generateContactNotificationEmail(params: ContactNotificationParams) {
  const {
    referenceNumber,
    fullName,
    email,
    company,
    service,
    subject,
    message,
    submittedAt,
  } = params;

  const formattedDate = new Date(submittedAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const emailSubject = `[Inquiry Alert] ${referenceNumber}: ${subject} — ${fullName}`;

  const plainText = `
DeepLayer Solutions
Internal Client Inquiry Alert

Reference Number: ${referenceNumber}
Submission Time:  ${formattedDate} (UTC)

CLIENT DETAILS:
- Name:    ${fullName}
- Email:   ${email}
- Company: ${company || "Not specified"}
- Domain:  ${service || "General Inquiry"}

INQUIRY:
- Subject: ${subject}
- Message:
${message}

Reply directly to this email to respond to ${fullName} (${email}).
Record ID: ${params.id}
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
            <td style="padding: 24px 32px; border-bottom: 1px solid #F1F5F9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 18px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
                      DeepLayer <span style="color: #008F53;">Solutions</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 600; color: #008F53; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 2px;">
                      Internal Client Inquiry Alert
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; font-weight: 600; color: #008F53;">
                      ${referenceNumber}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0F172A; line-height: 1.3;">
                New Project Inquiry Received
              </h1>

              <!-- Client Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 20px; overflow: hidden;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; width: 120px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Client
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #0F172A;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Email
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #008F53; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #008F53; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Company
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0F172A;">
                    ${company || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Service Domain
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #008F53;">
                    ${service || "General Inquiry"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Timestamp
                  </td>
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748B;">
                    ${formattedDate} (UTC)
                  </td>
                </tr>
              </table>

              <!-- Inquiry Message Card -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #008F53; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">
                  Subject: ${subject}
                </div>
                <div style="font-size: 13px; line-height: 1.6; color: #0F172A; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Quick Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}%20[${referenceNumber}]" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 6px;">
                      Reply Directly to Client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #F1F5F9; padding: 16px 32px; font-size: 11px; color: #94A3B8; text-align: left; line-height: 1.5;">
              Audit ID: <span style="font-family: ui-monospace, Menlo, Consolas, monospace;">${params.id}</span> &bull; DeepLayer Solutions Ingestion Pipeline
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
    html,
    text: plainText,
  };
}
