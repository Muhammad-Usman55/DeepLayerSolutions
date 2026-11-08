import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

/**
 * Creates a Supabase client for Server Components, Server Actions, and Route Handlers.
 *
 * Uses `next/headers` cookies to read and write authentication session tokens securely.
 * Protected with `server-only` to guarantee it is never bundled into client-side code.
 * Adheres strictly to Row Level Security (RLS) as an authenticated user or anon visitor.
 */
export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[Supabase Server Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // In Next.js Server Components cannot set cookies directly;
          // this can be safely ignored if middleware handles session refreshes.
        }
      },
    },
  });
}

