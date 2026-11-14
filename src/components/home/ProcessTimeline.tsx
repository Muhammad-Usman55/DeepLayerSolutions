"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import {
  Discover3DIcon,
  Strategize3DIcon,
  Develop3DIcon,
  Deliver3DIcon,
} from "./process/Process3DIcons";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    tagline: "Needs & Constraints Audit",
    description: "Understand your goals and requirements.",
    outcome: "Clear Project Direction",
    Icon: Discover3DIcon,
  },
  {
    number: "02",
    title: "Strategize",
    tagline: "Architecture & Feasibility",
    description: "Plan the right technology and solution.",
    outcome: "Smart Project Blueprint",
    Icon: Strategize3DIcon,
  },
  {
    number: "03",
    title: "Develop",
    tagline: "Iterative Test-Driven Build",
    description: "Build, test and refine your product.",
    outcome: "Quality-Driven Development",
    Icon: Develop3DIcon,
  },
  {
    number: "04",
    title: "Deliver",
    tagline: "Iterative & Production Scale",
    description: "Launch, optimize and support.",
    outcome: "Successful Product Launch",
    Icon: Deliver3DIcon,
  },
];

export function ProcessTimeline() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[#F8FCF9] border-t border-[#DFEDE5] select-none"
      aria-label="Our Development Approach"
    >
      {/* Background Ambient Lighting & Decorative Corner Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E9FFF2] via-[#D5F9E6]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#E9FFF2] via-[#34D399]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Dot Matrix in Corners */}
      <div className="hidden sm:block absolute top-12 left-10 w-24 h-24 bg-dot-pattern opacity-30 pointer-events-none -z-10" />
      <div className="hidden sm:block absolute bottom-12 right-10 w-24 h-24 bg-dot-pattern opacity-30 pointer-events-none -z-10" />

      {/* Fluid Wave Accent Curves */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none opacity-25 -z-10"
        viewBox="0 0 1440 64"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 32 C360 64, 720 0, 1080 32 C1260 48, 1380 20, 1440 36 L1440 64 L0 64 Z"
          fill="#34D399"
          fillOpacity="0.15"
        />
      </svg>

      <Container size="wide">
        {/* Mobile Heading Matching Mockup (< sm) */}
        <div className="text-center mb-6 sm:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Our <span className="text-[#008F53]">Development</span> Approach
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
            A simple and effective process.
          </p>
        </div>

        {/* Section Heading: Desktop (>= sm) */}
        <div className="hidden sm:flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
          <Eyebrow variant="chip" className="mb-4">
            How We Work
          </Eyebrow>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.14]">
            Our <span className="text-[#008F53]">Development</span> Approach.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64736F] leading-relaxed max-w-xl font-normal">
            From idea to launch, we build smarter digital solutions.
          </p>
        </div>

        {/* Mobile Vertical Process List matching Mockup (< sm) */}
        <div className="sm:hidden max-w-md mx-auto bg-white rounded-2xl border border-[#DFEDE5] p-4 shadow-xs space-y-3.5">
          <div className="flex items-center gap-3 text-left">
            <span className="w-5 h-5 rounded-full bg-[#008F53] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-[#142A27]">Discover</span>
              <span className="text-[#64736F]"> — Understand your needs</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="w-5 h-5 rounded-full bg-[#008F53] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-[#142A27]">Strategize</span>
              <span className="text-[#64736F]"> — Plan the right solution</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="w-5 h-5 rounded-full bg-[#008F53] text-white text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-[#142A27]">Develop</span>
              <span className="text-[#64736F]"> — Build with excellence</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="w-5 h-5 rounded-full bg-[#008F53] text-white text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-[#142A27]">Deliver</span>
              <span className="text-[#64736F]"> — Launch and support</span>
            </div>
          </div>
        </div>

        {/* 4 Connected Development Steps (Tablet & Desktop >= sm) */}
        <div className="hidden sm:block relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-[44%] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#BCE8CF] -z-0 pointer-events-none" />

          {/* Steps Grid: 4 in row on Desktop, 2x2 on Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-6 relative z-10">
            {processSteps.map((step, idx) => {
              const IconComponent = step.Icon;
              const isNotLast = idx < processSteps.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.12,
                      ease: "easeOut" as const,
                    }}
                    className="group relative flex flex-col justify-between h-full p-5 sm:p-7 rounded-2xl sm:rounded-[22px] bg-white border border-[#DFEDE5] hover:border-[#00B86B]/50 shadow-[0_8px_24px_-4px_rgba(0,184,107,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(0,184,107,0.14)] transition-all duration-300 hover:-translate-y-1.5 process-step-card"
                  >
                    <div>
                      {/* Top Row: Step Number Badge & 3D Glass Icon */}
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#008F53] bg-[#E9FFF2] border border-[#BCE8CF] shadow-2xs">
                          {step.number}
                        </span>

                        {/* 3D Glass Icon on Translucent Pedestal */}
                        <div className="transition-transform duration-300 group-hover:scale-105">
                          <IconComponent className="w-16 h-16 sm:w-18 sm:h-18" />
                        </div>
                      </div>

                      {/* Step Title & Tagline */}
                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-[#008F53] tracking-wide">
                          {step.tagline}
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="mt-3 text-sm text-[#64736F] leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Outcome Label */}
                    <div className="mt-6 pt-4 border-t border-[#F0FAF4]">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#008F53] bg-[#E9FFF2]/70 border border-[#BCE8CF] group-hover:bg-[#E9FFF2] transition-colors w-fit">
                        <span className="w-4 h-4 rounded-full bg-[#00B86B] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="font-semibold">{step.outcome}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Desktop Connecting Arrow Indicator between Cards */}
                  {isNotLast && (
                    <div
                      className="hidden lg:flex absolute top-[44%] -right-3.5 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-[#BCE8CF] text-[#008F53] items-center justify-center shadow-xs text-xs font-bold pointer-events-none"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
