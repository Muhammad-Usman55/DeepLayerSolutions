"use client";

import React from "react";
import { CookieConsentBanner } from "./CookieConsentBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export function CookieConsent() {
  return (
    <>
      <CookieConsentBanner />
      <CookiePreferencesModal />
    </>
  );
}
