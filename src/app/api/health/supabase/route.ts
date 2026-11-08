import { NextResponse } from "next/server";
import { verifySupabaseConnection } from "@/lib/supabase/verify";

/**
 * GET /api/health/supabase
 *
 * Safe diagnostic endpoint to verify Supabase client initialization
 * and backend connectivity without exposing credentials or database secrets.
 */
export async function GET() {
  try {
    const result = await verifySupabaseConnection();

    return NextResponse.json(
      {
        success: result.connected,
        status: result.connected
          ? "connected"
          : result.config.isConfigured
          ? "unreachable"
          : "unconfigured",
        details: {
          clientInitialized: result.initialized,
          backendConnected: result.connected,
          latencyMs: result.latencyMs,
          urlConfigured: result.config.hasUrl,
          anonKeyConfigured: result.config.hasAnonKey,
          serviceRoleKeyConfigured: result.config.hasServiceRoleKey,
          urlPreview: result.config.urlPreview || "Not provided",
          missingVariables: result.config.missingVariables,
        },
        message: result.message,
        timestamp: result.timestamp,
        instructions: !result.config.isConfigured
          ? "Please populate NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in .env.local"
          : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "An unexpected error occurred during Supabase connection verification.",
        error: error?.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
