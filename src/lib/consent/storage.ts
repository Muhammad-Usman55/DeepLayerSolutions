import { ConsentRecord, CookiePreferences } from "@/types/consent";

export const CONSENT_STORAGE_KEY = "deeplayer_cookie_consent_v1";
export const CONSENT_COOKIE_KEY = "deeplayer_consent";
export const CURRENT_POLICY_VERSION = "1.0";

/**
 * Generates an anonymized, unique consent ID receipt (e.g. "dls_cst_3f9a...").
 * Contains no PII, user attributes, or hardware fingerprints.
 */
export function generateConsentId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `dls_cst_${crypto.randomUUID().replace(/-/g, "")}`;
  }
  const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `dls_cst_${Date.now().toString(36)}_${rand}`;
}

/**
 * Retrieves the stored consent receipt from localStorage or cookies.
 * Validates against CURRENT_POLICY_VERSION to ensure consent is refreshed if the policy updates.
 */
export function getStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Try localStorage
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if (parsed && parsed.policyVersion === CURRENT_POLICY_VERSION && parsed.necessary === true) {
        return parsed;
      }
    }

    // 2. Fallback to 1st-party Cookie
    const cookieMatch = document.cookie.match(new RegExp(`(^|;)\\s*${CONSENT_COOKIE_KEY}=([^;]+)`));
    if (cookieMatch && cookieMatch[2]) {
      const parsed = JSON.parse(decodeURIComponent(cookieMatch[2])) as ConsentRecord;
      if (parsed && parsed.policyVersion === CURRENT_POLICY_VERSION && parsed.necessary === true) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[COOKIE CONSENT] Failed to read stored consent:", err);
  }

  return null;
}

/**
 * Persists the consent record to both localStorage and a 1-year first-party cookie.
 */
export function setStoredConsent(record: ConsentRecord): void {
  if (typeof window === "undefined") return;

  try {
    const serialized = JSON.stringify(record);

    // Save in localStorage
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);

    // Save in 1st-party cookie (365 days, SameSite=Lax)
    const maxAge = 365 * 24 * 60 * 60;
    const isSecure = window.location.protocol === "https:";
    document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=${maxAge}; SameSite=Lax${
      isSecure ? "; Secure" : ""
    }`;
  } catch (err) {
    console.error("[COOKIE CONSENT] Failed to persist consent:", err);
  }
}

/**
 * Clears Google Analytics cookies (_ga, _gid, _gat, _ga_*) from the current host domain.
 * Called immediately upon consent withdrawal or optional category rejection.
 */
export function clearGoogleAnalyticsCookies(): void {
  if (typeof document === "undefined") return;

  const gaCookieNames = ["_ga", "_gid", "_gat"];
  const cookies = document.cookie.split(";");

  // Hostnames to check for deletion
  const host = window.location.hostname;
  const domainParts = host.split(".");
  const rootDomain =
    domainParts.length > 1
      ? `.${domainParts.slice(-2).join(".")}`
      : host;

  cookies.forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (gaCookieNames.includes(name) || name.startsWith("_ga_") || name.startsWith("_gat_")) {
      // Clear for current path & root domain
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      document.cookie = `${name}=; path=/; domain=${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      document.cookie = `${name}=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    }
  });
}

/**
 * Tells the Google Analytics library (window.gtag) to disable tracking if GA is loaded.
 */
export function disableGoogleAnalytics(measurementId?: string): void {
  if (typeof window === "undefined") return;

  if (measurementId) {
    (window as any)[`ga-disable-${measurementId}`] = true;
  }

  clearGoogleAnalyticsCookies();
}

