"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
            First-Party Analytics & GA4 Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Privacy-conscious visitor metrics, session trends, conversion funnels, and referral channels.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-base font-bold text-[#142A27]">
            First-Party Analytics Engine (Phase 3 Foundation)
          </h3>
          <p className="text-xs text-[#64736F] leading-relaxed">
            Privacy-first event tracking schema and Google Analytics 4 integration are mapped in Phase 3. Real-time overview metrics are live on your Executive Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

