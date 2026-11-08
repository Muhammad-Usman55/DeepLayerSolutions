import "server-only";

import crypto from "crypto";

/**
 * Generates an unpredictable, cryptographically secure confirmation token,
 * its SHA-256 hash for database storage, and a 48-hour expiration timestamp.
 */
export function generateConfirmationToken(): {
  rawToken: string;
  tokenHash: string;
  expiresAt: string;
} {
  // 32 random bytes -> 64 character hex string (256-bit entropy)
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  // 48 hours expiration
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  return {
    rawToken,
    tokenHash,
    expiresAt,
  };
}

/**
 * Computes a deterministic SHA-256 hash of a raw token.
 * Only this hash is stored in the database, protecting tokens from leak vulnerabilities.
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Gets a secret key for HMAC signatures.
 */
function getSigningSecret(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.RESEND_API_KEY ||
    "deeplayer-solutions-newsletter-secret"
  );
}

/**
 * Generates a tamper-proof HMAC unsubscribe token for an email address.
 */
export function generateUnsubscribeToken(email: string): string {
  const secret = getSigningSecret();
  return crypto
    .createHmac("sha256", secret)
    .update(email.toLowerCase().trim())
    .digest("hex");
}

/**
 * Verifies that an unsubscribe token matches the email address.
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = generateUnsubscribeToken(email);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}
