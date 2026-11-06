"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { CheckCircle2, Award, Gauge } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function ResultsValidationSection({ project }: Props) {
  const { resultsAndValidation } = project;

  return (
    <section className="py-14 sm:py-20 bg-[#FAFCF9] border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
            <Gauge className="w-3.5 h-3.5 text-[#159B50]" />
            <span>VERIFIED BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
            Results &amp; Technical Validation
          </h2>
          <p className="mt-3 text-base text-[#65736D] leading-relaxed">
            {resultsAndValidation.summary}
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resultsAndValidation.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#087A3D] font-mono tracking-tight">
                  {metric.value}
                </span>
                <h3 className="text-sm font-bold text-[#101C19] mt-2 mb-1.5">
                  {metric.label}
                </h3>
                <p className="text-xs text-[#65736D] leading-relaxed">
                  {metric.description}
                </p>
              </div>

              {metric.context && (
                <div className="mt-4 pt-3 border-t border-[#E3EDE5] text-[10px] font-mono text-[#075C32] font-semibold">
                  {metric.context}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Qualitative Engineering Evaluation */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E3EDE5] shadow-sm">
          <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[#075C32] mb-5">
            Engineering Telemetry &amp; Stress Test Findings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultsAndValidation.qualitativeValidation.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#159B50] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
