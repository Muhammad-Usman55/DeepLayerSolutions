import "server-only";

import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface RateLimitOptions {
  /** Identifier for the route or action (e.g. "contact", "newsletter", "admin_login") */
  endpoint: string;
  /** Maximum number of allowed requests within the window */
  maxRequests: number;
  /** Window duration in seconds (e.g. 900 for 15 minutes) */
  windowSeconds: number;
  /** Client IP address or identifier */
  ip?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  hashedIdentifier: string;
}

// In-memory fallback map to guarantee 100% availability if database connection
// or schema migration is temporarily pending.
const fallbackStore = new Map<string, { count: number; resetAtMs: number }>();

/**
 * Extracts the real client IP address from request headers.
 * Supports reverse proxy, load balancer, and edge CDN headers.
 */
export function getClientIp(req: Request | NextRequest): string {
  const headers = req.headers;

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }

  return "unknown-ip";
}

/**
 * Anonymizes the client identifier with a SHA-256 salt to adhere to GDPR
 * and privacy standards. Zero raw IP addresses are persisted.
 */
export function hashClientIdentifier(identifier: string, endpoint: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY || "deeplayer-security-salt";
  const digest = createHash("sha256")
    .update(`${endpoint}:${identifier}:${salt}`)
    .digest("hex")
    .slice(0, 32);

  return `rl:${endpoint}:${digest}`;
}

/**
 * Serverless-compatible, distributed rate limiting backed by PostgreSQL
 * with transparent in-memory fallback.
 */
export async function checkRateLimit(
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const { endpoint, maxRequests, windowSeconds, ip = "unknown-ip" } = options;
  const storageKey = hashClientIdentifier(ip, endpoint);
  const nowMs = Date.now();
  const windowMs = windowSeconds * 1000;

  try {
    const supabase = createAdminClient();

    // Query rate limit record
    const { data: record, error: queryError } = await supabase
      .from("rate_limits")
      .select("key, count, reset_at")
      .eq("key", storageKey)
      .maybeSingle();

    if (queryError) {
      throw queryError;
    }

    if (record) {
      const resetAtMs = new Date(record.reset_at).getTime();

      // Active window
      if (nowMs < resetAtMs) {
        if (record.count >= maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            resetAt: new Date(resetAtMs),
            hashedIdentifier: storageKey,
          };
        }

        const newCount = record.count + 1;
        await supabase
          .from("rate_limits")
          .update({ count: newCount })
          .eq("key", storageKey);

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - newCount),
          resetAt: new Date(resetAtMs),
          hashedIdentifier: storageKey,
        };
      }
    }

    // Window expired or new key — initialize fresh window
    const newResetDate = new Date(nowMs + windowMs);

    await supabase.from("rate_limits").upsert({
      key: storageKey,
      count: 1,
      reset_at: newResetDate.toISOString(),
      created_at: new Date(nowMs).toISOString(),
    });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: newResetDate,
      hashedIdentifier: storageKey,
    };
  } catch (dbError: any) {
    // Graceful fallback to resilient in-memory sliding window
    console.warn(
      `[RateLimit] Database rate limit fallback invoked for key "${storageKey}":`,
      dbError?.message || dbError
    );

    const memoryRecord = fallbackStore.get(storageKey);

    if (memoryRecord && nowMs < memoryRecord.resetAtMs) {
      if (memoryRecord.count >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetAt: new Date(memoryRecord.resetAtMs),
          hashedIdentifier: storageKey,
        };
      }

      memoryRecord.count += 1;
      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - memoryRecord.count),
        resetAt: new Date(memoryRecord.resetAtMs),
        hashedIdentifier: storageKey,
      };
    }

    const resetAtMs = nowMs + windowMs;
    fallbackStore.set(storageKey, { count: 1, resetAtMs });

    // Clean up expired items periodically
    if (fallbackStore.size > 1000) {
      for (const [k, v] of fallbackStore.entries()) {
        if (nowMs >= v.resetAtMs) {
          fallbackStore.delete(k);
        }
      }
    }

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: new Date(resetAtMs),
      hashedIdentifier: storageKey,
    };
  }
}

