import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateConfirmationToken } from "@/lib/email/tokens";
import { sendNewsletterConfirmationEmail } from "@/lib/email/dispatch";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateRequestOrigin } from "@/lib/security/csrf";

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
      endpoint: "newsletter",
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
          message: `Too many subscription attempts from your connection. Please wait ${waitMinutes} minutes before trying again.`,
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

    // 4. Parse Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    // 5. Turnstile Bot Check (if provided in body or if Turnstile is configured)
    if (body.turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(body.turnstileToken, ip);
      if (!turnstileResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Security verification failed. Please try again.",
          },
          { status: 403 }
        );
      }
    }

    // 6. Server-Side Email Validation & Sanitization
    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    // Strip control characters and HTML tags
    const email = rawEmail.replace(/<[^>]+>/g, "").replace(/[\u0000-\u001F]/g, "");

    if (!email || !EMAIL_REGEX.test(email) || email.length > 100) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid business or personal email address." },
        { status: 422 }
      );
    }

    const supabase = createAdminClient();

    // 7. Check if subscriber record already exists
    const { data: existing, error: queryError } = await supabase
      .from("subscribers")
      .select("id, email, status, confirmation_token_hash, token_expires_at")
      .eq("email", email)
      .maybeSingle();

    if (queryError) {
      console.error("[NEWSLETTER DB QUERY ERROR]:", queryError);
      return NextResponse.json(
        { success: false, message: "A database error occurred. Please try again later." },
        { status: 500 }
      );
    }

    // Case 1: Already active subscriber
    if (existing && existing.status === "active") {
      return NextResponse.json(
        {
          success: true,
          message: "You are already an active subscriber to DeepLayer Solutions insights!",
        },
        { status: 200 }
      );
    }

    // Generate fresh double opt-in confirmation token and hash (48-hr expiry)
    const { rawToken, tokenHash, expiresAt } = generateConfirmationToken();

    let subscriberId: string;

    // Case 2: Existing pending subscription (resend confirmation)
    if (existing && existing.status === "pending") {
      subscriberId = existing.id;
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({
          confirmation_token_hash: tokenHash,
          token_expires_at: expiresAt,
        })
        .eq("id", existing.id);

      if (updateError) {
        console.error("[NEWSLETTER DB UPDATE ERROR]:", updateError);
        return NextResponse.json(
          { success: false, message: "Could not update subscription request. Please try again." },
          { status: 500 }
        );
      }
    }
    // Case 3: Re-subscribing after previously unsubscribing
    else if (existing && existing.status === "unsubscribed") {
      subscriberId = existing.id;
      const { error: reactivateError } = await supabase
        .from("subscribers")
        .update({
          status: "pending",
          confirmation_token_hash: tokenHash,
          token_expires_at: expiresAt,
          unsubscribed_at: null,
        })
        .eq("id", existing.id);

      if (reactivateError) {
        console.error("[NEWSLETTER DB REACTIVATION ERROR]:", reactivateError);
        return NextResponse.json(
          { success: false, message: "Could not reactivate subscription. Please try again." },
          { status: 500 }
        );
      }
    }
    // Case 4: Brand new subscriber
    else {
      const { data: newRecord, error: insertError } = await supabase
        .from("subscribers")
        .insert({
          email,
          status: "pending",
          confirmation_token_hash: tokenHash,
          token_expires_at: expiresAt,
        })
        .select("id")
        .single();

      if (insertError || !newRecord) {
        console.error("[NEWSLETTER DB INSERT ERROR]:", insertError);
        return NextResponse.json(
          { success: false, message: "Failed to record subscription. Please try again." },
          { status: 500 }
        );
      }
      subscriberId = newRecord.id;
    }

    // 8. Dispatch confirmation email via Resend
    // Important: an email delivery issue does not delete or roll back the pending subscriber
    try {
      await sendNewsletterConfirmationEmail({
        email,
        rawToken,
        subscriberId,
      });
    } catch (dispatchError: any) {
      console.error("[NEWSLETTER EMAIL DISPATCH ERROR]:", dispatchError?.message || dispatchError);
    }

    console.info(`[NEWSLETTER PENDING SAVED]: Sub ID: ${subscriberId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Please check your inbox! A confirmation link has been sent to complete your subscription.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error: any) {
    console.error("[NEWSLETTER API CRITICAL ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
