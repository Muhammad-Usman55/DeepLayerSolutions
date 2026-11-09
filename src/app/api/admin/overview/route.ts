import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

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

    // 1. Inquiries counts
    const [
      { count: totalInquiries },
      { count: newInquiries },
      { count: inReviewInquiries },
      { count: contactedInquiries },
      { count: closedInquiries },
      { count: spamInquiries },
    ] = await Promise.all([
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "in_review"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "contacted"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "closed"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "spam"),
    ]);

    // 2. Subscriber counts
    const [
      { count: totalSubscribers },
      { count: activeSubscribers },
      { count: pendingSubscribers },
      { count: unsubscribedSubscribers },
    ] = await Promise.all([
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("status", "unsubscribed"),
    ]);

    // 3. Email log counts
    const [
      { count: totalEmails },
      { count: sentEmails },
      { count: failedEmails },
    ] = await Promise.all([
      supabase.from("email_logs").select("*", { count: "exact", head: true }),
      supabase.from("email_logs").select("*", { count: "exact", head: true }).eq("status", "sent"),
      supabase.from("email_logs").select("*", { count: "exact", head: true }).eq("status", "failed"),
    ]);

    // 4. Recent activity
    const { data: recentInquiries } = await supabase
      .from("contact_submissions")
      .select("id, reference_number, full_name, email, service, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: recentEmails } = await supabase
      .from("email_logs")
      .select("id, recipient, email_type, status, created_at, error_message")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json(
      {
        success: true,
        stats: {
          inquiries: {
            total: totalInquiries || 0,
            new: newInquiries || 0,
            inProgress: (inReviewInquiries || 0) + (contactedInquiries || 0),
            completed: closedInquiries || 0,
            spam: spamInquiries || 0,
          },
          subscribers: {
            total: totalSubscribers || 0,
            active: activeSubscribers || 0,
            pending: pendingSubscribers || 0,
            unsubscribed: unsubscribedSubscribers || 0,
          },
          emails: {
            total: totalEmails || 0,
            sent: sentEmails || 0,
            failed: failedEmails || 0,
          },
        },
        recentInquiries: recentInquiries || [],
        recentEmails: recentEmails || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[ADMIN OVERVIEW API ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard overview." },
      { status: 500 }
    );
  }
}

