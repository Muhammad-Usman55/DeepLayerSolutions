import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUnsubscribeToken } from "@/lib/email/tokens";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit({
      endpoint: "newsletter_unsubscribe",
      maxRequests: 10,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many unsubscribe attempts. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
    const key = req.nextUrl.searchParams.get("key")?.trim();

    if (!email || !key || email.length > 150 || key.length > 128) {
      return NextResponse.json(
        { success: false, message: "Missing required email or authentication key." },
        { status: 400 }
      );
    }

    const isValid = verifyUnsubscribeToken(email, key);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired unsubscribe token." },
        { status: 403 }
      );
    }

    const supabase = createAdminClient();
    const nowIso = new Date().toISOString();

    const { error } = await supabase
      .from("subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: nowIso,
        confirmation_token_hash: null,
        token_expires_at: null,
      })
      .eq("email", email);

    if (error) {
      console.error("[UNSUBSCRIBE API DB ERROR]:", error?.message || error);
      return NextResponse.json(
        { success: false, message: "Failed to update subscriber record." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${email} has been unsubscribed from DeepLayer Solutions newsletter.`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[UNSUBSCRIBE API ERROR]:", err?.message || err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit({
      endpoint: "newsletter_unsubscribe",
      maxRequests: 10,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many unsubscribe attempts. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.toLowerCase().trim() : "";
    const key = typeof body?.key === "string" ? body.key.trim() : "";

    if (!email || !key || email.length > 150 || key.length > 128) {
      return NextResponse.json(
        { success: false, message: "Missing required email or authentication key." },
        { status: 400 }
      );
    }

    const isValid = verifyUnsubscribeToken(email, key);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid or tampered unsubscribe token." },
        { status: 403 }
      );
    }

    const supabase = createAdminClient();
    const nowIso = new Date().toISOString();

    const { error } = await supabase
      .from("subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: nowIso,
        confirmation_token_hash: null,
        token_expires_at: null,
      })
      .eq("email", email);

    if (error) {
      console.error("[UNSUBSCRIBE POST ERROR]:", error?.message || error);
      return NextResponse.json(
        { success: false, message: "Failed to update subscriber record." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${email} has been unsubscribed from DeepLayer Solutions newsletter.`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[UNSUBSCRIBE POST ERROR]:", err?.message || err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
