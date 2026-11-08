import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactSubmissionStatus } from "@/types/supabase";

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
    const service = searchParams.get("service")?.trim() || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
    const offset = (page - 1) * pageSize;

    const supabase = createAdminClient();
    let query = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Status filter
    if (status !== "all" && status) {
      query = query.eq("status", status as ContactSubmissionStatus);
    }

    // Service filter
    if (service !== "all" && service) {
      query = query.eq("service", service);
    }

    // Text search on full_name, email, or reference_number
    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,reference_number.ilike.%${search}%`
      );
    }

    // Pagination
    query = query.range(offset, offset + pageSize - 1);

    const { data: inquiries, count, error } = await query;

    if (error) {
      console.error("[INQUIRIES LIST DB ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Database query error." },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      {
        success: true,
        inquiries: inquiries || [],
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
    console.error("[INQUIRIES API EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
