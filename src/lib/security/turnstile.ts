import "server-only";

export interface TurnstileVerificationResult {
  success: boolean;
  errorCodes?: string[];
  hostname?: string;
  challengeTs?: string;
}

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Never trust client-side verification alone.
 *
 * Official Cloudflare verification docs:
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not configured (e.g. during initial setup without credentials),
  // fail gracefully with a log warning so developers aren't hard-blocked in environments
  // where Turnstile has not yet been provisioned.
  if (!secretKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Turnstile] TURNSTILE_SECRET_KEY is not configured. Bypassing verification in non-production."
      );
      return { success: true };
    }

    console.error("[Turnstile] TURNSTILE_SECRET_KEY is missing in production environment.");
    return {
      success: false,
      errorCodes: ["missing-secret-key"],
    };
  }

  // Token is mandatory if Turnstile secret is configured
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return {
      success: false,
      errorCodes: ["missing-input-response"],
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token.trim());
    if (remoteIp && remoteIp !== "unknown-ip") {
      formData.append("remoteip", remoteIp);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[Turnstile] Cloudflare endpoint returned HTTP ${res.status}`);
      return {
        success: false,
        errorCodes: [`http-${res.status}`],
      };
    }

    const outcome = await res.json();

    return {
      success: Boolean(outcome.success),
      errorCodes: outcome["error-codes"],
      hostname: outcome.hostname,
      challengeTs: outcome.challenge_ts,
    };
  } catch (error: any) {
    console.error("[Turnstile] Server verification failed:", error?.message || error);

    // If abort / network failure occurs in dev, provide safe fallback
    if (process.env.NODE_ENV !== "production") {
      return { success: true };
    }

    return {
      success: false,
      errorCodes: [error?.name === "AbortError" ? "timeout" : "network-error"],
    };
  }
}

