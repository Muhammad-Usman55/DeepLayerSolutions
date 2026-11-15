"use client";

import { useEffect } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "./ConsentContext";

/**
 * Privacy-Conscious Google Analytics 4 Component
 * Powered by @next/third-parties/google
 *
 * PRIVACY & COMPLIANCE CONTROLS:
 * 1. Script is NEVER loaded before the visitor explicitly accepts Analytics cookies.
 * 2. Opt-out flag `window['ga-disable-${measurementId}']` is toggled reactively.
 * 3. Uses official Next.js @next/third-parties/google integration.
 * 4. Automatic GA4 Enhanced Measurement captures page views (including SPA history transitions),
 *    scrolls, outbound clicks, and downloads without duplicate event dispatches.
 */
export function GoogleAnalytics() {
  const { consent } = useConsent();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-VD708J25D8";

  const hasAnalyticsConsent = Boolean(consent?.analytics);

  useEffect(() => {
    if (!measurementId) return;

    const win = window as unknown as Record<string, boolean>;
    if (!hasAnalyticsConsent) {
      // Set global opt-out flag for Google Analytics
      win[`ga-disable-${measurementId}`] = true;
    } else {
      win[`ga-disable-${measurementId}`] = false;
    }
  }, [hasAnalyticsConsent, measurementId]);

  // Gating rule: If no ID or no consent, render nothing (no network requests to Google)
  if (!measurementId || !hasAnalyticsConsent) {
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}
