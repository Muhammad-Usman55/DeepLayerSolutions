"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "./ConsentContext";

/**
 * Privacy-Conscious Google Tag Component (GTM Container & GA4)
 * Google Tag Container ID: GTM-526SK93S
 * GA4 Measurement ID: G-VD708J25D8
 *
 * PRIVACY & COMPLIANCE CONTROLS:
 * 1. Script is NEVER loaded before the visitor explicitly accepts Analytics cookies.
 * 2. Opt-out flags `window['ga-disable-${id}']` are toggled reactively.
 * 3. Injects the Google tag container (gtm.js) with dataLayer and gtag initialization.
 * 4. Automatic GA4 Enhanced Measurement captures page views, scrolls, and interactions.
 * 5. Immediate cessation of tracking and cookie deletion upon consent withdrawal.
 */
export function GoogleAnalytics() {
  const { consent } = useConsent();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-VD708J25D8";
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-526SK93S";

  const hasAnalyticsConsent = Boolean(consent?.analytics);

  useEffect(() => {
    const win = window as unknown as Record<string, boolean>;
    if (!hasAnalyticsConsent) {
      // Set global opt-out flag for Google Analytics & Google Tag Manager
      if (measurementId) win[`ga-disable-${measurementId}`] = true;
      if (gtmId) win[`ga-disable-${gtmId}`] = true;
    } else {
      if (measurementId) win[`ga-disable-${measurementId}`] = false;
      if (gtmId) win[`ga-disable-${gtmId}`] = false;
    }
  }, [hasAnalyticsConsent, measurementId, gtmId]);

  // Gating rule: If no ID or no consent, render nothing (no network requests to Google)
  if (!hasAnalyticsConsent || (!measurementId && !gtmId)) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
}
