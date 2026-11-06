"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { technologyItems, TechnologyItem } from "./technology-marquee/types";

export function TechnologyMarquee() {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items for continuous infinite marquee loop
  const marqueeItems = [...technologyItems, ...technologyItems];

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 border-y border-[#E3EDE5] bg-gradient-to-b from-[#FAFCF9] via-white to-[#FAFCF9] select-none"
      aria-label="Our Technology Universe"
    >
      {/* Ambient Lighting & Technical Dot Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-36 bg-radial from-[#34D399]/15 via-[#047F5B]/06 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      {/* Section Header */}
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-10"
        >
          {/* Eyebrow Label */}
          <Eyebrow variant="chip" className="mb-3">
            What We Do
          </Eyebrow>

          {/* Main Compact Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#101C19]">
            Technology.{" "}
            <span className="text-[#047F5B] relative inline-block">
              Engineered for What&apos;s Next.
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-[#34D399]/40 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="5" fill="none" />
              </svg>
            </span>
          </h2>
        </motion.div>
      </Container>

      {/* Marquee Track Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden [touch-action:pan-y]">
        {/* Left Edge Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-36 lg:w-48 bg-gradient-to-r from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

        {/* Right Edge Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-36 lg:w-48 bg-gradient-to-l from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

        {/* Marquee Items Ribbon Track */}
        {shouldReduceMotion ? (
          // Reduced Motion Mode: Static responsive wrap layout
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 py-2">
            {technologyItems.map((item) => (
              <TechnologyNode key={item.id} item={item} />
            ))}
          </div>
        ) : (
          // Animated Mode: Seamless continuous infinite loop marquee
          <div
            className="animate-marquee-ribbon hover:[animation-play-state:paused] flex items-center py-2"
          >
            {marqueeItems.map((item, index) => {
              const isDuplicate = index >= technologyItems.length;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center shrink-0"
                  aria-hidden={isDuplicate ? "true" : undefined}
                >
                  <TechnologyNode item={item} />
                  {/* Architectural Separator */}
                  <div
                    className="flex items-center gap-2 px-5 sm:px-7 select-none opacity-40 shrink-0"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#34D399]" />
                    <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent via-[#047F5B] to-transparent" />
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#34D399]" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// Individual Technology Node Component
function TechnologyNode({ item }: { item: TechnologyItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex items-center gap-3.5 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B]"
      aria-label={`${item.label} (${item.tag})`}
    >
      {/* Icon Capsule */}
      <div className="w-11 h-11 rounded-xl bg-white/95 border border-[#E3EDE5] shadow-xs flex items-center justify-center text-[#047F5B] transition-all duration-300 group-hover:bg-[#047F5B] group-hover:text-white group-hover:border-[#047F5B] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.45)] group-hover:scale-110 shrink-0">
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
      </div>

      {/* Label and Tag */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#047F5B] font-semibold block leading-tight mb-0.5">
          {item.tag}
        </span>
        <span className="text-sm sm:text-base font-bold text-[#101C19] group-hover:text-[#047F5B] transition-colors whitespace-nowrap relative block leading-tight">
          {item.label}
          {/* Animated Center-Expanding Underline */}
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#047F5B] via-[#34D399] to-[#047F5B] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
        </span>
      </div>
    </Link>
  );
}

