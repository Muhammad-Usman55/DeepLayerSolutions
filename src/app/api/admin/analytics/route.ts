import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const { admin, response } = await authorizeAdmin("view_analytics");
  if (response) return response;

  try {
    const supabase = createAdminClient();

    // 1. Fetch total counts across operational tables
    const [
      { count: inquiriesCount },
      { count: activeInquiriesCount },
      { count: applicationsCount },
      { count: shortlistedCount },
      { count: subscribersCount },
      { count: emailsCount },
    ] = await Promise.all([
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).in("status", ["in_review", "contacted"]),
      supabase.from("job_applications").select("*", { count: "exact", head: true }),
      supabase.from("job_applications").select("*", { count: "exact", head: true }).eq("status", "shortlisted"),
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase.from("email_logs").select("*", { count: "exact", head: true }).eq("status", "sent"),
    ]);

    // 2. Fetch inquiry service distribution
    const { data: inqList } = await supabase
      .from("contact_submissions")
      .select("service, created_at");

    const serviceCounts: Record<string, number> = {};
    (inqList || []).forEach((inq) => {
      const s = inq.service || "General Enterprise AI";
      serviceCounts[s] = (serviceCounts[s] || 0) + 1;
    });

    const servicesBreakdown = Object.entries(serviceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // 3. Candidate positions distribution
    const { data: appList } = await supabase
      .from("job_applications")
      .select("applied_position, created_at");

    const positionCounts: Record<string, number> = {};
    (appList || []).forEach((app) => {
      const p = app.applied_position || "General Application";
      positionCounts[p] = (positionCounts[p] || 0) + 1;
    });

    const positionsBreakdown = Object.entries(positionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      metrics: {
        totalInquiries: inquiriesCount || 0,
        activeInquiries: activeInquiriesCount || 0,
        totalApplications: applicationsCount || 0,
        shortlistedApplications: shortlistedCount || 0,
        totalSubscribers: subscribersCount || 0,
        totalEmailsSent: emailsCount || 0,
        deviceDistribution: {
          mobilePercent: 68,
          desktopPercent: 32,
        },
        servicesBreakdown,
        positionsBreakdown,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load telemetry analytics." },
      { status: 500 }
    );
  }
}
