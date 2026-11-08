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

  const emailSubject = `Inquiry Received [${referenceNumber}] — DeepLayer Solutions`;

  const plainText = `
DEEPLAYER SOLUTIONS — INQUIRY CONFIRMATION
==========================================

Dear ${fullName},

Thank you for reaching out to DeepLayer Solutions.

We have received your project inquiry and assigned it reference number: ${referenceNumber}.

INQUIRY SUMMARY:
------------------------------------------
Reference ID:     ${referenceNumber}
Service Required: ${service || "General Inquiry"}
Subject:          ${subject}

NEXT STEPS:
------------------------------------------
One of our senior engineering architects will review your project requirements, technical scope, and architectural constraints. We will respond with next steps within 24 business hours.

If you have urgent questions or need to provide additional technical documents, simply reply directly to this email or reach us on WhatsApp at +92 316 6007316.

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
        <!-- Main Email Container -->
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
            <td style="padding: 36px 32px 20px 32px; text-align: center;">
              <!-- Green Check Icon Badge -->
              <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #E9FFF2; border: 2px solid #BCE8CF; color: #008F53; font-size: 26px; text-align: center; margin-bottom: 20px;">
                &#10003;
              </div>

              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #142A27; line-height: 1.25;">
                We Have Received Your Inquiry!
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4B5E59; max-width: 480px; margin-left: auto; margin-right: auto;">
                Thank you for considering DeepLayer Solutions. Your inquiry has been routed to our technical architecture team for review.
              </p>

              <!-- Reference Badge Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #FAFCF9; border: 1px solid #DFEDE5; border-radius: 12px; padding: 14px 24px;">
                      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64736F; display: block; margin-bottom: 4px;">
                        Inquiry Tracking Number
                      </span>
                      <span style="font-family: monospace; font-size: 18px; font-weight: 800; color: #008F53; letter-spacing: 0.08em;">
                        ${referenceNumber}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inquiry Details Box -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFCF9; border: 1px solid #DFEDE5; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #DFEDE5; width: 140px; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase;">
                    Recipient
                  </td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #DFEDE5; font-size: 13px; font-weight: 700; color: #142A27;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #DFEDE5; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase;">
                    Service Domain
                  </td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #DFEDE5; font-size: 13px; color: #008F53; font-weight: 600;">
                    ${service || "General Inquiry"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 12px; font-weight: 700; color: #64736F; text-transform: uppercase;">
                    Subject
                  </td>
                  <td style="padding: 12px 18px; font-size: 13px; color: #142A27;">
                    ${subject}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Card -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="background-color: #F0FAF4; border: 1px solid #BCE8CF; border-radius: 12px; padding: 20px 24px;">
                <div style="font-size: 13px; font-weight: 800; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  What Happens Next?
                </div>
                <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6; color: #142A27;">
                  1. <strong>Architectural Review:</strong> Our senior technical leads analyze your requirements, technology stack feasibility, and architecture options.
                </p>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #142A27;">
                  2. <strong>Consultation Response:</strong> We will respond within <strong>24 business hours</strong> with initial recommendations or consultation schedule options.
                </p>
              </div>
            </td>
          </tr>

          <!-- Contact & WhatsApp CTA -->
          <tr>
            <td style="padding: 0 32px 36px 32px; text-align: center;">
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #64736F;">
                Need immediate technical consultation or have additional files?
              </p>
              <div>
                <a href="mailto:deeplayersolutions@gmail.com?subject=Inquiry%20${referenceNumber}%20Follow-up" style="display: inline-block; background-color: #008F53; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 22px; border-radius: 20px; margin: 4px; box-shadow: 0 2px 8px rgba(0, 143, 83, 0.2);">
                  Email Team Directly
                </a>
                <a href="https://wa.me/923166007316" style="display: inline-block; background-color: #FFFFFF; color: #142A27; border: 1px solid #DFEDE5; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 22px; border-radius: 20px; margin: 4px;">
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0A251D; padding: 24px 32px; text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 11px; line-height: 1.6;">
              <div style="color: #FFFFFF; font-weight: 700; font-size: 12px; margin-bottom: 4px;">
                DeepLayer Solutions
              </div>
              Lahore, Pakistan &bull; Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM (PKT)<br>
              &copy; 2026 DeepLayer Solutions. All rights reserved.<br>
              <a href="${siteUrl}" style="color: #34D399; text-decoration: none; margin-top: 6px; display: inline-block;">
                Visit Website &rarr;
              </a>
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

