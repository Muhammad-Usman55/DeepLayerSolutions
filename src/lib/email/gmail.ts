import "server-only";

import { google, gmail_v1 } from "googleapis";
import { siteConfig } from "@/config/site";

let gmailInstance: gmail_v1.Gmail | null = null;

export interface SendGmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  listUnsubscribe?: string;
}

/**
 * Returns a configured Google Gmail API client.
 * Returns null if required OAuth2 credentials are missing or placeholders.
 */
export function getGmailClient(): gmail_v1.Gmail | null {
  const clientId =
    process.env.GOOGLE_CLIENT_ID?.trim() ||
    "197585439582-jh6f9bk079b3i5nb5pduag1ggc1ok949.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

  // If clientSecret or refreshToken is not configured, return null gracefully
  if (
    !clientSecret ||
    !refreshToken ||
    clientSecret.includes("your-google-client-secret") ||
    refreshToken.includes("your-google-refresh-token")
  ) {
    return null;
  }

  if (!gmailInstance) {
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI?.trim() ||
      "https://developers.google.com/oauthplayground";

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    gmailInstance = google.gmail({ version: "v1", auth: oauth2Client });
  }

  return gmailInstance;
}

/**
 * Returns the configured 'from' sender address with name.
 */
export function getFromEmail(): string {
  const customFrom = process.env.GMAIL_SENDER_EMAIL?.trim();
  if (customFrom && customFrom.length > 0) {
    return customFrom;
  }
  const userEmail =
    process.env.GMAIL_USER_EMAIL?.trim() || "deeplayersolutions@gmail.com";
  return `DeepLayer Solutions <${userEmail}>`;
}

/**
 * Returns the company inbox email address where internal notifications are sent.
 */
export function getCompanyEmail(): string {
  const email = process.env.COMPANY_EMAIL?.trim();
  if (email && email.length > 0) {
    return email;
  }
  return "deeplayersolutions@gmail.com";
}

/**
 * Returns the verified public site URL, avoiding vercel.app staging URLs in emails.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && envUrl.length > 0 && !envUrl.includes("vercel.app")) {
    return envUrl.replace(/\/$/, "");
  }
  return siteConfig.url || "https://www.deeplayersolutions.com";
}

/**
 * Wraps a base64 encoded string to 76 characters per line as strictly required by RFC 2045.
 * Prevents MIME line-length violations (RFC 5322 998-character limit) that trigger spam filters.
 */
function wrapBase64(b64: string): string {
  return b64.match(/.{1,76}/g)?.join("\r\n") || b64;
}

/**
 * Cleanly formats the subject line. Standardizes dashes and smart quotes to ASCII.
 * Uses plain ASCII headers when possible to avoid base64 subject spam heuristics.
 */
function formatSubject(subject: string): string {
  const normalized = subject
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\[\s*([^\]]+)\s*\]/g, "#$1")
    .replace(/[!]+/g, ""); // Eliminate spammy exclamation marks from subject lines

  const isAscii = /^[\x20-\x7E]+$/.test(normalized);
  if (isAscii) {
    return normalized.trim();
  }
  return `=?UTF-8?B?${Buffer.from(normalized.trim(), "utf-8").toString("base64")}?=`;
}

/**
 * Builds an RFC 2822 MIME formatted message and returns a base64url encoded string
 * suitable for the Gmail API `users.messages.send` raw parameter.
 *
 * Anti-spam optimizations:
 * - RFC 2045 76-character line wrapping on all base64 MIME parts (fixes SpamAssassin MIME_BASE64_BLOB)
 * - Omits custom Message-ID so Google automatically generates an authentic, DKIM-aligned Message-ID
 * - Omits Auto-Submitted / robotic headers that cause inbox filters to route messages to Spam
 * - Clean ASCII subject lines without aggressive punctuation
 */
export function createRawEmail(params: {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  listUnsubscribe?: string;
}): string {
  const boundary = `dl_bnd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const toHeader = Array.isArray(params.to) ? params.to.join(", ") : params.to;
  const cleanSubject = formatSubject(params.subject);
  const dateHeader = new Date().toUTCString();

  const headers = [
    `From: ${params.from}`,
    `To: ${toHeader}`,
    params.replyTo ? `Reply-To: ${params.replyTo}` : null,
    `Subject: ${cleanSubject}`,
    `Date: ${dateHeader}`,
    `MIME-Version: 1.0`,
    params.listUnsubscribe ? `List-Unsubscribe: <${params.listUnsubscribe}>` : null,
    params.listUnsubscribe ? `List-Unsubscribe-Post: List-Unsubscribe=One-Click` : null,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ]
    .filter(Boolean)
    .join("\r\n");

  const plainPart = params.text
    ? [
        `--${boundary}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        wrapBase64(Buffer.from(params.text, "utf-8").toString("base64")),
      ].join("\r\n")
    : "";

  const htmlPart = [
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    wrapBase64(Buffer.from(params.html, "utf-8").toString("base64")),
  ].join("\r\n");

  const fullEmail = [headers, "", plainPart, htmlPart, `--${boundary}--`]
    .filter(Boolean)
    .join("\r\n");

  return Buffer.from(fullEmail, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Dispatches an email using the Gmail REST API (users.messages.send).
 */
export async function sendGmailMessage(
  options: SendGmailOptions
): Promise<{ id: string }> {
  const gmail = getGmailClient();
  if (!gmail) {
    throw new Error(
      "Gmail API is not configured. Please set GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN in your environment."
    );
  }

  const fromEmail = getFromEmail();
  const raw = createRawEmail({
    to: options.to,
    from: fromEmail,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    listUnsubscribe: options.listUnsubscribe,
  });

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  if (!response.data.id) {
    throw new Error("Gmail API responded without a message ID.");
  }

  return { id: response.data.id };
}

