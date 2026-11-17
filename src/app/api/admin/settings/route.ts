import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/config/site";

// GET /api/admin/settings - Retrieve system health, company parameters, and admin status
export async function GET() {
  const { admin, response } = await authorizeAdmin("manage_settings");
  if (response) return response;

  // 1. Check Supabase DB Health & Measure Latency
  let dbStatus = "healthy";
  let dbLatencyMs = 0;
  try {
    const start = Date.now();
    const supabase = createAdminClient();
    const { error } = await supabase.from("admin_profiles").select("id").limit(1);
    dbLatencyMs = Date.now() - start;
    if (error) dbStatus = "degraded";
  } catch {
    dbStatus = "down";
  }

  // 2. Check Gmail API Configuration
  const gmailConfigured = !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN &&
    process.env.GMAIL_USER_EMAIL
  );

  return NextResponse.json({
    success: true,
    system: {
      environment: process.env.NODE_ENV || "production",
      canonicalDomain: "www.deeplayersolutions.com",
      siteUrl: siteConfig.url,
      nodeVersion: process.version,
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
        provider: "Supabase Managed PostgreSQL",
      },
      emailService: {
        status: gmailConfigured ? "connected" : "unconfigured",
        provider: "Google Cloud Gmail API (OAuth 2.0)",
        senderEmail: process.env.GMAIL_SENDER_EMAIL || "deeplayersolutions@gmail.com",
      },
      security: {
        hstsEnabled: true,
        csrfProtection: true,
        rateLimiterActive: true,
        authCookieType: "HTTP-Only Secure SameSite Lax",
      },
    },
    company: {
      name: siteConfig.name,
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      whatsapp: siteConfig.contact.whatsapp,
      whatsappUrl: siteConfig.contact.whatsappUrl,
      address: siteConfig.contact.address,
      availability: siteConfig.contact.availability,
    },
    account: {
      id: admin.user.id,
      email: admin.user.email,
      role: admin.profile.role,
      fullName: admin.profile.full_name || admin.user.user_metadata?.full_name || "Authorized Staff",
      lastSignInAt: admin.user.last_sign_in_at,
    },
  });
}

// PATCH /api/admin/settings - Update current admin profile / change password
export async function PATCH(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_settings");
  if (response) return response;

  try {
    const body = await req.json();
    const { fullName, newPassword, confirmPassword } = body;

    const supabase = createAdminClient();
    const updates: any = {};

    if (newPassword) {
      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 8 characters long." },
          { status: 400 }
        );
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { success: false, message: "New password and confirmation do not match." },
          { status: 400 }
        );
      }
      updates.password = newPassword;
    }

    if (fullName && typeof fullName === "string") {
      updates.user_metadata = {
        ...(admin.user.user_metadata || {}),
        full_name: fullName.trim(),
      };
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        admin.user.id,
        updates
      );

      if (updateError) {
        return NextResponse.json(
          { success: false, message: updateError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin security credentials and profile updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update settings." },
      { status: 500 }
    );
  }
}
