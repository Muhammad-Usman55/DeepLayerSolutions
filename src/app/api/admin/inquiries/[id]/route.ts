import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactSubmissionStatus } from "@/types/supabase";

const VALID_STATUSES: ContactSubmissionStatus[] = [
  "new",
  "in_review",
  "contacted",
  "closed",
  "spam",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing inquiry ID." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const updates: {
      status?: ContactSubmissionStatus;
      admin_notes?: string | null;
      updated_at?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (body.status !== undefined) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
          { success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
          { status: 422 }
        );
      }
      updates.status = body.status;
    }

    if (body.admin_notes !== undefined) {
      updates.admin_notes =
        typeof body.admin_notes === "string" ? body.admin_notes.slice(0, 5000) : null;
    }

    const supabase = createAdminClient();
    const { data: updated, error } = await supabase
      .from("contact_submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !updated) {
      console.error("[INQUIRY UPDATE ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry updated successfully.",
        inquiry: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[INQUIRY PATCH EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Server error occurred while updating inquiry." },
      { status: 500 }
    );
  }
}
