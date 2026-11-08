import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateConfirmationToken } from "@/lib/email/tokens";
import { sendNewsletterConfirmationEmail } from "@/lib/email/dispatch";

const newsletterRateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const now = Date.now();
    const rateData = newsletterRateMap.get(ip);

    if (rateData && now < rateData.resetAt) {
      if (rateData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many subscription attempts. Please wait 15 minutes before trying again.",
          },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      newsletterRateMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_REGEX.test(email) || email.length > 100) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid business or personal email address." },
        { status: 422 }
      );
    }

    const supabase = createAdminClient();

    // Check if subscriber record already exists
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

    // Step: Dispatch confirmation email via Resend
    // Important: an email delivery issue does not delete or roll back the pending subscriber
    await sendNewsletterConfirmationEmail({
      email,
      rawToken,
      subscriberId,
    });

    console.info(`[NEWSLETTER PENDING SAVED]: ${email} | Sub ID: ${subscriberId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Please check your inbox! A confirmation link has been sent to complete your subscription.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[NEWSLETTER API CRITICAL ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
