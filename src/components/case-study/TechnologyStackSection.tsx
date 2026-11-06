"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { Terminal } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function TechnologyStackSection({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#DFEDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] mb-4">
            <Terminal className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>TECH STACK COMPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27]">
            Technologies &amp; Frameworks
          </h2>
          <p className="mt-3 text-base text-[#64736F]">
            Production-grade tooling selected for reliability, low latency, and deterministic execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {project.technologyGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#008F53] pb-3 mb-4 border-b border-[#DFEDE5]">
                  {group.category}
                </h3>

                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#142A27] py-1 px-2.5 rounded-lg bg-white border border-[#DFEDE5]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 text-[11px] font-mono text-[#64736F]">
                <span>{group.items.length} Production Packages</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

