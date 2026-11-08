"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ConsentRecord, ConsentContextValue } from "@/types/consent";
import {
  getStoredConsent,
  setStoredConsent,
  generateConsentId,
  CURRENT_POLICY_VERSION,
  disableGoogleAnalytics,
} from "@/lib/consent/storage";

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return ctx;
}

/**
 * Global helper to trigger the cookie preferences modal from any button/link.
 */
export function openCookiePreferences(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dls:open-cookie-settings"));
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [hasDecided, setHasDecided] = useState<boolean>(true); // default true to avoid flash before hydration
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  // Initialize from storage on mount
  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      setConsent(existing);
      setHasDecided(true);
      setIsBannerOpen(false);

      if (!existing.analytics) {
        disableGoogleAnalytics(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      }
    } else {
      // First-time visitor or updated policy version
      setConsent(null);
      setHasDecided(false);
      // Small timeout to allow smooth UI transition after initial render
      const timer = setTimeout(() => {
        setIsBannerOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for external trigger to open settings (e.g. from footer link or privacy page)
  useEffect(() => {
    const handleOpen = () => {
      setIsPreferencesOpen(true);
      setIsBannerOpen(false);
    };

    window.addEventListener("dls:open-cookie-settings", handleOpen);
    return () => window.removeEventListener("dls:open-cookie-settings", handleOpen);
  }, []);

  // Helper to commit consent record locally and to Supabase
  const commitConsent = useCallback(
    async (prefs: { analytics: boolean; marketing: boolean }) => {
      const activeId = consent?.consentId || generateConsentId();
      const record: ConsentRecord = {
        consentId: activeId,
        necessary: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        policyVersion: CURRENT_POLICY_VERSION,
        timestamp: new Date().toISOString(),
      };

      // 1. Update local state
      setConsent(record);
      setHasDecided(true);
      setIsBannerOpen(false);
      setIsPreferencesOpen(false);

      // 2. Persist locally (localStorage + 1st-party cookie)
      setStoredConsent(record);

      // 3. If analytics was rejected or withdrawn, deactivate GA and clear cookies immediately
      if (!prefs.analytics) {
        disableGoogleAnalytics(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      }

      // 4. Record consent receipt in Supabase asynchronously
      try {
        await fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
      } catch (err) {
        console.warn("[COOKIE CONSENT] Failed to record receipt in Supabase:", err);
      }
    },
    [consent]
  );

  const acceptAll = useCallback(async () => {
    await commitConsent({ analytics: true, marketing: true });
  }, [commitConsent]);

  const rejectOptional = useCallback(async () => {
    await commitConsent({ analytics: false, marketing: false });
  }, [commitConsent]);

  const savePreferences = useCallback(
    async (prefs: { analytics: boolean; marketing: boolean }) => {
      await commitConsent(prefs);
    },
    [commitConsent]
  );

  const openBanner = useCallback(() => setIsBannerOpen(true), []);
  const closeBanner = useCallback(() => setIsBannerOpen(false), []);
  const openPreferences = useCallback(() => {
    setIsBannerOpen(false);
    setIsPreferencesOpen(true);
  }, []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  const value: ConsentContextValue = {
    consent,
    hasDecided,
    isBannerOpen,
    isPreferencesOpen,
    acceptAll,
    rejectOptional,
    savePreferences,
    openBanner,
    openPreferences,
    closeBanner,
    closePreferences,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

