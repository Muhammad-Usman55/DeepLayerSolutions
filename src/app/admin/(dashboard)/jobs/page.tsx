"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";

export default function AdminJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
            Job Vacancy Management
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Create, edit, publish, and track vacancies live on the DeepLayer Careers portal.
          </p>
        </div>

        <Link
          href="/admin/jobs/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto">
          <Briefcase className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-base font-bold text-[#142A27]">
            Job Management System (Phase 2 Ready)
          </h3>
          <p className="text-xs text-[#64736F] leading-relaxed">
            The database schema foundation for job listings, departments, workplace types, and vacancy tracking is active. Full editing and ATS workflows unlock in Phase 2.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27] text-xs font-semibold hover:bg-neutral-100 transition-colors"
          >
            <span>Preview Public Careers Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

