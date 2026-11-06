"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { Cpu, ArrowDown, Database, Server, Laptop, Activity } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function ArchitectureSection({ project }: Props) {
  const { architecture } = project;

  return (
    <section className="py-14 sm:py-20 bg-[#FAFCF9] border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#159B50]" />
            <span>UNDER THE HOOD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
            System Architecture &amp; Data Pipeline
          </h2>
          <p className="mt-3 text-base text-[#65736D] leading-relaxed">
            {architecture.overview}
          </p>
        </div>

        {/* Architecture Layers Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {architecture.layers.map((layer, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs hover:border-[#159B50]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E3EDE5]">
                  <span className="text-xs font-mono font-bold text-[#087A3D]">
                    LAYER_0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4FAF3] text-[#075C32] border border-[#C4D9C8]">
                    {layer.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#101C19] mb-2">
                  {layer.name}
                </h3>

                <p className="text-xs text-[#65736D] leading-relaxed mb-4">
                  {layer.description}
                </p>
              </div>

              {/* Technologies Tag Group */}
              <div className="pt-3 border-t border-[#E3EDE5] flex flex-wrap gap-1.5">
                {layer.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFCF9] text-[#101C19] border border-[#E3EDE5]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-Step Data Flow Visual Sequence */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-[#E3EDE5] shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#075C32] mb-6">
            <Activity className="w-4 h-4 text-[#159B50]" />
            <span>End-to-End Pipeline Execution Sequence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecture.dataFlow.map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#FAFCF9] border border-[#E3EDE5] flex items-start gap-3 text-xs sm:text-sm text-[#101C19] hover:bg-[#F4FAF3] transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-[#E8F5E9] text-[#087A3D] font-mono font-bold flex items-center justify-center shrink-0 border border-[#C4D9C8]">
                  {i + 1}
                </div>
                <div className="leading-relaxed">{step.replace(/^\d+\.\s*/, "")}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

