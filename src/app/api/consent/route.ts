import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { consentId, necessary, analytics, marketing, policyVersion } = body;

    // Consent ID validation
    if (!consentId || typeof consentId !== "string" || consentId.length < 8 || consentId.length > 100) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing consent identifier." },
        { status: 422 }
      );
    }

    // Strictly necessary cookies must be true
    if (necessary !== true) {
      return NextResponse.json(
        { success: false, message: "Necessary cookies must remain true." },
        { status: 422 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("cookie_consents")
      .upsert(
        {
          consent_id: consentId.trim(),
          necessary: true,
          analytics: Boolean(analytics),
          marketing: Boolean(marketing),
          policy_version: typeof policyVersion === "string" ? policyVersion.slice(0, 20) : "1.0",
        },
        { onConflict: "consent_id" }
      )
      .select("id, consent_id, analytics, marketing, created_at")
      .single();

    if (error) {
      console.error("[COOKIE CONSENT DB ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Failed to persist consent receipt." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consent preferences recorded.",
        record: data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[COOKIE CONSENT API EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
