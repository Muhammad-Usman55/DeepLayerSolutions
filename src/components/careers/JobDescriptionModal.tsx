"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  Clock,
  Sparkles,
  CheckCircle2,
  Gift,
  Award,
  ArrowRight,
  Briefcase,
  Brain,
  Code2,
  TrendingUp,
  Target,
} from "lucide-react";
import type { JobOpeningItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  TrendingUp,
  Target,
  Code2,
};

const defaultPerks = [
  "100% Remote Flexibility",
  "Senior AI & Software Lead Mentorship",
  "Competitive Paid Stipend + Fast-Track Offer",
  "Direct Production Architecture Shipments",
];

interface JobDescriptionModalProps {
  job: JobOpeningItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobTitle: string) => void;
}

export function JobDescriptionModal({
  job,
  isOpen,
  onClose,
  onApply,
}: JobDescriptionModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const IconComponent = (job.iconName && iconMap[job.iconName]) || Briefcase;

  const responsibilities =
    Array.isArray(job.responsibilities) && job.responsibilities.length > 0
      ? job.responsibilities
      : typeof job.responsibilities === "string"
      ? [job.responsibilities]
      : [
          "Collaborate with engineering leads and AI researchers on production systems.",
          "Design, implement, and test modular, high-performance features.",
          "Participate in technical reviews, sprint planning, and architecture refinement.",
        ];

  const requirements =
    Array.isArray(job.requirements) && job.requirements.length > 0
      ? job.requirements
      : typeof job.requirements === "string"
      ? [job.requirements]
      : [
          "Demonstrated problem-solving ability, technical initiative, and solid fundamentals.",
          "Proactive written and verbal communication in a collaborative team setting.",
        ];

  const perks =
    Array.isArray(job.perks) && job.perks.length > 0 ? job.perks : defaultPerks;

  const preferredQualifications =
    Array.isArray(job.preferredQualifications) && job.preferredQualifications.length > 0
      ? job.preferredQualifications
      : typeof job.preferredQualifications === "string"
      ? [job.preferredQualifications]
      : [];

  const handleApplyClick = () => {
    onClose();
    setTimeout(() => {
      onApply(job.title);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-description-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 18 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white border border-[#DFEDE5] shadow-[0_24px_70px_rgba(0,143,83,0.20)] rounded-3xl overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-[#DFEDE5] bg-gradient-to-b from-[#FAFCF9] to-white relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9FFF2] via-white to-[#D5F9E6] border border-[#00B86B]/40 flex items-center justify-center text-[#008F53] shrink-0 shadow-2xs">
                    <IconComponent className="w-6 h-6 text-[#008F53]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF]">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#008F53] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Sparkles className="w-3 h-3 text-[#00B86B]" />
                        <span>{job.stipend || "Competitive Stipend + Offer"}</span>
                      </span>
                    </div>
                    <h2
                      id="job-description-modal-title"
                      className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight leading-snug"
                    >
                      {job.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] hover:bg-neutral-100 text-[#64736F] hover:text-[#142A27] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close job details modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Metadata Strip */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-3 border-t border-[#DFEDE5]/60 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium bg-[#FAFCF9] text-[#142A27] border border-[#DFEDE5]">
                  <Globe className="w-3 h-3 text-[#00B86B]" />
                  <span>{job.location}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium bg-[#FAFCF9] text-[#142A27] border border-[#DFEDE5]">
                  <Clock className="w-3 h-3 text-[#008F53]" />
                  <span>{job.duration || "3 – 6 Months"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium bg-[#FAFCF9] text-[#008F53] border border-[#BCE8CF]">
                  <span>Status: Open &amp; Accepting Applications</span>
                </span>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left select-text">
              {/* Role Overview */}
              <div>
                <h3 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-2 flex items-center gap-1.5">
                  <span>Role Overview</span>
                </h3>
                <p className="text-sm sm:text-base text-[#142A27] leading-relaxed font-normal">
                  {job.description || job.shortDescription}
                </p>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h3 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-3">
                  Key Responsibilities
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5E59] leading-snug p-2.5 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5]/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00B86B] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Candidate Requirements */}
              <div>
                <h3 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-3">
                  Candidate Requirements
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#142A27] font-medium leading-snug p-2.5 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5]/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#008F53] shrink-0 mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred Qualifications (if any) */}
              {preferredQualifications.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase font-bold text-[#64736F] tracking-wider mb-2">
                    Bonus / Preferred Qualifications
                  </h3>
                  <ul className="space-y-1.5">
                    {preferredQualifications.map((pref, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#64736F] flex items-center gap-2">
                        <span className="text-[#00B86B] font-bold">+</span>
                        <span>{pref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You Receive */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
                <h3 className="text-xs font-mono uppercase font-bold text-[#008F53] tracking-wider mb-3 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#00B86B]" />
                  <span>What You Receive</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {perks.map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#142A27] font-semibold bg-white p-2.5 rounded-xl border border-[#DFEDE5]"
                    >
                      <Award className="w-4 h-4 text-[#008F53] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Action Footer */}
            <div className="px-6 py-4 sm:px-8 border-t border-[#DFEDE5] bg-[#FAFCF9] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#64736F] hover:text-[#142A27] hover:bg-neutral-200/50 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              >
                <span>Apply For {job.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
