import type { JobApplicationStatus } from "@/types/supabase";

export interface CareerStatusUpdateParams {
  id?: string;
  fullName: string;
  email: string;
  position: string;
  status: JobApplicationStatus;
  adminNotes?: string | null;
  siteUrl: string;
}

interface CareerStatusConfig {
  badge: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  subject: string;
  headline: string;
  summary: string;
  nextSteps: string;
}

const CAREER_STATUS_CONFIGS: Record<JobApplicationStatus, CareerStatusConfig> = {
  under_review: {
    badge: "Under Review",
    badgeBg: "#FEF3C7",
    badgeBorder: "#FDE68A",
    badgeText: "#92400E",
    subject: "Application Update: Under Review",
    headline: "Your Application is Under Technical Review",
    summary:
      "Our engineering leadership and recruitment panel are currently evaluating your portfolio, technical submissions, and experience.",
    nextSteps:
      "Our review process typically takes 2 to 3 business days. Candidates meeting initial criteria will be invited to a technical screening.",
  },
  shortlisted: {
    badge: "Shortlisted",
    badgeBg: "#E0F2FE",
    badgeBorder: "#BAE6FD",
    badgeText: "#0369A1",
    subject: "Application Update: Shortlisted for Role",
    headline: "Application Status: Shortlisted",
    summary:
      "Following review of your profile and background, our technical team has shortlisted your application for the next evaluation stage.",
    nextSteps:
      "Our talent team will coordinate the technical discussion schedule and meeting details.",
  },
  interview: {
    badge: "Interview Stage",
    badgeBg: "#F3E8FF",
    badgeBorder: "#E9D5FF",
    badgeText: "#6B21A8",
    subject: "Interview Next Steps: Technical Discussion",
    headline: "Interview Stage Details",
    summary:
      "Your application has progressed to the interview stage at DeepLayer Solutions. Our team looks forward to discussing your technical experience and engineering projects.",
    nextSteps:
      "Please monitor your inbox for the calendar invite and meeting coordinates.",
  },
  selected: {
    badge: "Selected for Role",
    badgeBg: "#DCFCE7",
    badgeBorder: "#86EFAC",
    badgeText: "#15803D",
    subject: "Application Update: Selection Notice",
    headline: "Application Status: Selected",
    summary:
      "Following technical assessments and interviews, the DeepLayer Solutions engineering team has selected your application for the role.",
    nextSteps:
      "Our operations team will follow up directly with next steps and orientation details.",
  },
  hired: {
    badge: "Team Onboarding",
    badgeBg: "#DCFCE7",
    badgeBorder: "#4ADE80",
    badgeText: "#14532D",
    subject: "Welcome to DeepLayer Solutions",
    headline: "Welcome to DeepLayer Solutions",
    summary:
      "We are pleased to welcome you to the DeepLayer Solutions engineering team. We look forward to working together.",
    nextSteps:
      "Your orientation lead will assist with workspace setup, repository access, and onboarding documentation.",
  },
  rejected: {
    badge: "Status Update",
    badgeBg: "#F1F5F9",
    badgeBorder: "#E2E8F0",
    badgeText: "#475569",
    subject: "DeepLayer Solutions Application Status",
    headline: "Application Decision Update",
    summary:
      "Thank you for taking the time to apply and interview with DeepLayer Solutions. We received a significant volume of exceptional applications for this cohort.",
    nextSteps:
      "After careful consideration, we have chosen to proceed with another candidate whose background more directly matches our immediate sprint stack requirements. We will retain your profile in our talent network for future opportunities that match your skill set.",
  },
  new: {
    badge: "Application Received",
    badgeBg: "#F0FDF4",
    badgeBorder: "#BBF7D0",
    badgeText: "#008F53",
    subject: "Application Status Update",
    headline: "Application Registered in System",
    summary:
      "Your application is confirmed and currently queued for engineering evaluation.",
    nextSteps:
      "Our technical team will review your credentials and reach out with updates.",
  },
};

export function generateCareerStatusUpdateEmail(params: CareerStatusUpdateParams) {
  const { id, fullName, position, status, adminNotes, siteUrl } = params;
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const config = CAREER_STATUS_CONFIGS[status] || CAREER_STATUS_CONFIGS.under_review;

  const emailSubject = `${config.subject}: ${position} - DeepLayer Solutions`;

  const plainText = `
DeepLayer Solutions
${config.headline}

Candidate: ${fullName}
Position:  ${position}
Status:    ${config.badge}

Dear ${fullName},

${config.summary}
${adminNotes ? `\nFEEDBACK / NOTES FROM INTERVIEW PANEL:\n${adminNotes}\n` : ""}
NEXT STEPS:
${config.nextSteps}

If you have questions, reply directly to this email or reach our Talent Team at deeplayersolutions@gmail.com.

Warm regards,
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
            <td style="padding: 28px 36px 20px 36px; border-bottom: 1px solid #F1F5F9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em;">
                      DeepLayer <span style="color: #008F53;">Solutions</span>
                    </div>
                    <div style="font-size: 12px; font-weight: 500; color: #64748B; margin-top: 2px;">
                      Careers &amp; Talent Acquisition
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; background-color: ${config.badgeBg}; border: 1px solid ${config.badgeBorder}; border-radius: 6px; font-size: 11px; font-weight: 700; color: ${config.badgeText};">
                      ${config.badge}
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
                ${config.headline}
              </h1>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Dear ${fullName},
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                ${config.summary}
              </p>

              <!-- Application Summary Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B; width: 35%;">Applied Position</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 700; color: #0F172A;">${position}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #64748B;">Application Status</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 700; color: ${config.badgeText};">${config.badge}</td>
                </tr>
                ${
                  id
                    ? `
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #64748B;">Candidate ID</td>
                  <td style="padding: 12px 16px; font-size: 12px; font-family: ui-monospace, Menlo, Consolas, monospace; color: #008F53;">${id}</td>
                </tr>
                `
                    : ""
                }
              </table>

              ${
                adminNotes
                  ? `
              <!-- Interviewer Feedback Note -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #008F53; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                      Note from Recruitment Panel:
                    </div>
                    <div style="font-size: 13px; color: #14532D; line-height: 1.6; white-space: pre-wrap;">${adminNotes}</div>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }

              <!-- What's Next Box -->
              <div style="padding: 16px 20px; background-color: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                  What Happens Next
                </div>
                <div style="font-size: 13px; color: #4B5563; line-height: 1.6;">
                  ${config.nextSteps}
                </div>
              </div>

              <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748B; line-height: 1.6;">
                Have a question regarding your application? Reply directly to this email or write to <a href="mailto:deeplayersolutions@gmail.com" style="color: #008F53; text-decoration: none;">deeplayersolutions@gmail.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748B;">
                DeepLayer Solutions &bull; Engineering &amp; Talent Acquisition
              </p>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #94A3B8;">
                Lahore, Pakistan &bull; Phone: +92 316 6007316 &bull; Email: deeplayersolutions@gmail.com
              </p>
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                <a href="${normalizedSiteUrl}" style="color: #008F53; text-decoration: none;">www.deeplayersolutions.com</a>
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
    html,
  };
}
