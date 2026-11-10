"use client";

import React from "react";
import { Globe, Edit3, Layout, Layers } from "lucide-react";

export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
            Website Content Management (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Manage homepage copy, service catalogs, company vision, and global footer text.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto">
          <Globe className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-base font-bold text-[#142A27]">
            Structured Content Editor (Phase 3 Ready)
          </h3>
          <p className="text-xs text-[#64736F] leading-relaxed">
            Manage Home, Services, About, Careers, and Contact page text fields without code modifications. Fully operational in Phase 3.
          </p>
        </div>
      </div>
    </div>
  );
}
