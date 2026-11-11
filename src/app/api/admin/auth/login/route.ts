import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { validateRequestOrigin } from "@/lib/security/csrf";

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF / Origin Verification
    if (!validateRequestOrigin(req)) {
      return NextResponse.json(
        { success: false, message: "Cross-site request blocked." },
        { status: 403 }
      );
    }

    // 2. Client IP Extraction & Brute-Force Rate Limiting (5 attempts per 15 minutes)
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit({
      endpoint: "admin_login",
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
          message: `Too many failed login attempts. Please wait ${waitMinutes} minutes before trying again.`,
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

    // 3. Parse and Validate Request Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid credentials format." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password || email.length > 150 || password.length > 128) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 422 }
      );
    }

    // 4. Authenticate with Supabase Auth via SSR client (sets HTTP session cookies)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Database credentials missing in production. Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables.",
        },
        { status: 503 }
      );
    }

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 5. Verify user authorization in public.admin_profiles
    const adminDb = createAdminClient();
    const { data: profile, error: profileError } = await adminDb
      .from("admin_profiles")
      .select("id, role, created_at")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      // User has a Supabase account but is NOT an authorized administrator
      await supabase.auth.signOut();
      return NextResponse.json(
        { success: false, message: "Access denied. This account is not an authorized administrator." },
        { status: 403 }
      );
    }

    // 6. Record last sign in and activity log
    try {
      await adminDb
        .from("admin_profiles")
        .update({ last_sign_in_at: new Date().toISOString() })
        .eq("id", authData.user.id);

      await adminDb.from("activity_logs").insert({
        admin_id: authData.user.id,
        admin_email: email,
        action: "admin_login",
        entity_type: "auth",
        details: { role: profile.role, ip },
        ip_address: ip,
      });
    } catch {
      // Non-critical logging failure
    }

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful.",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: profile.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[ADMIN LOGIN ERROR]:", error?.message || error);
    const msg =
      error?.message?.includes("Missing") || error?.message?.includes("SUPABASE")
        ? error.message
        : "An unexpected authentication error occurred.";
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
