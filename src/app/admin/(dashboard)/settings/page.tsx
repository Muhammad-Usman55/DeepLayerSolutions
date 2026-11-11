"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
            System & Business Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Global company parameters, Gmail API status, notification routing, and security.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto">
          <Settings className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-base font-bold text-[#142A27]">
            System Configuration Center
          </h3>
          <p className="text-xs text-[#64736F] leading-relaxed">
            Manage company profile, Gmail API preferences, notification thresholds, and security credentials. Scheduled for Phase 4.
          </p>
        </div>
      </div>
    </div>
  );
}

