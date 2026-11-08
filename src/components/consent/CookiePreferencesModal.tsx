"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock, Check } from "lucide-react";
import { useConsent } from "./ConsentContext";

export function CookiePreferencesModal() {
  const {
    consent,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectOptional,
  } = useConsent();

  // Local state initialized to current preferences
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [marketing, setMarketing] = useState<boolean>(false);

  useEffect(() => {
    if (isPreferencesOpen) {
      setAnalytics(Boolean(consent?.analytics));
      setMarketing(Boolean(consent?.marketing));
    }
  }, [isPreferencesOpen, consent]);

  const handleSave = async () => {
    await savePreferences({ analytics, marketing });
  };

  return (
    <AnimatePresence>
      {isPreferencesOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreferences}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white border border-[#DFEDE5] shadow-[0_24px_64px_rgba(0,143,83,0.16)] rounded-3xl overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#DFEDE5] bg-[#FAFCF9]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="cookie-preferences-title" className="text-lg font-bold text-[#142A27]">
                    Cookie Preferences
                  </h2>
                  <p className="text-xs text-[#64736F]">
                    DeepLayer Solutions Privacy Center • Policy v1.0
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closePreferences}
                className="w-8 h-8 rounded-full hover:bg-neutral-200/60 text-[#64736F] hover:text-[#142A27] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Categories List */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <p className="text-xs sm:text-sm text-[#4B5E59] leading-relaxed">
                We respect your personal privacy rights under GDPR, CCPA, and global privacy standards. Configure your preferences below. You can return and update your choices at any time via the Cookie Settings link in the footer.
              </p>

              {/* Category 1: Strictly Necessary */}
              <div className="bg-[#F8FBFA] border border-[#DFEDE5] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#142A27]">1. Strictly Necessary Cookies</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#008F53] bg-[#E9FFF2] border border-[#BCE8CF] px-2 py-0.5 rounded-full">
                      <Lock className="w-2.5 h-2.5" />
                      Always Active
                    </span>
                  </div>

                  {/* Locked Switch */}
                  <div className="relative inline-flex items-center h-6 w-11 rounded-full bg-[#008F53] opacity-60 cursor-not-allowed">
                    <span className="inline-block w-4 h-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64736F] leading-relaxed">
                  These cookies are essential for core security, session validation, authentication headers, and network reliability. Because the website cannot function properly without them, they cannot be turned off.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 hover:border-[#008F53]/40 transition-colors">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <span className="font-bold text-[#142A27]">2. Analytics & Performance</span>
                    <span className="ml-2 text-xs text-[#64736F] font-normal">(Google Analytics 4)</span>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics(!analytics)}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#008F53]/30 ${
                      analytics ? "bg-[#008F53]" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform shadow-xs ${
                        analytics ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64736F] leading-relaxed">
                  Allows us to count visits and traffic sources to measure and improve our site performance. All IP addresses are automatically anonymized, and cross-device fingerprinting is strictly disabled. No personally identifiable information (PII) is collected.
                </p>
              </div>

              {/* Category 3: Marketing & Personalization */}
              <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 hover:border-[#008F53]/40 transition-colors">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <span className="font-bold text-[#142A27]">3. Marketing & Personalization</span>
                    <span className="ml-2 text-xs text-[#64736F] font-normal">(Campaign Insights)</span>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing(!marketing)}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#008F53]/30 ${
                      marketing ? "bg-[#008F53]" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform shadow-xs ${
                        marketing ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64736F] leading-relaxed">
                  Used to evaluate promotional campaigns and deliver relevant engineering briefings. We do not participate in third-party ad networks or sell behavioral profiles.
                </p>
              </div>

              <div className="text-xs text-[#64736F] pt-1">
                For detailed information on how data is handled, please consult our{" "}
                <Link href="/privacy" className="text-[#008F53] underline font-medium hover:text-[#007443]">
                  Privacy Policy
                </Link>
                .
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-[#DFEDE5] bg-[#FAFCF9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={rejectOptional}
                className="order-3 sm:order-1 px-4 py-2.5 rounded-full text-xs font-semibold text-[#142A27] bg-white hover:bg-neutral-100 border border-[#DFEDE5] transition-colors cursor-pointer"
              >
                Reject All Optional
              </button>

              <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#142A27] bg-white hover:bg-neutral-50 border border-[#DFEDE5] transition-colors cursor-pointer"
                >
                  Accept All
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#008F53] hover:bg-[#007443] transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

