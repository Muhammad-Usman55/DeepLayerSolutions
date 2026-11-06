"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Zap, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";

interface ServiceImpactMatrixProps {
  serviceTitle: string;
  challenges: string[];
  approach: string[];
}

export function ServiceImpactMatrix({
  serviceTitle,
  challenges,
  approach,
}: ServiceImpactMatrixProps) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-[#00B86B]" />
          <span>MEASURABLE BUSINESS IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] tracking-tight">
          Overcoming The Bottlenecks
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#64736F]">
          How our engineered approach replaces conventional trade-offs with production certainty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
        {/* Conventional / Legacy Bottlenecks Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white border border-amber-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold block">
                  TRADITIONAL / OFF-THE-SHELF
                </span>
                <h3 className="text-xl font-bold text-[#142A27]">
                  Common Industry Friction
                </h3>
              </div>
            </div>

            <ul className="space-y-4">
              {challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#64736F] leading-snug">
                    {challenge}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs text-amber-800 font-medium bg-amber-50/60 p-3 rounded-xl">
            <span>Resulting in: Delayed release cycles & technical debt</span>
            <span className="font-bold">High Risk</span>
          </div>
        </div>

        {/* DeepLayer Engineered Advantage Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-white via-[#FAFCF9] to-[#E9FFF2]/30 border-2 border-[#00B86B]/60 shadow-[0_12px_32px_-8px_rgba(0,184,107,0.12)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B86B]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#DFEDE5]">
              <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5 text-[#00B86B]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-bold block">
                  THE DEEPLAYER WAY
                </span>
                <h3 className="text-xl font-bold text-[#142A27]">
                  Engineered Solution
                </h3>
              </div>
            </div>

            <ul className="space-y-4">
              {approach.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                  </div>
                  <p className="text-sm font-semibold text-[#142A27] leading-snug">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#DFEDE5] flex items-center justify-between text-xs text-[#008F53] font-bold bg-[#E9FFF2] p-3 rounded-xl">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00B86B]" />
              Production verified with continuous SLAs
            </span>
            <span className="font-mono">Zero Drift</span>
          </div>
        </div>
      </div>
    </div>
  );
}

