"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { Users, Sparkles, Compass } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function ProjectOverviewSection({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#DFEDE5]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              <Compass className="w-3.5 h-3.5 text-[#00B86B]" />
              <span>PROJECT OVERVIEW</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] leading-tight">
              Engineering Purpose &amp; Domain Mission
            </h2>

            <p className="text-base sm:text-lg text-[#64736F] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Right Cards Column: Audience & Uniqueness */}
          <div className="lg:col-span-5 space-y-5">
            {/* Target Audience Box */}
            <div className="p-6 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
              <div className="flex items-center gap-2.5 text-[#008F53] font-bold text-sm uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Primary Target Audience</span>
              </div>
              <p className="text-sm text-[#142A27] leading-relaxed">
                {project.targetAudience}
              </p>
            </div>

            {/* Technical Uniqueness Box */}
            <div className="p-6 rounded-2xl bg-[#E9FFF2] border border-[#DFEDE5] relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[#008F53] font-bold text-sm uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#00B86B]" />
                <span>Technical Differentiation</span>
              </div>
              <p className="text-sm text-[#142A27] leading-relaxed">
                Engineered with strict constraints: verified deterministic tool grounding, latency bounds under {project.category === "Voice & Conversational AI" ? "450ms" : "sub-second"}, and zero reliance on fragile black-box mocks.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

