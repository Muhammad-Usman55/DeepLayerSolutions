import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const supabase = createAdminClient();

    // 1. Fetch unread inquiries
    const { data: inquiries } = await supabase
      .from("contact_submissions")
      .select("id, reference_number, full_name, email, service, created_at, status")
      .order("created_at", { ascending: false })
      .limit(10);

    // 2. Fetch new job applications
    const { data: applications } = await supabase
      .from("job_applications")
      .select("id, full_name, applied_position, email, created_at, status")
      .order("created_at", { ascending: false })
      .limit(15);

    // 3. Fetch recent subscribers
    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("id, email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    // 4. Fetch recent email delivery errors (if any)
    const { data: failedEmails } = await supabase
      .from("email_logs")
      .select("id, recipient, email_type, status, error_message, created_at")
      .eq("status", "failed")
      .order("created_at", { ascending: false })
      .limit(5);

    const notifications: Array<{
      id: string;
      type: "inquiry" | "application" | "subscriber" | "alert";
      title: string;
      message: string;
      link: string;
      createdAt: string;
      isRead: boolean;
    }> = [];

    (inquiries || []).forEach((inq) => {
      notifications.push({
        id: `inq-${inq.id}`,
        type: "inquiry",
        title: `Contact Inquiry: ${inq.full_name}`,
        message: `New inquiry for ${inq.service || "General Consulting"} from ${inq.email}.`,
        link: "/admin/inquiries",
        createdAt: inq.created_at,
        isRead: inq.status !== "new",
      });
    });

    (applications || []).forEach((app) => {
      notifications.push({
        id: `app-${app.id}`,
        type: "application",
        title: `Job Application: ${app.full_name}`,
        message: `Applied for ${app.applied_position}. Status: ${app.status.replace("_", " ")}.`,
        link: "/admin/applications",
        createdAt: app.created_at,
        isRead: app.status !== "new",
      });
    });

    (subscribers || []).forEach((sub) => {
      notifications.push({
        id: `sub-${sub.id}`,
        type: "subscriber",
        title: `Newsletter Subscriber Opt-In`,
        message: `${sub.email} joined engineering newsletter.`,
        link: "/admin/subscribers",
        createdAt: sub.created_at,
        isRead: true,
      });
    });

    (failedEmails || []).forEach((f) => {
      notifications.push({
        id: `fail-${f.id}`,
        type: "alert",
        title: `Email Delivery Alert`,
        message: `Failed to deliver ${f.email_type} to ${f.recipient}: ${f.error_message || "SMTP error"}.`,
        link: "/admin/emails",
        createdAt: f.created_at,
        isRead: false,
      });
    });

    // Sort descending by timestamp
    notifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load notifications." },
      { status: 500 }
    );
  }
}
