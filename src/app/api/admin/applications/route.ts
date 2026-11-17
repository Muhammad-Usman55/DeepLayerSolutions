import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendCareerStatusUpdateEmail } from "@/lib/email/dispatch";
import type { Database, JobApplicationStatus } from "@/types/supabase";

type JobApplicationUpdate = Database["public"]["Tables"]["job_applications"]["Update"];

export async function GET(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_applications");
  if (response) return response;

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
    const offset = (page - 1) * pageSize;

    const supabase = createAdminClient();
    let query = supabase
      .from("job_applications")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status !== "all" && status) {
      query = query.eq("status", status as JobApplicationStatus);
    }

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,applied_position.ilike.%${search}%`
      );
    }

    query = query.range(offset, offset + pageSize - 1);

    const { data: applications, count, error } = await query;

    if (error) {
      // If table doesn't exist yet, return empty list gracefully
      if (error.code === "PGRST205") {
        return NextResponse.json({
          success: true,
          applications: [],
          pagination: { total: 0, page: 1, pageSize, totalPages: 0 },
          notice: "Table job_applications is pending migration in Supabase SQL editor.",
        });
      }
      console.error("[ADMIN APPLICATIONS DB ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Database query error." },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      success: true,
      applications: applications || [],
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error("[ADMIN APPLICATIONS API EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch job applications." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_applications");
  if (response) return response;

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return NextResponse.json(
        { success: false, message: "Application ID is required." },
        { status: 400 }
      );
    }

    const { id, status, admin_notes } = body;
    const updates: JobApplicationUpdate = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updates.status = status as JobApplicationStatus;
    }
    if (admin_notes !== undefined) {
      updates.admin_notes = admin_notes;
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("job_applications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[ADMIN APPLICATION UPDATE ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update application status." },
        { status: 500 }
      );
    }

    // Automatically dispatch career status notification email to candidate
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";
    if (status && data?.email) {
      try {
        const dispatchRes = await sendCareerStatusUpdateEmail({
          applicationId: data.id,
          fullName: data.full_name,
          email: data.email,
          position: data.applied_position,
          status: data.status,
          adminNotes: data.admin_notes,
        });
        emailStatus = dispatchRes.status;
      } catch (emailErr) {
        console.error("[CAREER STATUS EMAIL ERROR]:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        emailStatus === "sent"
          ? "Application updated and status notification email sent to candidate."
          : "Application updated successfully.",
      application: data,
      emailStatus,
    });
  } catch (error: any) {
    console.error("[ADMIN APPLICATION UPDATE EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to update application." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/applications?id=... - Delete candidate application
export async function DELETE(req: NextRequest) {
  const { admin, response } = await authorizeAdmin("manage_applications");
  if (response) return response;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Application ID is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("job_applications").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to delete application." },
      { status: 500 }
    );
  }
}
