export interface NewsletterConfirmationParams {
  email: string;
  rawToken: string;
  siteUrl: string;
}

export function generateNewsletterConfirmationEmail(params: NewsletterConfirmationParams) {
  const { email, rawToken, siteUrl } = params;
  const confirmUrl = `${siteUrl.replace(/\/$/, "")}/newsletter/confirm?token=${encodeURIComponent(rawToken)}`;

  const emailSubject = "Confirm your DeepLayer Solutions newsletter subscription";

  const plainText = `
DEEPLAYER SOLUTIONS — CONFIRM SUBSCRIPTION
===========================================

Hello,

Thank you for requesting to join the DeepLayer Solutions newsletter!

To complete your subscription and start receiving our engineering insights, AI architecture breakdowns, and tech updates, please confirm your email address by visiting this link:

${confirmUrl}

SECURITY NOTE:
-------------------------------------------
This confirmation link expires in 48 hours.
If you did not make this request, you can safely ignore this email. No subscription will be activated without your confirmation.

Warm regards,
The DeepLayer Solutions Engineering Team
https://deeplayersolutions.vercel.app
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
        <!-- Main Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #DFEDE5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 143, 83, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0A251D; padding: 32px 32px; text-align: center; border-bottom: 3px solid #008F53;">
              <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                DeepLayer <span style="color: #34D399;">Solutions</span>
              </div>
              <div style="font-size: 11px; font-weight: 600; color: #34D399; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 6px;">
                Intelligent Digital Experiences &bull; Build &bull; Innovate &bull; Scale
              </div>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 36px 32px 28px 32px; text-align: center;">
              <!-- Mail Icon Badge -->
              <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #E9FFF2; border: 2px solid #BCE8CF; color: #008F53; font-size: 24px; text-align: center; margin-bottom: 20px;">
                &#9993;
              </div>

              <h1 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; color: #142A27; line-height: 1.25;">
                Confirm Your Subscription
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4B5E59; max-width: 480px; margin-left: auto; margin-right: auto;">
                Thank you for subscribing to DeepLayer Solutions insights! To ensure this request came from you, please verify your email address (<strong>${email}</strong>) by clicking the button below.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 28px auto;">
                <tr>
                  <td align="center" style="border-radius: 9999px; background-color: #008F53;">
                    <a href="${confirmUrl}" target="_blank" style="display: inline-block; padding: 15px 36px; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 9999px; background-color: #008F53; letter-spacing: 0.01em;">
                      Confirm Subscription &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry Alert Notice -->
              <div style="background-color: #F3F7F5; border: 1px solid #DFEDE5; border-radius: 10px; padding: 14px 20px; font-size: 13px; line-height: 1.5; color: #4B5E59; max-width: 480px; margin: 0 auto; text-align: left;">
                <strong style="color: #142A27;">Link Validity:</strong> This confirmation link expires in <strong>48 hours</strong>. If you did not make this request, you can simply ignore this email; you will not be subscribed.
              </div>

              <!-- Raw Link Fallback -->
              <div style="margin-top: 24px; font-size: 12px; color: #64736F; word-break: break-all; line-height: 1.5;">
                Button not working? Copy and paste this URL into your browser:<br>
                <a href="${confirmUrl}" style="color: #008F53; text-decoration: underline;">${confirmUrl}</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAFCF9; border-top: 1px solid #DFEDE5; padding: 24px 32px; text-align: center; font-size: 12px; color: #64736F; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #142A27;">
                DeepLayer Solutions
              </p>
              <p style="margin: 0 0 6px 0;">
                Software Architecture &bull; Artificial Intelligence &bull; Cloud Engineering
              </p>
              <p style="margin: 0; font-size: 11px; color: #8C9C98;">
                &copy; ${new Date().getFullYear()} DeepLayer Solutions. All rights reserved.
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
