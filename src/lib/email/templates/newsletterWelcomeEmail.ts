export interface NewsletterWelcomeParams {
  email: string;
  unsubscribeKey: string;
  siteUrl: string;
}

export function generateNewsletterWelcomeEmail(params: NewsletterWelcomeParams) {
  const { email, unsubscribeKey, siteUrl } = params;
  const unsubscribeUrl = `${siteUrl.replace(/\/$/, "")}/newsletter/unsubscribe?email=${encodeURIComponent(email)}&key=${encodeURIComponent(unsubscribeKey)}`;

  const emailSubject = "Welcome to DeepLayer Solutions Insights";

  const plainText = `
DEEPLAYER SOLUTIONS — WELCOME TO OUR COMMUNITY
==============================================

Hello,

Your subscription to DeepLayer Solutions has been confirmed!

We are thrilled to welcome you. Here is what you can expect in our periodic briefings:
- Engineering deep dives into Next.js, AI LLMs, LangGraph, and full-stack systems.
- Production benchmarks, latency optimization tactics, and architectural patterns.
- Case studies from real-world enterprise software deployments.
- New open-source tools and technical releases.

We respect your inbox: no spam, no daily sales pitches, only high-value engineering insights.

UNSUBSCRIBE:
----------------------------------------------
If you ever wish to stop receiving these updates, you can unsubscribe at any time using this link:
${unsubscribeUrl}

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

          <!-- Welcome Hero -->
          <tr>
            <td style="padding: 36px 32px 28px 32px; text-align: center;">
              <!-- Sparkle / Check Badge -->
              <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #E9FFF2; border: 2px solid #BCE8CF; color: #008F53; font-size: 26px; text-align: center; margin-bottom: 20px;">
                &#10003;
              </div>

              <h1 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; color: #142A27; line-height: 1.25;">
                Welcome to DeepLayer Insights!
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4B5E59; max-width: 480px; margin-left: auto; margin-right: auto;">
                Your subscription is now active for <strong>${email}</strong>. We're excited to share our latest engineering discoveries, production architectures, and AI innovations with you.
              </p>

              <!-- What to Expect Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; text-align: left;">
                <tr>
                  <td style="background-color: #F8FBFA; border: 1px solid #DFEDE5; border-radius: 12px; padding: 20px;">
                    <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #008F53; margin-bottom: 12px;">
                      What You'll Receive
                    </div>

                    <div style="margin-bottom: 10px; font-size: 14px; color: #142A27; line-height: 1.5;">
                      <span style="color: #008F53; font-weight: 700; margin-right: 6px;">&bull;</span>
                      <strong>Technical Deep Dives:</strong> Production patterns in Next.js, TypeScript, and AI agent frameworks.
                    </div>
                    <div style="margin-bottom: 10px; font-size: 14px; color: #142A27; line-height: 1.5;">
                      <span style="color: #008F53; font-weight: 700; margin-right: 6px;">&bull;</span>
                      <strong>Architectural Case Studies:</strong> Real-world latency reduction, scalability benchmarks, and reliability setups.
                    </div>
                    <div style="font-size: 14px; color: #142A27; line-height: 1.5;">
                      <span style="color: #008F53; font-weight: 700; margin-right: 6px;">&bull;</span>
                      <strong>Tools &amp; Releases:</strong> First look at open-source libraries and enterprise software blueprints.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Visit Website CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 12px auto;">
                <tr>
                  <td align="center" style="border-radius: 9999px; background-color: #008F53;">
                    <a href="${siteUrl}" target="_blank" style="display: inline-block; padding: 13px 32px; font-size: 14px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 9999px; background-color: #008F53; letter-spacing: 0.01em;">
                      Explore DeepLayer Solutions &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer & Unsubscribe -->
          <tr>
            <td style="background-color: #FAFCF9; border-top: 1px solid #DFEDE5; padding: 24px 32px; text-align: center; font-size: 12px; color: #64736F; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #142A27;">
                DeepLayer Solutions
              </p>
              <p style="margin: 0 0 10px 0;">
                You received this email because you confirmed your subscription with <strong>${email}</strong>.
              </p>
              <p style="margin: 0 0 10px 0;">
                <a href="${unsubscribeUrl}" style="color: #64736F; text-decoration: underline;">Unsubscribe from this newsletter</a>
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
