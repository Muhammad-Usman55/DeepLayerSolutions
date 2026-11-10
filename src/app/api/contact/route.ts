import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactInquiryEmails } from "@/lib/email/dispatch";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { validateRequestOrigin } from "@/lib/security/csrf";

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
    // 1. CSRF / Origin Verification
    if (!validateRequestOrigin(req)) {
      return NextResponse.json(
        { success: false, message: "Cross-site request blocked." },
        { status: 403 }
      );
    }

    // 2. Client IP Extraction
    const ip = getClientIp(req);

    // 3. Distributed Production Rate Limiting (5 requests per 15 minutes)
    const rateLimit = await checkRateLimit({
      endpoint: "contact",
      maxRequests: 5,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      const waitMinutes = Math.max(
        1,
        Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / (60 * 1000))
      );
      return NextResponse.json(
        {
          success: false,
          message: `Too many inquiries sent from your connection. Please wait ${waitMinutes} minutes before submitting again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000)
            ),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetAt.toISOString(),
          },
        }
      );
    }

    // 4. Parse JSON Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { fullName, email, company, service, subject, message, botField } = body;

    // 5. Honeypot Spam Check (silent response to defeat automated spam bots)
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

    // 6. Server-Side Field Validations
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

    // 7. Clean & Sanitize Inputs
    const sanitizedFullName = sanitize(fullName);
    const sanitizedEmail = trimmedEmail.toLowerCase();
    const sanitizedCompany = company ? sanitize(String(company)) : null;
    const sanitizedService = service ? sanitize(String(service)) : "General Inquiry";
    const sanitizedSubject = sanitize(subject);
    const sanitizedMessage = sanitize(message);

    // 9. Connect to Supabase via Protected Admin Client
    const supabase = createAdminClient();

    // 10. Prevent Duplicate or Accidental Double Submissions
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

    // 11. Persist to PostgreSQL Database
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

    // 12. Structured Audit Log (Safe — without leaking unhashed PII)
    console.info(
      `[CONTACT SUBMISSION SAVED] Ref: ${record.reference_number} | ID: ${record.id} | Service: "${sanitizedService}"`
    );

    // 13. Dispatch Transactional Emails (Failsafe & Audited)
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

    // 14. Return Successful Response
    return NextResponse.json(
      {
        success: true,
        referenceNumber: record.reference_number,
        message:
          "Thank you for reaching out to DeepLayer Solutions. Your inquiry has been received and our engineering architects will respond within 24 business hours.",
        timestamp: record.created_at,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
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
