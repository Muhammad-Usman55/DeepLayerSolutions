import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { EmailLogStatus, EmailType } from "@/types/supabase";

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "all";
    const emailType = searchParams.get("type")?.trim() || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
    const offset = (page - 1) * pageSize;

    const supabase = createAdminClient();
    let query = supabase
      .from("email_logs")
      .select("id, recipient, email_type, related_record_id, provider_message_id, status, error_message, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false });

    if (status !== "all" && status) {
      query = query.eq("status", status as EmailLogStatus);
    }

    if (emailType !== "all" && emailType) {
      query = query.eq("email_type", emailType as EmailType);
    }

    if (search) {
      query = query.ilike("recipient", `%${search}%`);
    }

    query = query.range(offset, offset + pageSize - 1);

    const { data: emailLogs, count, error } = await query;

    if (error) {
      console.error("[EMAIL LOGS DB ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Database query error." },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    // Sanitize any potential provider secrets from error messages before sending
    const sanitizedLogs = (emailLogs || []).map((log) => ({
      ...log,
      error_message: log.error_message
        ? log.error_message.replace(/re_[a-zA-Z0-9_]{20,}/g, "[REDACTED_API_KEY]")
        : null,
    }));

    return NextResponse.json(
      {
        success: true,
        emailLogs: sanitizedLogs,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[EMAIL LOGS API EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch email logs." },
      { status: 500 }
    );
  }
}
