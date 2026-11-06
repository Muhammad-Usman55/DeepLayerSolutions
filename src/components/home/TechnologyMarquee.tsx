"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { technologyItems, TechnologyItem } from "./technology-marquee/types";

export function TechnologyMarquee() {
  // Duplicate items for continuous infinite marquee loop
  const marqueeItems = [...technologyItems, ...technologyItems];

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#FAFCF9] via-white to-[#FAFCF9] select-none"
      aria-label="Our Technology Universe"
    >
      {/* Ambient Lighting & Technical Dot Matrix Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-48 bg-radial from-[#34D399]/18 via-[#008F53]/06 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      {/* Section Header */}
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-3xl mx-auto"
        >
          {/* High-Tech Eyebrow Pill with Live Pulse Dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] mb-4 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B86B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008F53]" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
              Core Capabilities · Production Grade
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#142A27] leading-[1.15]">
            Technology.{" "}
            <span className="text-[#008F53] relative inline-block">
              Engineered for What&apos;s Next.
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#34D399]/40 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,9 Q50,0 100,9"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-sm sm:text-base text-[#64736F] max-w-xl mx-auto font-normal leading-relaxed">
            Battle-tested AI systems, full-stack digital architectures, and cloud platforms built for velocity and enterprise scale.
          </p>
        </motion.div>
      </Container>

      {/* Marquee Track Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden [touch-action:pan-y]">
        {/* Left Edge Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-44 lg:w-64 bg-gradient-to-r from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

        {/* Right Edge Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-44 lg:w-64 bg-gradient-to-l from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

        {/* Marquee Items Ribbon Track */}
        <div className="animate-marquee-ribbon hover:[animation-play-state:paused] flex items-center py-4">
          {marqueeItems.map((item, index) => {
            const isDuplicate = index >= technologyItems.length;
            return (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center shrink-0"
                aria-hidden={isDuplicate ? "true" : undefined}
              >
                <TechnologyNode item={item} />
                {/* Circuit Bus Connector */}
                <div
                  className="flex items-center gap-1.5 px-4 sm:px-6 select-none opacity-45 shrink-0"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]/40" />
                  <span className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-[#008F53]/60 to-transparent" />
                  <span className="w-2 h-2 rounded-full border border-[#008F53] bg-white flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#008F53]" />
                  </span>
                  <span className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-[#008F53]/60 to-transparent" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]/40" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Individual Sculpted Glass Capsule Node Component
function TechnologyNode({ item }: { item: TechnologyItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DFEDE5] shadow-[0_4px_20px_-4px_rgba(0,143,83,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(0,184,107,0.18)] hover:border-[#008F53]/50 transition-all duration-300 hover:-translate-y-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53]"
      aria-label={`${item.label} (${item.tag})`}
    >
      {/* Subtle Top Glass Reflection */}
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent rounded-t-2xl pointer-events-none" />

      {/* Glowing Icon Pedestal */}
      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#E9FFF2] via-[#F0FAF4] to-[#D5F9E6] border border-[#BCE8CF] flex items-center justify-center text-[#008F53] transition-all duration-300 group-hover:bg-[#008F53] group-hover:text-white group-hover:border-[#008F53] group-hover:shadow-[0_0_20px_rgba(0,184,107,0.35)] group-hover:scale-105 shrink-0">
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
      </div>

      {/* Details: Tag, Title, Subline */}
      <div className="flex flex-col text-left pr-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#008F53] bg-[#E9FFF2] px-2 py-0.5 rounded-md border border-[#BCE8CF]/60">
            {item.tag}
          </span>
        </div>
        <span className="text-sm sm:text-base font-extrabold text-[#142A27] group-hover:text-[#008F53] transition-colors whitespace-nowrap tracking-tight">
          {item.label}
        </span>
        <span className="text-[11px] font-medium text-[#64736F] whitespace-nowrap mt-0.5">
          {item.subline}
        </span>
      </div>

      {/* Floating Action Arrow Indicator */}
      <div className="w-7 h-7 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] flex items-center justify-center text-[#64736F] transition-all duration-300 group-hover:bg-[#008F53] group-hover:text-white group-hover:border-[#008F53] group-hover:scale-110 ml-2 shrink-0">
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
