import "server-only";

import { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set([
  "deeplayersolutions.vercel.app",
  "localhost:3000",
  "127.0.0.1:3000",
]);

/**
 * Validates Origin and Referer headers against authorized hostnames
 * to protect state-mutating API routes against Cross-Site Request Forgery (CSRF).
 */
export function validateRequestOrigin(req: NextRequest): boolean {
  // If NEXT_PUBLIC_SITE_URL is defined, add its host to allowed hosts
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const url = new URL(siteUrl);
      ALLOWED_HOSTS.add(url.host);
    } catch {
      // ignore invalid URL format
    }
  }

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // If Origin header is present, it MUST match an allowed host
  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (ALLOWED_HOSTS.has(originUrl.host)) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // If Referer header is present, it MUST match an allowed host
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (ALLOWED_HOSTS.has(refererUrl.host)) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // If neither Origin nor Referer is provided (e.g. server-to-server or dev curl)
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  // In production, reject mutations that omit both origin and referer
  return false;
}
