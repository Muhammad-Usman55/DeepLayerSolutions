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

    const validRoles: AdminRole[] = [
      "superadmin",
      "admin",
      "recruitment_manager",
      "content_manager",
      "editor",
    ];

    // Verify presence and role in admin_profiles table using service role client
    let profile: any = null;
    try {
      const adminDb = createAdminClient();
      const { data, error } = await adminDb
        .from("admin_profiles")
        .select("id, role, full_name, email, avatar_url, created_at")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        profile = data;
      }
    } catch (e: any) {
      console.warn("[ADMIN AUTH] Service client profile lookup error:", e?.message || e);
    }

    // Role resolution: prefer database profile, fallback to verified user metadata role
    const resolvedRole: AdminRole | null =
      profile?.role ||
      (user.user_metadata?.role as AdminRole) ||
      (user.app_metadata?.role as AdminRole) ||
      null;

    if (!resolvedRole || !validRoles.includes(resolvedRole)) {
      console.warn(`[SECURITY] User ${user.email} (${user.id}) lacks authorized admin role: ${resolvedRole}`);
      return null;
    }

    return {
      user,
      profile: {
        id: profile?.id || user.id,
        role: resolvedRole,
        full_name: profile?.full_name || user.user_metadata?.full_name || null,
        email: profile?.email || user.email || null,
        avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || null,
        created_at: profile?.created_at || user.created_at || new Date().toISOString(),
      },
      isAdmin: true,
    };
  } catch (error: any) {
    if (error && typeof error === "object" && ("digest" in error || error?.message?.includes("cookies()"))) {
      throw error;
    }
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
