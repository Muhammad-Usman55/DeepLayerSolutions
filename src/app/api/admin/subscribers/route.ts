import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubscriberStatus } from "@/types/supabase";

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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
    const offset = (page - 1) * pageSize;

    const supabase = createAdminClient();
    let query = supabase
      .from("subscribers")
      .select("id, email, status, subscribed_at, unsubscribed_at, created_at", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status !== "all" && status) {
      query = query.eq("status", status as SubscriberStatus);
    }

    if (search) {
      query = query.ilike("email", `%${search}%`);
    }

    query = query.range(offset, offset + pageSize - 1);

    const { data: subscribers, count, error } = await query;

    if (error) {
      console.error("[SUBSCRIBERS LIST ERROR]:", error);
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
        subscribers: subscribers || [],
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
    console.error("[SUBSCRIBERS API EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch subscribers." },
      { status: 500 }
    );
  }
}
