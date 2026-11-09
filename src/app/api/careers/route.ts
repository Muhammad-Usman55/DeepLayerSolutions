import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, hashClientIdentifier } from "@/lib/security/rateLimit";
import { validateRequestOrigin } from "@/lib/security/csrf";

function sanitize(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF / Origin Verification
    if (!validateRequestOrigin(req)) {
      return NextResponse.json(
        { success: false, message: "Cross-site request blocked." },
        { status: 403 }
      );
    }

    // 2. Client IP Extraction & Distributed Rate Limiting
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

    // 3. Parse JSON Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      position,
      linkedin,
      portfolioOrGithub,
      resumeUrl,
      coverNote,
      botField,
    } = body;

    // 4. Honeypot check
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

    if (!resumeUrl || typeof resumeUrl !== "string" || resumeUrl.trim().length < 5) {
      errors.resumeUrl = "Please provide a valid viewable link to your resume/CV.";
    } else if (resumeUrl.trim().length > 500) {
      errors.resumeUrl = "Resume link must be under 500 characters.";
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

    // 6. Sanitize
    const sanitizedApplication = {
      fullName: sanitize(fullName),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      position: sanitize(position),
      linkedin: sanitize(linkedin),
      portfolioOrGithub: portfolioOrGithub ? sanitize(String(portfolioOrGithub)) : "N/A",
      resumeUrl: sanitize(resumeUrl),
      coverNote: coverNote ? sanitize(String(coverNote)) : "N/A",
      submittedAt: new Date().toISOString(),
      clientHash: hashClientIdentifier(ip, "careers"),
    };

    // 7. Production Logging (privacy-safe)
    console.info(
      `[CAREER APPLICATION] ${sanitizedApplication.fullName} applied for "${sanitizedApplication.position}" (Ref Hash: ${sanitizedApplication.clientHash})`
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for applying to DeepLayer Solutions. Our technical and recruitment leads will review your application within 48 business hours.",
        timestamp: sanitizedApplication.submittedAt,
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
