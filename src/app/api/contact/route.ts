import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter for serverless environment
// Maps IP to { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic HTML sanitization to prevent injection / stored XSS
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
            message:
              "Too many inquiries sent from your connection. Please wait 15 minutes before trying again.",
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

    const { fullName, email, company, service, subject, message, botField } = body;

    // 3. Honeypot Spam Check (bots often fill hidden inputs)
    if (botField) {
      // Return 200 silently to defeat bot scanners without leaking rejection
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for reaching out to DeepLayer Solutions.",
        },
        { status: 200 }
      );
    }

    // 4. Server-Side Field Validations
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please provide your full name (at least 2 characters).";
    } else if (fullName.length > 100) {
      errors.fullName = "Full name must be under 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please provide a valid business email address.";
    } else if (email.length > 150) {
      errors.email = "Email address must be under 150 characters.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Please provide a subject (at least 3 characters).";
    } else if (subject.length > 200) {
      errors.subject = "Subject must be under 200 characters.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 15) {
      errors.message =
        "Please provide at least 15 characters describing your project or architecture needs.";
    } else if (message.length > 3000) {
      errors.message = "Message must be under 3000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed on submitted fields.",
          errors,
        },
        { status: 400 }
      );
    }

    // 5. Sanitize Sanitized Values
    const sanitizedSubmission = {
      fullName: sanitize(fullName),
      email: sanitize(email).toLowerCase(),
      company: company ? sanitize(String(company)) : "N/A",
      service: service ? sanitize(String(service)) : "General Inquiry",
      subject: sanitize(subject),
      message: sanitize(message),
      submittedAt: new Date().toISOString(),
      ip,
    };

    // 6. Production Logging
    // In production with RESEND_API_KEY, emails can be dispatched here.
    console.info(
      `[CONTACT INQUIRY] Received from ${sanitizedSubmission.fullName} (${sanitizedSubmission.email}) - Subject: "${sanitizedSubmission.subject}" (Service: "${sanitizedSubmission.service}")`
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out to DeepLayer Solutions. One of our technical architects will review your project requirements and respond within 24 business hours.",
        timestamp: sanitizedSubmission.submittedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT API ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred while processing your message. Please try again or email us directly at deeplayersolutions@gmail.com.",
      },
      { status: 500 }
    );
  }
}

