"use client";

import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Code2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe,
  Clock,
  Sparkles,
  CheckCircle2,
  Gift,
  Award,
} from "lucide-react";
import { JobOpeningItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  TrendingUp,
  Target,
  Code2,
};

interface JobCardProps {
  job: JobOpeningItem;
  onApply: (jobTitle: string) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[job.iconName] || Brain;

  return (
    <div
      className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "bg-white border-[#00B86B] shadow-[0_12px_32px_-8px_rgba(0,184,107,0.14)] ring-1 ring-[#00B86B]/30"
          : "bg-white border-[#DFEDE5] hover:border-[#00B86B]/60 shadow-[0_4px_20px_-4px_rgba(0,143,83,0.06)] hover:shadow-md"
      }`}
    >
      {/* Main Card Header / Summary */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          {/* Department & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF]">
              {job.department}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFCF9] text-[#142A27] border border-[#DFEDE5]">
              <Globe className="w-3 h-3 text-[#00B86B]" />
              <span>{job.location}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFCF9] text-[#142A27] border border-[#DFEDE5]">
              <Clock className="w-3 h-3 text-[#008F53]" />
              <span>{job.duration}</span>
            </span>
          </div>

          {/* Stipend Badge */}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#008F53] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
            <Sparkles className="w-3 h-3 text-[#00B86B]" />
            <span>{job.stipend}</span>
          </span>
        </div>

        {/* Title & Icon Row */}
        <div className="flex items-start gap-4 mt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9FFF2] via-white to-[#D5F9E6] border border-[#00B86B]/40 flex items-center justify-center text-[#008F53] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6 text-[#008F53]" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors tracking-tight">
              {job.title}
            </h3>
            <p className="mt-2 text-sm text-[#64736F] leading-relaxed">
              {job.shortDescription}
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-6 pt-5 border-t border-[#DFEDE5] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#008F53] hover:text-[#075B3E] cursor-pointer transition-colors"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Hide Details & Requirements" : "View Full Job Description & Requirements"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => onApply(job.title)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
          >
            <span>Apply For This Role</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Details Section */}
      {isExpanded && (
        <div className="px-6 pb-8 sm:px-8 border-t border-[#DFEDE5] bg-[#FAFCF9]/80 space-y-6 pt-6 animate-fadeIn">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-2">
              Role Overview
            </h4>
            <p className="text-sm text-[#142A27] leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-3">
              Key Responsibilities
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#64736F] leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-[#00B86B] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Qualifications */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-3">
              Candidate Requirements
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#142A27] font-medium leading-snug">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008F53] shrink-0 mt-2" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preferred Qualifications (if any) */}
          {job.preferredQualifications && job.preferredQualifications.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-[#64736F] tracking-wider mb-2">
                Bonus / Preferred
              </h4>
              <ul className="space-y-1.5">
                {job.preferredQualifications.map((pref, i) => (
                  <li key={i} className="text-xs text-[#64736F] flex items-center gap-2">
                    <span className="text-[#00B86B] font-bold">+</span>
                    <span>{pref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What We Offer / Perks */}
          <div className="p-4 rounded-2xl bg-white border border-[#DFEDE5]">
            <h4 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-2.5 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#00B86B]" />
              <span>What You Receive</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {job.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#142A27] font-semibold">
                  <Award className="w-3.5 h-3.5 text-[#008F53] shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Apply CTA inside drawer */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => onApply(job.title)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-all shadow-sm cursor-pointer"
            >
              <span>Submit Application for {job.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

