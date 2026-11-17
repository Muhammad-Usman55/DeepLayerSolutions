import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AdminRole } from "@/types/supabase";

const VALID_ROLES: AdminRole[] = [
  "superadmin",
  "admin",
  "recruitment_manager",
  "content_manager",
  "editor",
];

// GET /api/admin/users - List all admin and staff accounts
export async function GET() {
  const { admin, response } = await authorizeAdmin("manage_admins");
  if (response) return response;

  try {
    const supabase = createAdminClient();

    // 1. Fetch all admin profiles from database
    const { data: profiles, error: profileError } = await supabase
      .from("admin_profiles")
      .select("id, role, created_at");

    if (profileError) {
      return NextResponse.json(
        { success: false, message: profileError.message },
        { status: 500 }
      );
    }

    // 2. Fetch users list from Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      return NextResponse.json(
        { success: false, message: authError.message },
        { status: 500 }
      );
    }

    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

    // 3. Map users that have an admin profile
    const users = (authData.users || [])
      .filter((u) => profileMap.has(u.id))
      .map((u) => {
        const prof = profileMap.get(u.id);
        if (!prof) return null;
        return {
          id: u.id,
          email: u.email || "",
          fullName: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "Admin Staff",
          role: prof.role,
          createdAt: prof.created_at || u.created_at,
          lastSignInAt: u.last_sign_in_at || null,
          isConfirmed: !!u.email_confirmed_at,
        };
      })
      .filter((user): user is NonNullable<typeof user> => user !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      users,
      currentUserId: admin.user.id,
      currentUserRole: admin.profile.role,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load admin accounts." },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Provision new admin or staff account
export async function POST(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_admins");
  if (response) return response;

  // Only Superadmins can provision new staff accounts
  if (admin.profile.role !== "superadmin") {
    return NextResponse.json(
      { success: false, message: "Forbidden. Only Superadmin can create staff accounts." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const role: AdminRole = VALID_ROLES.includes(body.role) ? body.role : "editor";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if user already exists
    const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      return NextResponse.json(
        { success: false, message: "Unable to verify whether this account already exists." },
        { status: 502 }
      );
    }
    const existing = (listData?.users || []).find((u) => u.email?.toLowerCase() === email);

    let userId: string;

    if (existing) {
      userId = existing.id;
      // Update password and roles for existing user
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
        user_metadata: { ...existing.user_metadata, role, full_name: fullName || existing.email?.split("@")[0] },
        app_metadata: { ...existing.app_metadata, role },
      });
      if (updateError) {
        return NextResponse.json(
          { success: false, message: "Unable to update the existing account." },
          { status: 502 }
        );
      }
    } else {
      // Create new user in Supabase Auth
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role, full_name: fullName || email.split("@")[0] },
        app_metadata: { role },
      });

      if (createError) {
        return NextResponse.json(
          { success: false, message: createError.message },
          { status: 400 }
        );
      }

      userId = createData.user.id;
    }

    // Upsert into admin_profiles
    const { error: profileError } = await supabase
      .from("admin_profiles")
      .upsert({ id: userId, role }, { onConflict: "id" });

    if (profileError) {
      return NextResponse.json(
        { success: false, message: `Auth created but profile failed: ${profileError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin account for ${email} successfully created with role: ${role}.`,
      user: { id: userId, email, role, fullName },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create admin account." },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users - Update an existing admin's role or password
export async function PATCH(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_admins");
  if (response) return response;

  if (admin.profile.role !== "superadmin") {
    return NextResponse.json(
      { success: false, message: "Forbidden. Only Superadmin can update staff roles." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const userId = body.userId;
    const role: AdminRole = VALID_ROLES.includes(body.role) ? body.role : undefined;
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : undefined;
    const password = typeof body.password === "string" && body.password.length >= 8 ? body.password : undefined;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Prevent changing current superadmin's own role to non-superadmin accidentally
    if (userId === admin.user.id && role && role !== "superadmin") {
      return NextResponse.json(
        { success: false, message: "You cannot demote yourself from Superadmin." },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (password) updates.password = password;
    if (role) {
      updates.app_metadata = { role };
      updates.user_metadata = { role };
    }
    if (fullName) {
      updates.user_metadata = { ...(updates.user_metadata || {}), full_name: fullName };
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, updates);
      if (updateError) {
        return NextResponse.json(
          { success: false, message: updateError.message },
          { status: 400 }
        );
      }
    }

    if (role) {
      const { error: profileUpdateError } = await supabase
        .from("admin_profiles")
        .upsert({ id: userId, role }, { onConflict: "id" });
      if (profileUpdateError) {
        return NextResponse.json(
          { success: false, message: "Account updated, but the admin role could not be saved." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin account updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update admin account." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users - Revoke staff access and remove account
export async function DELETE(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_admins");
  if (response) return response;

  if (admin.profile.role !== "superadmin") {
    return NextResponse.json(
      { success: false, message: "Forbidden. Only Superadmin can delete staff accounts." },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID parameter is required." },
        { status: 400 }
      );
    }

    // Safety guard: cannot delete yourself
    if (userId === admin.user.id) {
      return NextResponse.json(
        { success: false, message: "Safety restriction: You cannot delete your own account." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Delete from admin_profiles
    const { error: profileDeleteError } = await supabase
      .from("admin_profiles")
      .delete()
      .eq("id", userId);
    if (profileDeleteError) {
      return NextResponse.json(
        { success: false, message: "Unable to revoke admin access." },
        { status: 500 }
      );
    }

    // 2. Delete user from Supabase Auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    if (deleteError) {
      return NextResponse.json(
        { success: false, message: deleteError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin user access revoked and account deleted successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to delete admin account." },
      { status: 500 }
    );
  }
}
