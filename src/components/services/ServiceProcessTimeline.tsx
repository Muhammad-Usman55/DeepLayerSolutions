"use client";

import React from "react";
import { Search, Compass, Code2, Rocket, Check, ArrowRight } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

const stepIcons = [Search, Compass, Code2, Rocket];
const stepOutcomes = [
  "Validated Specifications",
  "Production Architecture",
  "Tested Implementation",
  "Autonomous Live Scale",
];

export function ServiceProcessTimeline({
  process,
  serviceTitle,
}: {
  process: ProcessStep[];
  serviceTitle: string;
}) {
  return (
    <div className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
          <Rocket className="w-3.5 h-3.5 text-[#00B86B]" />
          <span>PHASED DELIVERY CYCLE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] tracking-tight">
          How We Deliver <span className="text-[#008F53]">{serviceTitle}</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#64736F]">
          A battle-tested 4-phase agile engineering methodology from discovery to production scale.
        </p>
      </div>

      <div className="relative">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#DFEDE5] via-[#00B86B]/60 to-[#DFEDE5] -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {process.map((step, idx) => {
            const IconComponent = stepIcons[idx % stepIcons.length];
            const outcome = stepOutcomes[idx % stepOutcomes.length];

            return (
              <div
                key={step.step}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-[#DFEDE5] hover:border-[#00B86B] shadow-[0_4px_20px_-4px_rgba(0,143,83,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(0,184,107,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Arrow connector between cards on desktop */}
                {idx < process.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-[58px] z-20 w-7 h-7 rounded-full bg-white border border-[#DFEDE5] text-[#008F53] items-center justify-center shadow-xs group-hover:border-[#00B86B] group-hover:scale-110 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  {/* Top Header: Step Number & 3D Glass Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#008F53] px-2.5 py-1 rounded-lg bg-[#E9FFF2] border border-[#BCE8CF]">
                      {step.step}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9FFF2] via-white to-[#D5F9E6] border border-[#00B86B]/40 shadow-xs flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-[#008F53]" />
                    </div>
                  </div>

                  {/* Step Title & Concise Description */}
                  <h3 className="text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Outcome Pill with Check Icon */}
                <div className="mt-6 pt-4 border-t border-[#DFEDE5] flex items-center gap-2 text-xs font-semibold text-[#008F53]">
                  <div className="w-4 h-4 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="truncate">{outcome}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
