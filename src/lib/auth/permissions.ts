import { AdminRole } from "@/types/supabase";

export type AdminPermission =
  | "manage_admins"
  | "manage_settings"
  | "manage_jobs"
  | "manage_applications"
  | "view_resumes"
  | "manage_inquiries"
  | "manage_newsletter"
  | "manage_content"
  | "manage_media"
  | "manage_seo"
  | "view_analytics"
  | "view_activity_logs";

/**
 * Role-Based Access Control Permission Matrix
 */
const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  superadmin: [
    "manage_admins",
    "manage_settings",
    "manage_jobs",
    "manage_applications",
    "view_resumes",
    "manage_inquiries",
    "manage_newsletter",
    "manage_content",
    "manage_media",
    "manage_seo",
    "view_analytics",
    "view_activity_logs",
  ],
  admin: [
    "manage_jobs",
    "manage_applications",
    "view_resumes",
    "manage_inquiries",
    "manage_newsletter",
    "manage_content",
    "manage_media",
    "manage_seo",
    "view_analytics",
    "view_activity_logs",
  ],
  recruitment_manager: [
    "manage_jobs",
    "manage_applications",
    "view_resumes",
    "view_analytics",
  ],
  content_manager: [
    "manage_content",
    "manage_media",
    "manage_seo",
    "view_analytics",
  ],
  editor: [
    "manage_content",
    "manage_media",
    "manage_seo",
  ],
};

/**
 * Checks whether an admin role has a specific permission.
 */
export function hasPermission(
  role: AdminRole | undefined | null,
  permission: AdminPermission
): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Checks whether an admin role is authorized to access a given admin route.
 */
export function canAccessRoute(
  role: AdminRole | undefined | null,
  pathname: string
): boolean {
  if (!role) return false;
  if (role === "superadmin") return true;

  if (pathname === "/admin" || pathname === "/admin/dashboard") {
    return true;
  }
  if (pathname.startsWith("/admin/jobs") || pathname.startsWith("/admin/applications")) {
    return hasPermission(role, "manage_jobs") || hasPermission(role, "manage_applications");
  }
  if (pathname.startsWith("/admin/inquiries") || pathname.startsWith("/admin/contacts")) {
    return hasPermission(role, "manage_inquiries");
  }
  if (pathname.startsWith("/admin/subscribers") || pathname.startsWith("/admin/newsletter")) {
    return hasPermission(role, "manage_newsletter");
  }
  if (pathname.startsWith("/admin/analytics")) {
    return hasPermission(role, "view_analytics");
  }
  if (pathname.startsWith("/admin/pages") || pathname.startsWith("/admin/content")) {
    return hasPermission(role, "manage_content");
  }
  if (pathname.startsWith("/admin/media")) {
    return hasPermission(role, "manage_media");
  }
  if (pathname.startsWith("/admin/notifications")) {
    return true; // All admins have notification inbox
  }
  if (pathname.startsWith("/admin/users")) {
    return hasPermission(role, "manage_admins");
  }
  if (pathname.startsWith("/admin/activity-logs")) {
    return hasPermission(role, "view_activity_logs");
  }
  if (pathname.startsWith("/admin/settings")) {
    return hasPermission(role, "manage_settings");
  }
  if (pathname.startsWith("/admin/emails")) {
    return role === "admin";
  }

  return true;
}
