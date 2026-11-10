import { NextRequest, NextResponse } from "next/server";
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

    // 2. Rate limiting (3 attempts per 15 minutes)
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit({
      endpoint: "admin_forgot_password",
      maxRequests: 3,
      windowSeconds: 900,
      ip,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many password reset requests. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid staff email address." },
        { status: 422 }
      );
    }

    const adminDb = createAdminClient();

    // Verify if user exists in auth.users and has an admin_profiles entry
    const { data: usersData } = await adminDb.auth.admin.listUsers();
    const targetUser = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === email
    );

    // Prevent user enumeration: always return standard success message
    if (targetUser) {
      const { data: profile } = await adminDb
        .from("admin_profiles")
        .select("id, role")
        .eq("id", targetUser.id)
        .maybeSingle();

      if (profile) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deeplayersolutions.vercel.app";
        const redirectTo = `${siteUrl.replace(/\/$/, "")}/admin/reset-password`;

        await adminDb.auth.resetPasswordForEmail(email, {
          redirectTo,
        });

        console.info(`[ADMIN PASSWORD RESET INITIATED] For ${email}`);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "If this email matches an active administrator account, password reset instructions have been dispatched.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[FORGOT PASSWORD ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to process password reset request." },
      { status: 500 }
    );
  }
}
