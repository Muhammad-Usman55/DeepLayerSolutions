"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, Settings2, Check, X } from "lucide-react";
import { useConsent } from "./ConsentContext";

export function CookieConsentBanner() {
  const { isBannerOpen, acceptAll, rejectOptional, openPreferences } = useConsent();

  return (
    <AnimatePresence>
      {isBannerOpen && (
        <motion.div
          role="region"
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 lg:left-auto lg:right-6 lg:max-w-xl z-[9990] select-none"
        >
          <div className="bg-white/95 backdrop-blur-md border border-[#DFEDE5] shadow-[0_16px_48px_rgba(0,143,83,0.12)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-[#142A27]">
            {/* Top Row: Icon + Title */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center shrink-0 shadow-2xs">
                <Cookie className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#142A27] tracking-tight">
                    We Value Your Privacy
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#008F53] bg-[#E9FFF2] px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    GDPR / CCPA
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed mt-1">
                  We use strictly necessary cookies for site security and navigation. With your consent, we also use privacy-first analytics to understand usage patterns and enhance our software solutions. We never sell your data or profile individual identities. Read our{" "}
                  <Link href="/privacy" className="text-[#008F53] font-medium underline underline-offset-2 hover:text-[#007443]">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="mt-4 pt-3.5 border-t border-[#DFEDE5]/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={openPreferences}
                className="order-3 sm:order-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              <button
                type="button"
                onClick={rejectOptional}
                className="order-2 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#142A27] bg-white hover:bg-neutral-50 border border-[#DFEDE5] hover:border-neutral-300 transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                <X className="w-3.5 h-3.5 text-[#64736F]" />
                <span>Reject Optional</span>
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="order-1 sm:order-3 inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#008F53] hover:bg-[#007443] transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
