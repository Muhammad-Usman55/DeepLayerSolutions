import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AdminRole } from "@/types/supabase";
import type { User } from "@supabase/supabase-js";

export interface AdminAuthResult {
  user: User;
  profile: {
    id: string;
    role: AdminRole;
    created_at: string;
  };
  isAdmin: boolean;
}

/**
 * Server-side verification of admin authentication and authorization.
 *
 * Checks:
 * 1. Valid Supabase Auth session token via secure HTTP cookies.
 * 2. Explicit existence in the `public.admin_profiles` authorization table.
 *
 * NEVER trusts client-side state alone.
 */
export async function getAuthenticatedAdmin(): Promise<AdminAuthResult | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    // Verify presence and role in admin_profiles table using service role client
    const adminDb = createAdminClient();
    const { data: profile, error: profileError } = await adminDb
      .from("admin_profiles")
      .select("id, role, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.warn(`[SECURITY] User ${user.email} (${user.id}) attempted admin access without profile.`);
      return null;
    }

    const validRoles: AdminRole[] = ["superadmin", "admin", "editor"];
    if (!validRoles.includes(profile.role)) {
      console.warn(`[SECURITY] User ${user.email} has unauthorized role: ${profile.role}`);
      return null;
    }

    return {
      user,
      profile,
      isAdmin: true,
    };
  } catch (error) {
    console.error("[AUTH ERROR] Failed to authenticate admin:", error);
    return null;
  }
}
