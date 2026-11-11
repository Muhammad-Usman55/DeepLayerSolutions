"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CookieConsentBanner } from "./CookieConsentBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export function CookieConsent() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <CookieConsentBanner />
      <CookiePreferencesModal />
    </>
  );
}

