import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken } from "@/lib/email/tokens";
import { sendNewsletterWelcomeEmail } from "@/lib/email/dispatch";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || typeof token !== "string" || token.trim().length === 0) {
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
  await sendNewsletterWelcomeEmail({
    email: subscriber.email,
    subscriberId: subscriber.id,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Subscription confirmed successfully! Welcome to DeepLayer Solutions.",
      email: subscriber.email,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token.trim() : "";

  if (!token) {
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

  await sendNewsletterWelcomeEmail({
    email: subscriber.email,
    subscriberId: subscriber.id,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Subscription confirmed successfully!",
      email: subscriber.email,
    },
    { status: 200 }
  );
}
