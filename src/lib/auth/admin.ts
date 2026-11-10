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
    full_name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
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
      .select("id, role, full_name, email, avatar_url, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.warn(`[SECURITY] User ${user.email} (${user.id}) attempted admin access without profile.`);
      return null;
    }

    const validRoles: AdminRole[] = [
      "superadmin",
      "admin",
      "recruitment_manager",
      "content_manager",
      "editor",
    ];
    if (!validRoles.includes(profile.role)) {
      console.warn(`[SECURITY] User ${user.email} has unauthorized role: ${profile.role}`);
      return null;
    }

    return {
      user,
      profile: {
        id: profile.id,
        role: profile.role,
        full_name: profile.full_name || user.user_metadata?.full_name || null,
        email: profile.email || user.email || null,
        avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
        created_at: profile.created_at,
      },
      isAdmin: true,
    };
  } catch (error) {
    console.error("[AUTH ERROR] Failed to authenticate admin:", error);
    return null;
  }
}

/**
 * Helper to record an administrative action in the activity_logs table.
 * Never throws an error that interrupts the caller.
 */
export async function logAdminActivity(params: {
  adminId?: string | null;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: Record<string, any>;
  ipAddress?: string | null;
}) {
  try {
    const adminDb = createAdminClient();
    await adminDb.from("activity_logs").insert({
      admin_id: params.adminId || null,
      admin_email: params.adminEmail.toLowerCase().trim(),
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId || null,
      details: params.details || {},
      ip_address: params.ipAddress || null,
    });
  } catch (err: any) {
    console.error("[ACTIVITY LOG INSERT ERROR]:", err?.message || err);
  }
}
