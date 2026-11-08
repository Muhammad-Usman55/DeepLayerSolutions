/**
 * DeepLayer Solutions — Supabase Integration Module
 *
 * For Client Components:
 *   import { createClient } from "@/lib/supabase/client";
 *
 * For Server Components, Server Actions & Route Handlers:
 *   import { createClient } from "@/lib/supabase/server";
 *
 * For Server-Side Admin / Elevated Operations (Bypasses RLS):
 *   import { createAdminClient } from "@/lib/supabase/admin";
 *
 * For Middleware Session Updates:
 *   import { updateSession } from "@/lib/supabase/middleware";
 */

export * from "./client";
export type { Database, Json } from "@/types/supabase";
