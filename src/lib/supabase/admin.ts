import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Creates an administrative Supabase client using the Secret Service Role Key.
 *
 * CRITICAL SECURITY RULES:
 * 1. This client BYPASSES Row Level Security (RLS) policies.
 * 2. It is strictly protected by `server-only` and MUST NEVER be imported into Client Components.
 * 3. Use solely for trusted server operations (e.g. backend webhooks, contact form ingestion,
 *    cron jobs, or system administration).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "[Supabase Admin Client] Missing NEXT_PUBLIC_SUPABASE_URL environment variable."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "[Supabase Admin Client] Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
        "Ensure this key is set in .env.local and never exposed to the client."
    );
  }

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
