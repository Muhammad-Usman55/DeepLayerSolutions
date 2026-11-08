import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid credentials format." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 422 }
      );
    }

    // Authenticate with Supabase Auth via SSR client (sets HTTP session cookies)
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

    // Verify user authorization in public.admin_profiles
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
    return NextResponse.json(
      { success: false, message: "An unexpected authentication error occurred." },
      { status: 500 }
    );
  }
}
