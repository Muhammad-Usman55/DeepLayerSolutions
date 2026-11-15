export interface NewsletterWelcomeParams {
  email: string;
  unsubscribeKey: string;
  siteUrl: string;
}

export function generateNewsletterWelcomeEmail(params: NewsletterWelcomeParams) {
  const { email, unsubscribeKey, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const unsubscribeUrl = `${normalizedSiteUrl}/newsletter/unsubscribe?email=${encodeURIComponent(email)}&key=${encodeURIComponent(unsubscribeKey)}`;

  const emailSubject = "Subscription Confirmed — DeepLayer Solutions";

  const plainText = `
DeepLayer Solutions
Subscription Confirmed

Hello,

Your subscription to DeepLayer Solutions engineering updates has been confirmed for ${email}.

WHAT YOU WILL RECEIVE:
- Architectural breakdowns of enterprise software and AI systems
- Engineering benchmarks, latency optimization, and reliability patterns
- Real-world case studies and technical releases

We focus strictly on high-signal technical content. Publications are delivered on a bi-weekly schedule.

UNSUBSCRIBE:
You can manage your preferences or unsubscribe at any time using the link below:
${unsubscribeUrl}

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
                Subscription Confirmed
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Your subscription has been verified for <strong style="color: #0F172A;">${email}</strong>. You will receive our technical publications and engineering case studies directly in your inbox.
              </p>

              <!-- Topic Focus Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 28px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em;">
                    Publication Coverage
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="margin-bottom: 10px; font-size: 13px; color: #334155; line-height: 1.5;">
                      <strong style="color: #0F172A;">Systems Architecture:</strong> Scalable full-stack design patterns, distributed services, and cloud engineering.
                    </div>
                    <div style="margin-bottom: 10px; font-size: 13px; color: #334155; line-height: 1.5;">
                      <strong style="color: #0F172A;">AI &amp; Agent Systems:</strong> Production deployment of autonomous agents, evaluation harnesses, and LLM orchestration.
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.5;">
                      <strong style="color: #0F172A;">Performance Engineering:</strong> Latency reduction benchmarks, caching strategies, and uptime monitoring.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Action Link -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                <tr>
                  <td>
                    <a href="${normalizedSiteUrl}" target="_blank" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 6px;">
                      Read Latest Articles
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corporate Footer with Unsubscribe -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #F1F5F9; padding: 24px 36px; text-align: left; font-size: 12px; color: #64748B; line-height: 1.6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #64748B;">
                    <strong style="color: #0F172A;">DeepLayer Solutions</strong><br>
                    Lahore, Pakistan &bull; <a href="${normalizedSiteUrl}" style="color: #008F53; text-decoration: none;">www.deeplayersolutions.com</a><br>
                    <span style="font-size: 11px; color: #94A3B8;">
                      You received this email because ${email} was confirmed for subscriptions.<br>
                      <a href="${unsubscribeUrl}" style="color: #64748B; text-decoration: underline;">Unsubscribe from this list</a>
                    </span>
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
    unsubscribeUrl,
  };
}
