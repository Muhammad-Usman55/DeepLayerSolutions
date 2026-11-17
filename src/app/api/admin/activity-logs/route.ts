import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const { admin, response } = await authorizeAdmin("view_activity_logs");
  if (response) return response;

  try {
    const supabase = createAdminClient();

    // 1. Fetch recent email logs as operational dispatch events
    const { data: emails } = await supabase
      .from("email_logs")
      .select("id, recipient, email_type, status, error_message, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    // 2. Fetch recent job application submissions & status changes
    const { data: apps } = await supabase
      .from("job_applications")
      .select("id, full_name, applied_position, status, created_at, admin_notes")
      .order("created_at", { ascending: false })
      .limit(20);

    // 3. Fetch recent contact submissions
    const { data: inqs } = await supabase
      .from("contact_submissions")
      .select("id, full_name, email, service, status, created_at, admin_notes")
      .order("created_at", { ascending: false })
      .limit(20);

    // 4. Fetch admin accounts for sign-in timestamps
    const { data: authUsers } = await supabase.auth.admin.listUsers();

    const logs: Array<{
      id: string;
      action: string;
      adminEmail: string;
      entityType: "auth" | "ats" | "inquiry" | "email";
      details: string;
      createdAt: string;
      ipAddress: string;
    }> = [];

    // Add admin last sign ins
    (authUsers?.users || []).forEach((u) => {
      if (u.last_sign_in_at) {
        logs.push({
          id: `auth-${u.id}`,
          action: "admin_login",
          adminEmail: u.email || "staff@deeplayersolutions.com",
          entityType: "auth",
          details: `Staff authenticated via SSR Session cookie token.`,
          createdAt: u.last_sign_in_at,
          ipAddress: "Verified HTTPS Edge",
        });
      }
    });

    // Add job application audit events
    (apps || []).forEach((app) => {
      logs.push({
        id: `ats-${app.id}`,
        action: app.status === "new" ? "application_submitted" : `application_${app.status}`,
        adminEmail: "Talent Acquisition Team",
        entityType: "ats",
        details: `Candidate ${app.full_name} for ${app.applied_position} (Status: ${app.status}).`,
        createdAt: app.created_at,
        ipAddress: "Public ATS Form",
      });
    });

    // Add inquiry triage events
    (inqs || []).forEach((inq) => {
      logs.push({
        id: `inq-${inq.id}`,
        action: inq.status === "new" ? "inquiry_received" : `inquiry_${inq.status}`,
        adminEmail: "Client Solutions Triage",
        entityType: "inquiry",
        details: `Inquiry from ${inq.full_name} (${inq.email}) for ${inq.service || "Consulting"}.`,
        createdAt: inq.created_at,
        ipAddress: "Contact Form API",
      });
    });

    // Add email dispatch audit events
    (emails || []).forEach((em) => {
      logs.push({
        id: `email-${em.id}`,
        action: em.status === "sent" ? "email_dispatched" : "email_failed",
        adminEmail: "Automated Dispatcher",
        entityType: "email",
        details: `${em.email_type} sent to ${em.recipient} (Status: ${em.status}).`,
        createdAt: em.created_at,
        ipAddress: "Gmail API Relay",
      });
    });

    // Sort descending by timestamp
    logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      logs: logs.slice(0, 50),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load activity logs." },
      { status: 500 }
    );
  }
}
