import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken } from "@/lib/email/tokens";
import { sendNewsletterWelcomeEmail } from "@/lib/email/dispatch";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limiting: 10 attempts per 15 minutes per IP to mitigate token brute-force
    const rateLimit = await checkRateLimit({
      endpoint: "newsletter_confirm",
      maxRequests: 10,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many confirmation attempts. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const token = req.nextUrl.searchParams.get("token");

    if (!token || typeof token !== "string" || token.trim().length === 0 || token.trim().length > 128) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid confirmation token." },
        { status: 400 }
      );
    }

    const tokenHash = hashToken(token.trim());
    const supabase = createAdminClient();

    const { data: subscriber, error: queryError } = await supabase
      .from("subscribers")
      .select("id, email, status, token_expires_at")
      .eq("confirmation_token_hash", tokenHash)
      .maybeSingle();

    if (queryError) {
      console.error("[CONFIRM API ERROR]:", queryError);
      return NextResponse.json(
        { success: false, message: "A database error occurred." },
        { status: 500 }
      );
    }

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Invalid or already confirmed token." },
        { status: 404 }
      );
    }

    if (subscriber.token_expires_at) {
      const expiresAt = new Date(subscriber.token_expires_at).getTime();
      if (Date.now() > expiresAt) {
        return NextResponse.json(
          { success: false, message: "This confirmation link has expired." },
          { status: 410 }
        );
      }
    }

    const nowIso = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("subscribers")
      .update({
        status: "active",
        subscribed_at: nowIso,
        confirmation_token_hash: null,
        token_expires_at: null,
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("[CONFIRM API UPDATE ERROR]:", updateError);
      return NextResponse.json(
        { success: false, message: "Failed to activate subscription." },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      await sendNewsletterWelcomeEmail({
        email: subscriber.email,
        subscriberId: subscriber.id,
      });
    } catch (welcomeError: any) {
      console.error("[WELCOME EMAIL DISPATCH ERROR]:", welcomeError?.message || welcomeError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscription confirmed successfully! Welcome to DeepLayer Solutions.",
        email: subscriber.email,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CONFIRM API UNHANDLED ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limiting: 10 attempts per 15 minutes per IP
    const rateLimit = await checkRateLimit({
      endpoint: "newsletter_confirm",
      maxRequests: 10,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many confirmation attempts. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const token = typeof body?.token === "string" ? body.token.trim() : "";

    if (!token || token.length > 128) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid confirmation token." },
        { status: 400 }
      );
    }

    const tokenHash = hashToken(token);
    const supabase = createAdminClient();

    const { data: subscriber, error: queryError } = await supabase
      .from("subscribers")
      .select("id, email, status, token_expires_at")
      .eq("confirmation_token_hash", tokenHash)
      .maybeSingle();

    if (queryError) {
      return NextResponse.json(
        { success: false, message: "A database error occurred." },
        { status: 500 }
      );
    }

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Invalid or already confirmed token." },
        { status: 404 }
      );
    }

    if (subscriber.token_expires_at) {
      const expiresAt = new Date(subscriber.token_expires_at).getTime();
      if (Date.now() > expiresAt) {
        return NextResponse.json(
          { success: false, message: "This confirmation link has expired." },
          { status: 410 }
        );
      }
    }

    const nowIso = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("subscribers")
      .update({
        status: "active",
        subscribed_at: nowIso,
        confirmation_token_hash: null,
        token_expires_at: null,
      })
      .eq("id", subscriber.id);

    if (updateError) {
      return NextResponse.json(
        { success: false, message: "Failed to activate subscription." },
        { status: 500 }
      );
    }

    try {
      await sendNewsletterWelcomeEmail({
        email: subscriber.email,
        subscriberId: subscriber.id,
      });
    } catch (welcomeError: any) {
      console.error("[WELCOME EMAIL DISPATCH ERROR]:", welcomeError?.message || welcomeError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscription confirmed successfully!",
        email: subscriber.email,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CONFIRM API UNHANDLED ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
