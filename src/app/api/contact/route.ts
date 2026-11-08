import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactInquiryEmails } from "@/lib/email/dispatch";

// In-memory IP rate limiter for serverless environment
// Maps IP to { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic HTML and script tag stripping to prevent XSS / malicious payloads
function sanitize(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "") // Strip invisible control characters
    .trim();
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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
              "Too many inquiries sent from your connection. Please wait 15 minutes before submitting again.",
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

    // 3. Honeypot Spam Check (silent response to defeat automated spam bots)
    if (botField) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for reaching out to DeepLayer Solutions.",
          referenceNumber: "DLS-CONFIRMED",
        },
        { status: 200 }
      );
    }

    // 4. Server-Side Field Validations
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please provide your full name (at least 2 characters).";
    } else if (fullName.trim().length > 100) {
      errors.fullName = "Full name must be under 100 characters.";
    }

    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please provide a valid business email address.";
    } else if (trimmedEmail.length > 150) {
      errors.email = "Email address must be under 150 characters.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Please provide an inquiry subject (at least 3 characters).";
    } else if (subject.trim().length > 200) {
      errors.subject = "Subject must be under 200 characters.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 15) {
      errors.message =
        "Please provide at least 15 characters describing your project or architecture needs.";
    } else if (message.trim().length > 3000) {
      errors.message = "Message must be under 3000 characters.";
    }

    if (company && typeof company === "string" && company.trim().length > 150) {
      errors.company = "Company name must be under 150 characters.";
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

    // 5. Clean & Sanitize Inputs
    const sanitizedFullName = sanitize(fullName);
    const sanitizedEmail = trimmedEmail.toLowerCase();
    const sanitizedCompany = company ? sanitize(String(company)) : null;
    const sanitizedService = service ? sanitize(String(service)) : "General Inquiry";
    const sanitizedSubject = sanitize(subject);
    const sanitizedMessage = sanitize(message);

    // 6. Connect to Supabase via Protected Admin Client
    const supabase = createAdminClient();

    // 7. Prevent Duplicate or Accidental Double Submissions
    // Check if an identical submission from this email & subject was recorded in the last 2 minutes
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { data: duplicate } = await supabase
      .from("contact_submissions")
      .select("id, reference_number, created_at")
      .eq("email", sanitizedEmail)
      .eq("subject", sanitizedSubject)
      .gte("created_at", twoMinutesAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (duplicate?.reference_number) {
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          referenceNumber: duplicate.reference_number,
          message: `We have already received your inquiry (Ref: ${duplicate.reference_number}). Our architects are currently reviewing your project.`,
          timestamp: duplicate.created_at,
        },
        { status: 200 }
      );
    }

    // 8. Persist to PostgreSQL Database
    const { data: record, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        full_name: sanitizedFullName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        service: sanitizedService,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        status: "new",
        admin_notes: null,
      })
      .select("id, reference_number, created_at")
      .single();

    if (dbError || !record) {
      console.error("[SUPABASE CONTACT INSERT ERROR]", dbError?.message || "Unknown database error");
      return NextResponse.json(
        {
          success: false,
          message:
            "A database error occurred while saving your inquiry. Please try again or email us directly at info@deeplayersolutions.com.",
        },
        { status: 500 }
      );
    }

    // 9. Structured Audit Log
    console.info(
      `[CONTACT SUBMISSION SAVED] Ref: ${record.reference_number} | ID: ${record.id} | From: ${sanitizedFullName} (${sanitizedEmail}) | Service: "${sanitizedService}"`
    );

    // 10. Dispatch Transactional Emails (Failsafe & Audited)
    // CRITICAL: Record is already committed in PostgreSQL. Email failures are logged and do not block the inquiry.
    try {
      await sendContactInquiryEmails({
        id: record.id,
        referenceNumber: record.reference_number,
        fullName: sanitizedFullName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        service: sanitizedService,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        submittedAt: record.created_at,
      });
    } catch (emailError: any) {
      console.error("[EMAIL DISPATCH UNHANDLED EXCEPTION]", emailError?.message || emailError);
    }

    // 11. Return Successful Response with Generated Reference Number
    return NextResponse.json(
      {
        success: true,
        referenceNumber: record.reference_number,
        message:
          "Thank you for reaching out to DeepLayer Solutions. Your inquiry has been received and our engineering architects will respond within 24 business hours.",
        timestamp: record.created_at,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[CONTACT API UNHANDLED ERROR]", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred while processing your message. Please try again or reach out at info@deeplayersolutions.com.",
      },
      { status: 500 }
    );
  }
}
