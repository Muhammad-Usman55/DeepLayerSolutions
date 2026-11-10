import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateRequestOrigin } from "@/lib/security/csrf";
import { logAdminActivity } from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  try {
    if (!validateRequestOrigin(req)) {
      return NextResponse.json(
        { success: false, message: "Cross-site request blocked." },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters long." },
        { status: 422 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json(
        { success: false, message: "Session expired or invalid reset link. Please request a new link." },
        { status: 401 }
      );
    }

    const { error: updateErr } = await supabase.auth.updateUser({
      password,
    });

    if (updateErr) {
      return NextResponse.json(
        { success: false, message: updateErr.message || "Failed to update password." },
        { status: 400 }
      );
    }

    await logAdminActivity({
      adminId: user.id,
      adminEmail: user.email || "unknown",
      action: "password_reset",
      entityType: "auth",
      details: { timestamp: new Date().toISOString() },
    });

    return NextResponse.json(
      { success: true, message: "Your password has been successfully updated. You may now sign in." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[RESET PASSWORD ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while resetting password." },
      { status: 500 }
    );
  }
}
