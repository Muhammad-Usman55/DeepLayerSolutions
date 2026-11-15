export interface CareerConfirmationParams {
  id?: string;
  fullName: string;
  position: string;
  email: string;
  siteUrl: string;
  submittedAt: string;
}

export function generateCareerConfirmationEmail(params: CareerConfirmationParams) {
  const { id, fullName, position, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");

  const emailSubject = `Application Received: ${position} - DeepLayer Solutions`;

  const plainText = `
DeepLayer Solutions
Candidate Application Confirmation

Dear ${fullName},

Thank you for your interest in DeepLayer Solutions and for submitting your application for the ${position} position.

We have received your application and resume. Our recruitment and technical leadership team is reviewing your profile, portfolio, and experience.

APPLICATION SUMMARY:
- Candidate Name: ${fullName}
- Position:       ${position}
- Reference ID:   ${id || "DLS-APP"}

WHAT HAPPENS NEXT:
1. Profile Review: Our technical leads assess your technical background and experience.
2. Screening Stage: Candidates whose background aligns with the role will be contacted within 2 to 3 business days for an introductory conversation.
3. Direct Follow-up: If you need to update your contact details or attach additional work samples, reply directly to this email.

Sincerely,
DeepLayer Solutions Talent & Engineering Team
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
                    <span style="display: inline-block; padding: 4px 10px; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-size: 11px; font-weight: 600; color: #008F53;">
                      Application Confirmed
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
                Application Received
              </h1>
              
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Dear ${fullName},
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Thank you for your interest in DeepLayer Solutions. We have received your application and resume for the <strong style="color: #0F172A;">${position}</strong> position.
              </p>

              <!-- Application Summary Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; width: 130px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Candidate
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #0F172A;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Target Role
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #008F53;">
                    ${position}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">
                    Status
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #334155;">
                    Under Technical Evaluation
                  </td>
                </tr>
              </table>

              <!-- Review Process Card -->
              <div style="background-color: #F0FDF4; border: 1px solid #DCFCE7; border-radius: 8px; padding: 18px 20px; margin-bottom: 28px;">
                <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                  Evaluation Process
                </div>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #166534;">
                  Our engineering and talent team reviews every submission thoroughly. If your profile matches our current engineering requirements, a technical lead will reach out within 2 to 3 business days to coordinate next steps.
                </p>
              </div>

              <!-- Contact & Follow-up Notice -->
              <p style="margin: 0 0 14px 0; font-size: 13px; color: #64748B;">
                Need to update your contact details or attach additional work samples?
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="mailto:deeplayersolutions@gmail.com?subject=Re:%20Application%20—%20${encodeURIComponent(position)}" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                      Reply via Email
                    </a>
                  </td>
                  <td>
                    <a href="https://wa.me/923166007316" style="display: inline-block; background-color: #FFFFFF; color: #0F172A; border: 1px solid #CBD5E1; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                      WhatsApp Contact
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
                    Lahore, Pakistan &bull; Talent &amp; Engineering Operations<br>
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
  };
}
