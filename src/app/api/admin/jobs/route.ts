import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { jobOpeningsData } from "@/data/careers";

// In-memory or persisted job listings augmented with live Supabase application stats
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

    // 1. Fetch live application counts grouped by position from job_applications
    const { data: applications, error: appError } = await supabase
      .from("job_applications")
      .select("id, applied_position, status, created_at");

    if (appError) {
      console.warn("[JOBS API] Error querying applications:", appError.message);
    }

    const appCountsByPosition: Record<string, { total: number; new: number; shortlisted: number }> = {};

    (applications || []).forEach((app) => {
      const pos = (app.applied_position || "Other").trim();
      if (!appCountsByPosition[pos]) {
        appCountsByPosition[pos] = { total: 0, new: 0, shortlisted: 0 };
      }
      appCountsByPosition[pos].total += 1;
      if (app.status === "new") appCountsByPosition[pos].new += 1;
      if (app.status === "shortlisted") appCountsByPosition[pos].shortlisted += 1;
    });

    // 2. Map default careers catalog with live counts
    const jobs = jobOpeningsData.map((job) => {
      // Find matching application stats by substring or exact match
      const matchingStats = Object.entries(appCountsByPosition).find(
        ([pos]) =>
          pos.toLowerCase().includes(job.title.toLowerCase()) ||
          job.title.toLowerCase().includes(pos.toLowerCase())
      );

      const stats = matchingStats ? matchingStats[1] : { total: 0, new: 0, shortlisted: 0 };

      return {
        id: job.id,
        slug: job.slug,
        title: job.title,
        department: job.department,
        type: job.type,
        location: job.location,
        duration: job.duration,
        stipend: job.stipend,
        shortDescription: job.shortDescription,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        status: "published" as const,
        applicantStats: stats,
      };
    });

    return NextResponse.json({
      success: true,
      jobs,
      totalApplications: (applications || []).length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load job listings." },
      { status: 500 }
    );
  }
}
