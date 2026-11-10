"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { Wrench, CheckCircle2, AlertTriangle } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function EngineeringChallengesSection({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#DFEDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] mb-4">
            <Wrench className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>AUTHENTIC TRIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27]">
            Genuine Engineering Hurdles &amp; Solutions
          </h2>
          <p className="mt-3 text-base text-[#64736F]">
            Real technical roadblocks encountered during development and how we resolved them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {project.engineeringChallenges.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-9 rounded-3xl bg-[#FAFCF9] border border-[#DFEDE5] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DFEDE5]">
                  <span className="text-xs font-mono font-bold text-[#008F53]">
                    CHALLENGE_0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#64736F]">
                    RESOLVED
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#142A27] mb-4">
                  {item.title}
                </h3>

                {/* Problem Statement */}
                <div className="mb-4 p-4 rounded-xl bg-white border border-[#DFEDE5]">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#B45309] mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>The Problem:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* Research Approach */}
                <div className="mb-4 px-2">
                  <div className="text-xs font-mono font-bold uppercase text-[#64736F] mb-1">
                    Engineering Approach:
                  </div>
                  <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {item.approach}
                  </p>
                </div>
              </div>

              {/* The Technical Solution */}
              <div className="mt-4 p-4 rounded-xl bg-[#E9FFF2] border border-[#DFEDE5]">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#008F53] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B86B]" />
                  <span>The Resolution:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#142A27] font-medium leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

