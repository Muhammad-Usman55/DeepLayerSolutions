import "server-only";

import { Resend } from "resend";

let resendInstance: Resend | null = null;

/**
 * Returns a configured Resend client instance.
 * Returns null if RESEND_API_KEY is not set or is an unpopulated placeholder.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey || apiKey.includes("your-resend-api-key")) {
    return null;
  }

  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

/**
 * Returns the configured 'from' sender address.
 * Defaults to Resend's verified onboarding sender if custom domain is not yet configured.
 */
export function getFromEmail(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from && from.length > 0) {
    return from;
  }
  // Standard Resend sandbox/testing sender
  return "DeepLayer Solutions <onboarding@resend.dev>";
}

/**
 * Returns the company inbox email address where client notifications are sent.
 */
export function getCompanyEmail(): string {
  const email = process.env.COMPANY_EMAIL?.trim();
  if (email && email.length > 0) {
    return email;
  }
  return "deeplayersolutions@gmail.com";
}

/**
 * Returns the public site URL.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url && url.length > 0) {
    return url.replace(/\/$/, "");
  }
  return "https://deeplayersolutions.vercel.app";
}

