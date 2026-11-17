import { NextResponse } from "next/server";
import { verifySupabaseConnection } from "@/lib/supabase/verify";

/**
 * GET /api/health/supabase
 *
 * Public uptime signal. Keep configuration details and provider errors private.
 */
export async function GET() {
  try {
    const result = await verifySupabaseConnection();

    return NextResponse.json(
      {
        success: result.connected,
        status: result.connected ? "connected" : "unavailable",
        latencyMs: result.connected ? result.latencyMs : undefined,
      },
      {
        status: result.connected ? 200 : 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "unavailable",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
