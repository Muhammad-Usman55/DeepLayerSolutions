export interface ContactConfirmationParams {
  referenceNumber: string;
  fullName: string;
  subject: string;
  service?: string | null;
  submittedAt: string;
  siteUrl: string;
}

export function generateContactConfirmationEmail(params: ContactConfirmationParams) {
  const { referenceNumber, fullName, subject, service, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");

  const emailSubject = `Inquiry Received: #${referenceNumber} | DeepLayer Solutions`;

  const plainText = `
DeepLayer Solutions
Inquiry Confirmation

Reference Number: ${referenceNumber}

Dear ${fullName},

Thank you for contacting DeepLayer Solutions. We have received your project inquiry and forwarded it to our technical architecture team for review.

INQUIRY DETAILS:
- Reference: ${referenceNumber}
- Service Domain: ${service || "Technical Consultation"}
- Subject: ${subject}

WHAT TO EXPECT NEXT:
Our senior engineering team reviews project specifications, architecture requirements, and timeline constraints. A technical lead will follow up with detailed next steps within one business day.

To share additional technical documentation or update your project scope, reply directly to this email or visit our contact portal at ${normalizedSiteUrl}/contact.

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
            <td style="padding: 32px 36px 20px 36px; border-bottom: 1px solid #F1F5F9;">
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
            <td style="padding: 32px 36px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0F172A; line-height: 1.3;">
                Inquiry Received
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Dear ${fullName},
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Thank you for contacting DeepLayer Solutions. We have received your inquiry and registered it in our engineering queue under reference <strong style="color: #0F172A;">${referenceNumber}</strong>.
              </p>

              <!-- Details Summary Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; width: 130px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Reference
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-family: ui-monospace, Menlo, Consolas, monospace; font-weight: 700; color: #008F53;">
                    ${referenceNumber}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Domain
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #0F172A;">
                    ${service || "Technical Consultation"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Subject
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #334155;">
                    ${subject}
                  </td>
                </tr>
              </table>

              <!-- Process Step Callout -->
              <div style="background-color: #F0FDF4; border: 1px solid #DCFCE7; border-radius: 8px; padding: 18px 20px; margin-bottom: 28px;">
                <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                  Review Process
                </div>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #166534;">
                  Our architecture team will review your specifications, scope, and technical requirements. A technical architect will respond within one business day with assessment details and next steps.
                </p>
              </div>

              <!-- Quick Communication Action Buttons -->
              <p style="margin: 0 0 14px 0; font-size: 13px; color: #64748B;">
                Need to attach technical documentation or update project scope?
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="mailto:deeplayersolutions@gmail.com?subject=Inquiry%20${referenceNumber}" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 6px;">
                      Reply to Email
                    </a>
                  </td>
                  <td>
                    <a href="${normalizedSiteUrl}/contact" style="display: inline-block; background-color: #FFFFFF; color: #0F172A; border: 1px solid #CBD5E1; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 6px;">
                      Visit Contact Portal
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #F1F5F9; padding: 24px 36px; text-align: left; font-size: 12px; color: #64748B; line-height: 1.6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #64748B;">
                    <strong style="color: #0F172A;">DeepLayer Solutions</strong><br>
                    Lahore, Pakistan &bull; Engineering &amp; AI Systems<br>
                    <a href="${normalizedSiteUrl}" style="color: #008F53; text-decoration: none;">www.deeplayersolutions.com</a>
                  </td>
                  <td align="right" valign="bottom" style="font-size: 11px; color: #94A3B8;">
                    &copy; ${new Date().getFullYear()} DeepLayer Solutions
                  </td>
                </tr>
              </table>
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
    plainText,
  };
}
