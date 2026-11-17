import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAllJobs, addJob, updateJob, deleteJob, type StoredJob } from "@/lib/jobs/store";

// GET /api/admin/jobs - Fetch all jobs with live applicant statistics
export async function GET() {
  const { admin, response } = await authorizeAdmin("manage_jobs");
  if (response) return response;

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

    // 2. Read stored jobs
    const storedJobs = getAllJobs();

    // 3. Augment each job with live application counts
    const jobs = storedJobs.map((job) => {
      const matchingStats = Object.entries(appCountsByPosition).find(
        ([pos]) =>
          pos.toLowerCase().includes(job.title.toLowerCase()) ||
          job.title.toLowerCase().includes(pos.toLowerCase())
      );

      const stats = matchingStats ? matchingStats[1] : { total: 0, new: 0, shortlisted: 0 };

      return {
        ...job,
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

// POST /api/admin/jobs - Create a new job vacancy
export async function POST(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_jobs");
  if (response) return response;

  try {
    const body = await req.json();
    const { title, department, type, location, stipend, duration, shortDescription, description, responsibilities, requirements, status } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Vacancy title is required." },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newJob = addJob({
      title: title.trim(),
      slug,
      department: department || "Engineering & AI",
      type: type || "Internship",
      location: location || "Remote (Global / Pakistan)",
      duration: duration || "3 – 6 Months",
      stipend: stipend || "Competitive Paid Stipend + Fast-Track Offer",
      shortDescription: shortDescription || "Newly created vacancy.",
      description: description || shortDescription || "No detailed description provided.",
      responsibilities: Array.isArray(responsibilities) && responsibilities.length > 0 ? responsibilities : ["Develop and deploy production-grade software modules."],
      requirements: Array.isArray(requirements) && requirements.length > 0 ? requirements : ["Relevant technical experience and proficiency."],
      status: status === "closed" || status === "draft" ? status : "published",
    });

    return NextResponse.json({
      success: true,
      message: `Job vacancy "${newJob.title}" created successfully.`,
      job: newJob,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create job vacancy." },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/jobs - Update an existing vacancy (title, department, status, etc.)
export async function PATCH(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_jobs");
  if (response) return response;

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required." },
        { status: 400 }
      );
    }

    const updated = updateJob(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Job vacancy not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Job vacancy "${updated.title}" updated successfully.`,
      job: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update job vacancy." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/jobs - Delete a job vacancy
export async function DELETE(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_jobs");
  if (response) return response;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID parameter is required." },
        { status: 400 }
      );
    }

    const deleted = deleteJob(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Job vacancy not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job vacancy deleted successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to delete job vacancy." },
      { status: 500 }
    );
  }
}
