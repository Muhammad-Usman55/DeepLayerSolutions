import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendInquiryStatusUpdateEmail } from "@/lib/email/dispatch";
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
  const { admin, response } = await authorizeAdmin("manage_inquiries");
  if (response) return response;

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

    // Automatically send status update notification email to the client
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";
    if (body.status !== undefined && updated.email) {
      try {
        const dispatchRes = await sendInquiryStatusUpdateEmail({
          inquiryId: updated.id,
          referenceNumber: updated.reference_number,
          fullName: updated.full_name,
          email: updated.email,
          service: updated.service,
          subject: updated.subject,
          status: updated.status,
          adminNotes: updated.admin_notes,
        });
        emailStatus = dispatchRes.status;
      } catch (emailErr) {
        console.error("[INQUIRY STATUS EMAIL ERROR]:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          emailStatus === "sent"
            ? "Inquiry updated and status notification email sent to client."
            : "Inquiry updated successfully.",
        inquiry: updated,
        emailStatus,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, response } = await authorizeAdmin("manage_inquiries");
  if (response) return response;

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing inquiry ID." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[INQUIRY DELETE ERROR]:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to delete inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[INQUIRY DELETE EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: error?.message || "Server error deleting inquiry." },
      { status: 500 }
    );
  }
}


