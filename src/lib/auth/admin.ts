import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import type { AdminRole, Json } from "@/types/supabase";
import type { User } from "@supabase/supabase-js";
import { hasPermission, type AdminPermission } from "@/lib/auth/permissions";

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

    // Only the server-controlled admin_profiles table can grant admin access.
    // Supabase user_metadata is user-editable and must never decide authorization.
    const adminDb = createAdminClient();
    const { data: profile, error: profileError } = await adminDb
      .from("admin_profiles")
      .select("id, role, full_name, email, avatar_url, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("[ADMIN AUTH] Profile lookup failed:", profileError.message);
      return null;
    }

    if (!profile) {
      return null;
    }

    const resolvedRole = profile.role as AdminRole;

    if (!resolvedRole || !validRoles.includes(resolvedRole)) {
      console.warn(`[SECURITY] User ${user.email} (${user.id}) lacks authorized admin role: ${resolvedRole}`);
      return null;
    }

    return {
      user,
      profile: {
        id: profile.id || user.id,
        role: resolvedRole,
        full_name: profile.full_name || user.user_metadata?.full_name || null,
        email: profile.email || user.email || null,
        avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
        created_at: profile.created_at || user.created_at || new Date().toISOString(),
      },
      isAdmin: true,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      error &&
      typeof error === "object" &&
      ("digest" in error || errorMessage.includes("cookies()"))
    ) {
      throw error;
    }
    console.error("[AUTH ERROR] Failed to authenticate admin:", errorMessage);
    return null;
  }
}

type AdminAuthorizationResult =
  | { admin: AdminAuthResult; response: null }
  | { admin: null; response: NextResponse };

/** Authenticate an admin and enforce its server-side permission for an API route. */
export async function authorizeAdmin(
  permission?: AdminPermission
): Promise<AdminAuthorizationResult> {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return {
      admin: null,
      response: NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      ),
    };
  }

  if (permission && !hasPermission(admin.profile.role, permission)) {
    return {
      admin: null,
      response: NextResponse.json(
        { success: false, message: "Forbidden." },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      ),
    };
  }

  return { admin, response: null };
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
  details?: Record<string, Json | undefined>;
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
  } catch (err: unknown) {
    console.error(
      "[ACTIVITY LOG INSERT ERROR]:",
      err instanceof Error ? err.message : String(err)
    );
  }
}
