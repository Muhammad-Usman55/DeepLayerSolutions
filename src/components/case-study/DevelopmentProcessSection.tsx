"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { GitBranch, CheckSquare } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function DevelopmentProcessSection({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-[#FAFCF9] border-b border-[#DFEDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] mb-4">
            <GitBranch className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>ENGINEERING TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27]">
            Development &amp; Verification Methodology
          </h2>
          <p className="mt-3 text-base text-[#64736F]">
            A structured five-phase engineering lifecycle ensuring stability, low latency, and deterministic validation.
          </p>
        </div>

        {/* 5-Stage Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {project.developmentProcess.map((stage, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs flex flex-col justify-between relative group hover:border-[#00B86B]/60 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] border border-[#DFEDE5] text-[#008F53] font-mono font-extrabold text-sm flex items-center justify-center mb-4">
                  {stage.step}
                </div>

                <h3 className="text-base font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mb-2.5">
                  {stage.title}
                </h3>

                <p className="text-xs text-[#64736F] leading-relaxed mb-4">
                  {stage.description}
                </p>
              </div>

              {stage.deliverables && stage.deliverables.length > 0 && (
                <div className="pt-3 border-t border-[#DFEDE5] space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#008F53]">
                    Milestone Deliverables:
                  </span>
                  {stage.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-[#64736F]">
                      <CheckSquare className="w-3 h-3 text-[#00B86B] shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

