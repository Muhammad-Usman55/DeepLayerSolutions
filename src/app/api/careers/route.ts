import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, hashClientIdentifier } from "@/lib/security/rateLimit";
import { validateRequestOrigin } from "@/lib/security/csrf";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCompanyEmail, sendGmailMessage } from "@/lib/email/gmail";
import { generateCareerNotificationEmail } from "@/lib/email/templates/careerNotificationEmail";

function sanitize(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "")
    .trim();
}

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF / Origin Verification
    if (!validateRequestOrigin(req)) {
      return NextResponse.json(
        { success: false, message: "Cross-site request blocked." },
        { status: 403 }
      );
    }

    // 2. Client IP Extraction & Distributed Rate Limiting (5 requests per 15 minutes)
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit({
      endpoint: "careers",
      maxRequests: 5,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many applications submitted from this connection. Please wait 15 minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    // 3. Parse Request (supports Multipart FormData with file upload or JSON fallback)
    const contentType = req.headers.get("content-type") || "";
    let fullName = "";
    let email = "";
    let phone = "";
    let position = "";
    let linkedin = "";
    let portfolioOrGithub = "";
    let coverNote = "";
    let botField = "";
    let resumeUrl = "";
    let resumeFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      position = (formData.get("position") as string) || "";
      linkedin = (formData.get("linkedin") as string) || "";
      portfolioOrGithub = (formData.get("portfolioOrGithub") as string) || "";
      coverNote = (formData.get("coverNote") as string) || "";
      botField = (formData.get("botField") as string) || "";
      resumeUrl = (formData.get("resumeUrl") as string) || "";
      
      const fileEntry = formData.get("resumeFile");
      if (fileEntry && typeof fileEntry === "object" && "arrayBuffer" in fileEntry) {
        resumeFile = fileEntry as File;
      }
    } else {
      const body = await req.json().catch(() => null);
      if (!body || typeof body !== "object") {
        return NextResponse.json(
          { success: false, message: "Invalid request payload." },
          { status: 400 }
        );
      }
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phone || "";
      position = body.position || "";
      linkedin = body.linkedin || "";
      portfolioOrGithub = body.portfolioOrGithub || "";
      coverNote = body.coverNote || "";
      botField = body.botField || "";
      resumeUrl = body.resumeUrl || "";
    }

    // 4. Honeypot check (defeat automated spam bots silently)
    if (botField) {
      return NextResponse.json(
        { success: true, message: "Application received." },
        { status: 200 }
      );
    }

    // 5. Server-Side Field Validations
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    } else if (fullName.trim().length > 100) {
      errors.fullName = "Full name must be under 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    } else if (email.trim().length > 150) {
      errors.email = "Email must be under 150 characters.";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      errors.phone = "Please enter a valid phone/WhatsApp number.";
    } else if (phone.trim().length > 30) {
      errors.phone = "Phone number must be under 30 characters.";
    }

    if (!position || typeof position !== "string" || position.trim().length < 2) {
      errors.position = "Please select a target position.";
    } else if (position.trim().length > 100) {
      errors.position = "Position must be under 100 characters.";
    }

    if (!linkedin || typeof linkedin !== "string" || !linkedin.includes("linkedin.com")) {
      errors.linkedin = "Please provide your valid LinkedIn profile link.";
    } else if (linkedin.trim().length > 300) {
      errors.linkedin = "LinkedIn URL must be under 300 characters.";
    }

    // Validate Resume File or URL
    if (resumeFile) {
      if (resumeFile.size > MAX_FILE_SIZE) {
        errors.resumeFile = "Resume file must be under 10MB in size.";
      } else {
        const fileExt = resumeFile.name.split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
          errors.resumeFile = "Allowed file formats: PDF, DOC, or DOCX.";
        }
      }
    } else if (!resumeUrl || typeof resumeUrl !== "string" || resumeUrl.trim().length < 5) {
      errors.resumeFile = "Please upload your Resume/CV (PDF, DOC, or DOCX up to 10MB).";
    }

    if (coverNote && typeof coverNote === "string" && coverNote.trim().length > 2000) {
      errors.coverNote = "Cover note must be under 2000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed on submitted application.",
          errors,
        },
        { status: 400 }
      );
    }

    // 6. Sanitize inputs
    const sanitizedFullName = sanitize(fullName);
    const sanitizedEmail = sanitize(email).toLowerCase();
    const sanitizedPhone = sanitize(phone);
    const sanitizedPosition = sanitize(position);
    const sanitizedLinkedin = sanitize(linkedin);
    const sanitizedPortfolio = portfolioOrGithub ? sanitize(String(portfolioOrGithub)) : "N/A";
    const sanitizedCoverNote = coverNote ? sanitize(String(coverNote)) : "N/A";
    const clientHash = hashClientIdentifier(ip, "careers");
    const submittedAt = new Date().toISOString();

    const supabase = createAdminClient();

    // 7. Upload Resume File to Supabase Storage if provided
    if (resumeFile) {
      try {
        const fileExt = resumeFile.name.split(".").pop()?.toLowerCase() || "pdf";
        const cleanName = sanitizedFullName.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30);
        const originalClean = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 40);
        const storagePath = `applications/${Date.now()}_${cleanName}_${originalClean}`;

        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(storagePath, buffer, {
            contentType: resumeFile.type || "application/octet-stream",
            upsert: false,
          });

        if (uploadError) {
          console.error("[SUPABASE RESUME UPLOAD ERROR]:", uploadError);
          return NextResponse.json(
            {
              success: false,
              message: "Failed to upload resume file to storage. Please try again.",
            },
            { status: 500 }
          );
        }

        const { data: publicData } = supabase.storage
          .from("resumes")
          .getPublicUrl(storagePath);

        resumeUrl = publicData.publicUrl;
        console.info(`[CAREER RESUME UPLOADED] ${storagePath} -> ${resumeUrl}`);
      } catch (uploadEx: any) {
        console.error("[RESUME UPLOAD EXCEPTION]:", uploadEx?.message || uploadEx);
        return NextResponse.json(
          {
            success: false,
            message: "Error processing resume file. Please try again.",
          },
          { status: 500 }
        );
      }
    }

    // 8. Persist to Supabase Database (job_applications table)
    let applicationId: string | undefined;
    try {
      const { data: record, error: dbError } = await supabase
        .from("job_applications")
        .insert({
          full_name: sanitizedFullName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          applied_position: sanitizedPosition,
          linkedin_url: sanitizedLinkedin,
          portfolio_url: sanitizedPortfolio !== "N/A" ? sanitizedPortfolio : null,
          resume_path: resumeUrl,
          cover_letter: sanitizedCoverNote !== "N/A" ? sanitizedCoverNote : null,
          status: "new",
        })
        .select("id, created_at")
        .maybeSingle();

      if (dbError) {
        console.warn("[SUPABASE JOB APPLICATION DB WARNING]", dbError.message);
      } else if (record) {
        applicationId = record.id;
        console.info(
          `[JOB APPLICATION SAVED TO SUPABASE] ID: ${record.id} | ${sanitizedFullName} (${sanitizedPosition})`
        );
      }
    } catch (dbEx: any) {
      console.warn("[SUPABASE JOB APPLICATION EXCEPTION]", dbEx?.message || dbEx);
    }

    // 9. Dispatch Email Alert to DeepLayer Recruitment Team
    try {
      const companyEmail = getCompanyEmail();
      const emailTemplate = generateCareerNotificationEmail({
        id: applicationId,
        fullName: sanitizedFullName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        position: sanitizedPosition,
        linkedin: sanitizedLinkedin,
        portfolio: sanitizedPortfolio !== "N/A" ? sanitizedPortfolio : null,
        resumeUrl,
        coverNote: sanitizedCoverNote !== "N/A" ? sanitizedCoverNote : null,
        submittedAt,
      });

      await sendGmailMessage({
        to: companyEmail,
        replyTo: sanitizedEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      console.info(
        `[CAREER EMAIL NOTIFICATION SENT] To ${companyEmail} for candidate ${sanitizedFullName}`
      );
    } catch (emailEx: any) {
      console.warn("[CAREER EMAIL NOTIFICATION FAILED]", emailEx?.message || emailEx);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for applying to DeepLayer Solutions. Your details and resume have been securely received. Our recruitment leads will review your application within 48 business hours.",
        resumeUrl,
        applicationId,
        timestamp: submittedAt,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CAREER API ERROR]", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while processing your application. Please email your CV directly to deeplayersolutions@gmail.com.",
      },
      { status: 500 }
    );
  }
}
