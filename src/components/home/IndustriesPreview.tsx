"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import {
  Healthcare3DVisual,
  Finance3DVisual,
  Education3DVisual,
} from "./industries/Industry3DVisuals";

interface IndustryCardData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  VisualComponent: React.ComponentType<{ className?: string }>;
}

const industryCards: IndustryCardData[] = [
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare",
    subtitle: "Smarter Healthcare Solutions",
    badgeIcon: Activity,
    VisualComponent: Healthcare3DVisual,
  },
  {
    id: "finance",
    slug: "finance-fintech",
    title: "Finance & FinTech",
    subtitle: "Intelligent Financial Systems",
    badgeIcon: BarChart3,
    VisualComponent: Finance3DVisual,
  },
  {
    id: "education",
    slug: "education-edtech",
    title: "Education & EdTech",
    subtitle: "Adaptive Learning Technology",
    badgeIcon: GraduationCap,
    VisualComponent: Education3DVisual,
  },
];

export function IndustriesPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      id="industries"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-[#FFFFFF] border-t border-[#DFEDE5] select-none"
      aria-label="Industry-Specific Expertise"
    >
      {/* Soft Ambient Background Lighting & Gradients */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-[#E9FFF2] via-[#D5F9E6]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-gradient-to-tl from-[#E9FFF2] via-[#D5F9E6]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Subtle Corner Aura Rings */}
      <div className="hidden lg:block absolute -top-16 -left-16 w-72 h-72 rounded-full border border-[#00B86B]/15 pointer-events-none -z-10" />
      <div className="hidden lg:block absolute -bottom-20 -right-20 w-88 h-88 rounded-full border border-[#00B86B]/15 pointer-events-none -z-10" />

      <Container size="wide">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Centered Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFEDE5] shadow-xs text-xs font-semibold text-[#142A27] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#008F53]" />
            <span>Sectors & Domains</span>
          </div>

          {/* Main Heading with "Specific" highlighted in Emerald Green */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-tight">
            Industry-<span className="text-[#008F53]">Specific</span> Expertise.
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-base sm:text-lg text-[#64736F] leading-relaxed">
            Tailored solutions for your domain.
          </p>

          {/* Small Decorative Centered Emerald Dash Bar */}
          <div className="w-12 h-1 bg-[#008F53] rounded-full mx-auto mt-4" />
        </motion.div>

        {/* 3 Industry Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {industryCards.map((card, index) => {
            const BadgeIcon = card.badgeIcon;
            const Visual = card.VisualComponent;

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveDot(index)}
              >
                <Link
                  href={`/industries#${card.slug}`}
                  className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[32px] bg-white border border-[#DFEDE5] p-5 sm:p-8 transition-all duration-300 hover:border-[#008F53]/40 hover:-translate-y-2 shadow-[0_8px_24px_rgba(0,143,83,0.04)] hover:shadow-[0_20px_40px_rgba(0,143,83,0.1)] focus:outline-hidden focus:ring-2 focus:ring-[#008F53]"
                  aria-label={`Explore ${card.title} domain solutions`}
                >
                  {/* Top Row: Mini Pill/Circle Badge in Top Right */}
                  <div className="flex items-center justify-end w-full">
                    <div className="w-10 h-10 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs">
                      <BadgeIcon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Center: Bespoke 3D Glass & Isometric Vector Illustration */}
                  <div className="my-2 sm:my-3 flex items-center justify-center">
                    <div className="w-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <Visual />
                    </div>
                  </div>

                  {/* Bottom: Title & Minimal Circular Action Button */}
                  <div className="mt-2 pt-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#142A27] tracking-tight group-hover:text-[#008F53] transition-colors duration-200">
                      {card.title}
                    </h3>

                    <div className="mt-4 sm:mt-5">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#E9FFF2] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:scale-105">
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 3 Pagination Indicator Dots */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2" aria-hidden="true">
          {industryCards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setActiveDot(dotIdx)}
              className={`transition-all duration-300 rounded-full ${
                activeDot === dotIdx
                  ? "w-6 h-2 bg-[#008F53]"
                  : "w-2 h-2 bg-[#DFEDE5] hover:bg-[#008F53]/40"
              }`}
              aria-label={`Highlight industry card ${dotIdx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
