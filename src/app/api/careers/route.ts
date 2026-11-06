import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitize(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now < rateData.resetAt) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many applications submitted from this connection. Please wait 15 minutes before submitting again.",
          },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse JSON Payload
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

    // 3. Honeypot check
    if (botField) {
      return NextResponse.json(
        { success: true, message: "Application received." },
        { status: 200 }
      );
    }

    // 4. Server-Side Field Validations
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      errors.phone = "Please enter a valid phone/WhatsApp number.";
    }

    if (!position || typeof position !== "string" || position.trim().length < 2) {
      errors.position = "Please select a target position.";
    }

    if (!linkedin || typeof linkedin !== "string" || !linkedin.includes("linkedin.com")) {
      errors.linkedin = "Please provide your valid LinkedIn profile link.";
    }

    if (!resumeUrl || typeof resumeUrl !== "string" || resumeUrl.trim().length < 5) {
      errors.resumeUrl = "Please provide a valid viewable link to your resume/CV.";
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

    // 5. Sanitize
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
      ip,
    };

    // 6. Production Logging
    console.info(
      `[CAREER APPLICATION] ${sanitizedApplication.fullName} applied for "${sanitizedApplication.position}" (${sanitizedApplication.email}, Phone: ${sanitizedApplication.phone})`
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
  } catch (error) {
    console.error("[CAREER API ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while processing your application. Please email your CV directly to deeplayersolutions@gmail.com.",
      },
      { status: 500 }
    );
  }
}

