/**
 * DeepLayer Solutions — Anti-Spam & Submission Hygiene Protection
 *
 * Provides multilayer spam defenses:
 * 1. Disposable / Temporary Email Domain Filter (prevents bounces & spam traps).
 * 2. Spam Keyword & Phishing Heuristic Filter (blocks scam submissions).
 * 3. Excessive Outbound Link Detection (blocks SEO & backlink spam bots).
 * 4. Bot Honeypot & Timing Validation.
 */

// Common disposable and temporary email domains used by automated spam bots
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "10minutemail.net",
  "crazymailing.com",
  "disposablemail.com",
  "dispostable.com",
  "fakeinbox.com",
  "getairmail.com",
  "guerrillamail.biz",
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "inboxkitten.com",
  "mailcatch.com",
  "maildrop.cc",
  "mailinator.com",
  "mailnesia.com",
  "sharklasers.com",
  "spam4.me",
  "temp-mail.org",
  "temp-mail.ru",
  "tempmail.com",
  "tempmail.net",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.net",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
]);

// Spam and malicious trigger keywords commonly injected by lead-generation bots
const SPAM_KEYWORDS = [
  /\bviagra\b/i,
  /\bcialis\b/i,
  /\bcasino\b/i,
  /\broulette\b/i,
  /\bcrypto\s+investment\b/i,
  /\bforex\s+trading\b/i,
  /\bpassive\s+income\s+\$\b/i,
  /\bearn\s+\$\d+/i,
  /\b100%\s+free\s+money\b/i,
  /\bcongratulations\s+you\s+(?:won|have\s+been\s+selected)\b/i,
  /\bseo\s+ranking\s+guarantee\b/i,
  /\bbuy\s+(?:followers|likes|views)\b/i,
  /\bwhatsapp\s+(?:blast|marketing\s+service)\b/i,
  /\bbulk\s+email\s+sender\b/i,
  /\bdating\s+(?:site|service|hookup)\b/i,
  /\bloan\s+approval\s+guaranteed\b/i,
  /\btelegram\s+channel\s+subscriber\b/i,
];

/**
 * Checks if the given email belongs to a known temporary/disposable domain.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@").pop()?.trim().toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

/**
 * Evaluates text fields (subject, message, cover note) for spam signals.
 */
export function checkSpamContent(text: string): { isSpam: boolean; reason?: string } {
  if (!text || typeof text !== "string") {
    return { isSpam: false };
  }

  // 1. Check for spam keywords
  for (const regex of SPAM_KEYWORDS) {
    if (regex.test(text)) {
      return {
        isSpam: true,
        reason: "Message contains prohibited promotional or unsolicited keywords.",
      };
    }
  }

  // 2. Count URLs: standard inquiry messages rarely need more than 2 external links
  const urlMatches = text.match(/https?:\/\/[^\s]+/gi);
  if (urlMatches && urlMatches.length > 2) {
    return {
      isSpam: true,
      reason: "Message contains too many outbound links (maximum 2 permitted).",
    };
  }

  // 3. Check for suspicious embedded script or HTML payloads
  if (/<(?:script|iframe|object|embed|applet)\b/i.test(text)) {
    return {
      isSpam: true,
      reason: "Malicious payload or HTML code detected.",
    };
  }

  return { isSpam: false };
}
