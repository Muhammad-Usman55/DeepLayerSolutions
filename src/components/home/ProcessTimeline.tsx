"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Search, Compass, Code2, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    tagline: "Needs & Constraints Audit",
    description:
      "We dissect your operational workflows, evaluate existing data and systems, and isolate high-leverage opportunities.",
    icon: Search,
    deliverable: "Technical Feasibility Spec",
  },
  {
    number: "02",
    title: "Strategize",
    tagline: "Architecture & Feasibility",
    description:
      "Our architects map out database schemas, model backbones, API contracts, and security boundaries before writing code.",
    icon: Compass,
    deliverable: "System Blueprint & Contracts",
  },
  {
    number: "03",
    title: "Develop",
    tagline: "Iterative Test-Driven Build",
    description:
      "We build modular increments in transparent two-week sprints with continuous automated integration and client demo reviews.",
    icon: Code2,
    deliverable: "Weekly Working Demos",
  },
  {
    number: "04",
    title: "Deliver",
    tagline: "Hardening & Production Scale",
    description:
      "Stress testing, security auditing, zero-downtime deployment, and automated telemetry ensuring steady long-term operations.",
    icon: Rocket,
    deliverable: "Production Launch & SLA",
  },
];

export function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 relative bg-[#FAFCF9] border-t border-[#E3EDE5]">
      <Container size="wide">
        <SectionHeading
          badge="How We Work"
          title="Our Development Approach."
          highlight="Development Approach"
          subtitle="A battle-tested engineering methodology that eliminates ambiguity, maintains velocity, and ensures measurable outcomes."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 sm:mt-16">
          {/* Desktop Connecting Line with Animated Fill */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[3px] bg-[#E3EDE5] z-0 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.2,
                ease: "easeOut" as const,
              }}
              className="h-full bg-gradient-to-r from-[#087A3D] via-[#159B50] to-[#34D399] origin-left"
            />
          </div>

          {/* Steps Grid: 4 Columns Desktop, 2 Columns Tablet, 1 Column Vertical Connected on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.55,
                    delay: shouldReduceMotion ? 0 : idx * 0.15,
                    ease: "easeOut" as const,
                  }}
                  className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-white border border-[#E3EDE5] hover:border-[#159B50] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Step Number & Icon Capsule */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#C4D9C8] flex items-center justify-center text-[#087A3D] group-hover:scale-110 group-hover:bg-[#087A3D] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-extrabold font-mono text-[#087A3D]/40 group-hover:text-[#087A3D] transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#159B50]">
                      {step.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[#65736D] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverable Badge */}
                  <div className="mt-6 pt-4 border-t border-[#E3EDE5] flex items-center gap-2 text-xs font-mono text-[#075C32]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B50] shrink-0" />
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
