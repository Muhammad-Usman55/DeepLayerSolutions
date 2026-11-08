import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConfigStatus {
  hasUrl: boolean;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  urlPreview?: string;
  isConfigured: boolean;
  missingVariables: string[];
}

export interface SupabaseConnectionResult {
  config: SupabaseConfigStatus;
  initialized: boolean;
  connected: boolean;
  latencyMs: number | null;
  message: string;
  error?: string;
  timestamp: string;
}

/**
 * Safely masks a sensitive key for diagnostic reporting.
 * e.g. "eyJhbGciOiJIUzI1NiIs..." -> "eyJhb...4f8a"
 */
function maskKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  if (key.length <= 8) return "********";
  return `${key.slice(0, 5)}...${key.slice(-4)}`;
}

/**
 * Inspects environment variables without exposing secrets.
 */
export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  const missingVariables: string[] = [];

  const hasUrl = Boolean(url && url.length > 0 && !url.includes("your-project"));
  const hasAnonKey = Boolean(anonKey && anonKey.length > 0 && !anonKey.includes("your-anon-key"));
  const hasServiceRoleKey = Boolean(
    serviceRoleKey && serviceRoleKey.length > 0 && !serviceRoleKey.includes("your-service-role-key")
  );

  if (!hasUrl) missingVariables.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!hasAnonKey) missingVariables.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!hasServiceRoleKey) missingVariables.push("SUPABASE_SERVICE_ROLE_KEY");

  // Masked URL preview: show protocol and masked subdomain (e.g., https://abc*****.supabase.co)
  let urlPreview: string | undefined;
  if (hasUrl && url) {
    try {
      const parsed = new URL(url);
      const hostParts = parsed.hostname.split(".");
      if (hostParts.length >= 3) {
        const sub = hostParts[0];
        const maskedSub = sub.length > 4 ? `${sub.slice(0, 3)}***` : `${sub}***`;
        urlPreview = `${parsed.protocol}//${maskedSub}.${hostParts.slice(1).join(".")}`;
      } else {
        urlPreview = `${parsed.protocol}//${parsed.hostname}`;
      }
    } catch {
      urlPreview = "invalid-url-format";
    }
  }

  return {
    hasUrl,
    hasAnonKey,
    hasServiceRoleKey,
    urlPreview,
    isConfigured: hasUrl && hasAnonKey,
    missingVariables,
  };
}

/**
 * Performs a safe, non-destructive server-side connection test to Supabase.
 * Does NOT expose API keys or credentials.
 */
export async function verifySupabaseConnection(): Promise<SupabaseConnectionResult> {
  const config = getSupabaseConfigStatus();
  const timestamp = new Date().toISOString();

  // If credentials are not yet populated in .env.local
  if (!config.isConfigured) {
    return {
      config,
      initialized: false,
      connected: false,
      latencyMs: null,
      message:
        "Supabase environment variables are not yet configured. Please add your credentials to .env.local.",
      timestamp,
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();

  const startTime = Date.now();

  try {
    // 1. Verify client initialization
    const client = createSupabaseClient(url, anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    if (!client) {
      return {
        config,
        initialized: false,
        connected: false,
        latencyMs: null,
        message: "Failed to initialize Supabase client instance.",
        timestamp,
      };
    }

    // 2. Perform a lightweight ping to the Supabase Auth/API settings endpoint
    // Testing the settings endpoint responds with HTTP 200 confirming project reachability and key validity
    const pingUrl = new URL("/auth/v1/settings", url).toString();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(pingUrl, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      signal: controller.signal,
    }).catch((err) => {
      clearTimeout(timeoutId);
      throw err;
    });

    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;

    // HTTP 200 confirms successful network handshake and valid API key
    if (response.ok || response.status === 200) {
      return {
        config,
        initialized: true,
        connected: true,
        latencyMs,
        message: `Successfully connected to Supabase backend in ${latencyMs}ms. Handshake verified.`,
        timestamp,
      };
    }

    return {
      config,
      initialized: true,
      connected: false,
      latencyMs,
      message: `Supabase server responded with status HTTP ${response.status} (${response.statusText}).`,
      error: `HTTP_${response.status}`,
      timestamp,
    };
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    const isAbort = error?.name === "AbortError";
    const errorMessage = isAbort
      ? "Connection timed out after 6000ms. Check your network or project status in Supabase Dashboard."
      : error?.message || "Unknown network error during handshake.";

    return {
      config,
      initialized: true,
      connected: false,
      latencyMs,
      message: "Could not establish connection to Supabase backend.",
      error: errorMessage,
      timestamp,
    };
  }
}

