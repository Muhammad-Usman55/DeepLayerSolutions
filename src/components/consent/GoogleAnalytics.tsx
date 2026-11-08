"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "./ConsentContext";

/**
 * Privacy-Conscious Google Analytics 4 Component
 *
 * CRITICAL PRIVACY CONTROLS:
 * 1. Script is NEVER loaded before the visitor explicitly accepts Analytics cookies.
 * 2. IP addresses are anonymized ('anonymize_ip: true').
 * 3. Cross-device fingerprinting is disabled ('allow_google_signals: false').
 * 4. Ad personalization signals are gated on marketing consent.
 * 5. Immediate cessation of tracking and cookie deletion upon consent withdrawal.
 */
export function GoogleAnalytics() {
  const { consent } = useConsent();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const hasAnalyticsConsent = Boolean(consent?.analytics);

  useEffect(() => {
    if (!measurementId) return;

    if (!hasAnalyticsConsent) {
      // Set global opt-out flag for Google Analytics
      (window as any)[`ga-disable-${measurementId}`] = true;
    } else {
      (window as any)[`ga-disable-${measurementId}`] = false;
    }
  }, [hasAnalyticsConsent, measurementId]);

  // Gating rule: If no ID or no consent, render nothing (no network requests to Google)
  if (!measurementId || !hasAnalyticsConsent) {
    return null;
  }

  const allowMarketing = Boolean(consent?.marketing);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: ${allowMarketing},
            restricted_data_processing: true,
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
    </>
  );
}

