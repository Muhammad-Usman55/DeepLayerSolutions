export interface NewsletterConfirmationParams {
  email: string;
  rawToken: string;
  siteUrl: string;
}

export function generateNewsletterConfirmationEmail(params: NewsletterConfirmationParams) {
  const { email, rawToken, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const confirmUrl = `${normalizedSiteUrl}/newsletter/confirm?token=${encodeURIComponent(rawToken)}`;

  const emailSubject = "Confirm your subscription - DeepLayer Solutions";

  const plainText = `
DeepLayer Solutions
Subscription Confirmation

Hello,

We received a request to subscribe ${email} to DeepLayer Solutions engineering publications and architecture briefings.

To verify your email address and activate your subscription, please visit the confirmation link below:

${confirmUrl}

SECURITY NOTICE:
This confirmation link is valid for 48 hours. If you did not make this request, you can safely ignore this email. No subscription will be activated without your confirmation.

Sincerely,
DeepLayer Solutions Engineering Team
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
              <div style="font-size: 20px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
                DeepLayer <span style="color: #008F53;">Solutions</span>
              </div>
              <div style="font-size: 12px; font-weight: 500; color: #64748B; margin-top: 2px;">
                Software Architecture &amp; Engineering Publications
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 36px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0F172A; line-height: 1.3;">
                Confirm Your Subscription
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                We received a request to subscribe <strong style="color: #0F172A;">${email}</strong> to DeepLayer Solutions engineering briefings and technical articles.
              </p>
              
              <p style="margin: 0 0 28px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                To complete your verification and begin receiving our updates, please confirm your email address by selecting the button below.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <a href="${confirmUrl}" target="_blank" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 6px;">
                      Confirm Subscription
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry Alert Notice -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; font-size: 13px; line-height: 1.5; color: #475569; margin-bottom: 24px;">
                <strong style="color: #0F172A;">Verification notice:</strong> This link is active for 48 hours. If you did not make this request, you may disregard this email. No subscription will be created without confirmation.
              </div>

              <!-- Raw Link Fallback -->
              <div style="font-size: 12px; color: #64748B; word-break: break-all; line-height: 1.5;">
                If the button above does not open, copy and paste this address into your browser:<br>
                <a href="${confirmUrl}" style="color: #008F53; text-decoration: underline;">${confirmUrl}</a>
              </div>
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
    plainText,
    text: plainText,
    html,
  };
}
