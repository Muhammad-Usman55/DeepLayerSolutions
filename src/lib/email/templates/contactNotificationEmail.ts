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
DEEPLAYER SOLUTIONS — NEW CLIENT INQUIRY RECEIVED
==================================================

Reference Number: ${referenceNumber}
Submission Date:  ${formattedDate} (UTC)

CLIENT DETAILS:
--------------------------------------------------
Full Name:        ${fullName}
Email Address:    ${email}
Company / Org:    ${company || "N/A"}
Service Required: ${service || "General Inquiry"}

INQUIRY OVERVIEW:
--------------------------------------------------
Subject:          ${subject}

Project Scope / Message:
${message}

--------------------------------------------------
Reply directly to this email to respond to ${fullName} (${email}).
System Audit Record: ${params.id}
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFCF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #142A27; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFCF9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #DFEDE5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 143, 83, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0A251D; padding: 24px 32px; border-bottom: 3px solid #008F53;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                      DeepLayer <span style="color: #34D399;">Solutions</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 600; color: #34D399; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 4px;">
                      Internal Architecture Inquiry Alert
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 12px; background-color: #12382C; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; font-family: monospace; font-size: 11px; font-weight: 700; color: #34D399;">
                      ${referenceNumber}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: #142A27; line-height: 1.25;">
                New Client Inquiry Received
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #64736F;">
                A new project inquiry has been submitted through the DeepLayer Solutions website and saved to the database.
              </p>

              <!-- Client Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFCF9; border: 1px solid #DFEDE5; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; width: 140px; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase; letter-spacing: 0.03em;">
                    Client Name
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 14px; font-weight: 700; color: #142A27;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase; letter-spacing: 0.03em;">
                    Email
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 14px; color: #008F53; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #008F53; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase; letter-spacing: 0.03em;">
                    Company
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 14px; color: #142A27;">
                    ${company || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase; letter-spacing: 0.03em;">
                    Service
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #DFEDE5; font-size: 14px; font-weight: 700; color: #008F53;">
                    ${service || "General Inquiry"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase; letter-spacing: 0.03em;">
                    Received At
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64736F;">
                    ${formattedDate} (UTC)
                  </td>
                </tr>
              </table>

              <!-- Inquiry Message Card -->
              <div style="background-color: #F4FAF6; border-left: 4px solid #008F53; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">
                  Subject: ${subject}
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #142A27; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Quick Action Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}%20[${referenceNumber}]" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 24px; box-shadow: 0 4px 12px rgba(0, 143, 83, 0.25);">
                      Reply Directly to Client &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAFCF9; border-top: 1px solid #DFEDE5; padding: 20px 32px; font-size: 11px; color: #64736F; text-align: center; line-height: 1.5;">
              DeepLayer Solutions Automated Triage Dispatcher &bull; Database Record ID: <span style="font-family: monospace;">${params.id}</span>
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

