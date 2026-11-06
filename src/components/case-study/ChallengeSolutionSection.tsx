"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { AlertCircle, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function ChallengeSolutionSection({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-[#FAFCF9] border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
            <Zap className="w-3.5 h-3.5 text-[#159B50]" />
            <span>PROBLEM &amp; RESOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
            The Technical Challenge &amp; Our Solution
          </h2>
          <p className="mt-3 text-base text-[#65736D]">
            How we navigated domain friction, performance bottlenecks, and architectural trade-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* The Challenge Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E3EDE5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#B45309] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <AlertCircle className="w-4 h-4 text-[#D97706]" />
                <span>The Technical Hurdle</span>
              </div>

              <h3 className="text-2xl font-bold text-[#101C19] mb-4">
                What Made This Complex
              </h3>

              <p className="text-sm sm:text-base text-[#65736D] leading-relaxed mb-6">
                {project.challenge.summary}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#E3EDE5]">
                <h4 className="text-xs font-mono font-bold uppercase text-[#101C19] tracking-wider mb-2">
                  Key Pain Points &amp; Limitations:
                </h4>
                {project.challenge.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#4A5568]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0 mt-2" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Engineering Solution Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-[#159B50]/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Green Top Highlight Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#087A3D] via-[#159B50] to-[#34D399]" />

            <div>
              <div className="flex items-center gap-2.5 text-[#087A3D] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-[#159B50]" />
                <span>Engineering Solution</span>
              </div>

              <h3 className="text-2xl font-bold text-[#101C19] mb-4">
                Our Architectural Strategy
              </h3>

              <p className="text-sm sm:text-base text-[#101C19] leading-relaxed mb-6">
                {project.solution.summary}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#E3EDE5]">
                <h4 className="text-xs font-mono font-bold uppercase text-[#075C32] tracking-wider mb-2">
                  Pivotal Architectural Decisions:
                </h4>
                {project.solution.keyDecisions.map((decision, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#101C19]">
                    <CheckCircle2 className="w-4 h-4 text-[#159B50] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
