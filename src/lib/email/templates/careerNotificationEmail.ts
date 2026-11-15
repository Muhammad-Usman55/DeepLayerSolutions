export interface CareerNotificationParams {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  portfolio?: string | null;
  resumeUrl: string;
  coverNote?: string | null;
  submittedAt: string;
}

export function generateCareerNotificationEmail(params: CareerNotificationParams) {
  const {
    id,
    fullName,
    email,
    phone,
    position,
    linkedin,
    portfolio,
    resumeUrl,
    coverNote,
    submittedAt,
  } = params;

  const formattedDate = new Date(submittedAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const emailSubject = `[Job Application] ${position} — ${fullName}`;

  const plainText = `
DeepLayer Solutions
Candidate Job Application Alert

Applicant: ${fullName}
Target Role: ${position}
Submission Time: ${formattedDate} (UTC)

CONTACT & PROFILE:
- Email: ${email}
- Phone/WhatsApp: ${phone}
- LinkedIn: ${linkedin}
- Portfolio/GitHub: ${portfolio || "N/A"}

RESUME / CV:
Download or view candidate resume:
${resumeUrl}

COVER NOTE:
${coverNote || "No cover note provided."}

Reply directly to this email to contact ${fullName} (${email}).
System ID: ${id || "Direct Upload"}
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
                      Recruitment &amp; Talent Pipeline
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-size: 11px; font-weight: 600; color: #008F53;">
                      ${position}
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
                New Job Application Received
              </h1>

              <!-- Candidate Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 20px; overflow: hidden;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; width: 120px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Candidate
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #0F172A;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Target Role
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #008F53;">
                    ${position}
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
                    Phone
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0F172A;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #0F172A; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    LinkedIn
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #008F53;">
                    <a href="${linkedin}" target="_blank" style="color: #008F53; text-decoration: underline;">View LinkedIn Profile</a>
                  </td>
                </tr>
                ${portfolio ? `
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Portfolio
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #008F53;">
                    <a href="${portfolio}" target="_blank" style="color: #008F53; text-decoration: underline;">${portfolio}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase;">
                    Submitted
                  </td>
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748B;">
                    ${formattedDate} (UTC)
                  </td>
                </tr>
              </table>

              <!-- Resume Download Action Card -->
              <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px; text-align: center;">
                <div style="font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 10px;">
                  Candidate Resume / CV Available
                </div>
                <a href="${resumeUrl}" target="_blank" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 24px; border-radius: 6px;">
                  Open / Download CV &rarr;
                </a>
              </div>

              ${coverNote ? `
              <!-- Cover Note Card -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #008F53; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">
                  Candidate Cover Note
                </div>
                <div style="font-size: 13px; line-height: 1.6; color: #0F172A; white-space: pre-wrap;">${coverNote}</div>
              </div>
              ` : ''}

              <!-- Quick Communication Action Buttons -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="mailto:${email}?subject=DeepLayer%20Solutions%20Application%20—%20${encodeURIComponent(position)}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                      Email Candidate
                    </a>
                  </td>
                  <td>
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="display: inline-block; background-color: #FFFFFF; color: #0F172A; border: 1px solid #CBD5E1; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                      WhatsApp Candidate
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #F1F5F9; padding: 16px 32px; font-size: 11px; color: #94A3B8; text-align: left; line-height: 1.5;">
              Audit ID: <span style="font-family: ui-monospace, Menlo, Consolas, monospace;">${id || "direct_upload"}</span> &bull; DeepLayer Solutions Applicant Tracking System
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
