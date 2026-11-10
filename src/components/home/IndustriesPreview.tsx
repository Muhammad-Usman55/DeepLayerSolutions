"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Factory,
  Truck,
  Building2,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Container } from "../common/Container";
import {
  Healthcare3DVisual,
  Finance3DVisual,
  Education3DVisual,
  Ecommerce3DVisual,
  Hospitality3DVisual,
  Manufacturing3DVisual,
  Logistics3DVisual,
  RealEstate3DVisual,
  LegalServices3DVisual,
} from "../industries/IndustryVisuals";

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
    slug: "education-research",
    title: "Education & Research",
    subtitle: "Adaptive Learning & Academic AI",
    badgeIcon: GraduationCap,
    VisualComponent: Education3DVisual,
  },
  {
    id: "retail-ecommerce",
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    subtitle: "Omni-Channel Commerce & POS",
    badgeIcon: ShoppingBag,
    VisualComponent: Ecommerce3DVisual,
  },
  {
    id: "hospitality",
    slug: "hospitality-restaurants",
    title: "Hospitality & Dining",
    subtitle: "Kitchen KDS & Contactless Order",
    badgeIcon: UtensilsCrossed,
    VisualComponent: Hospitality3DVisual,
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing & IoT",
    subtitle: "Defect Vision & Machine Telemetry",
    badgeIcon: Factory,
    VisualComponent: Manufacturing3DVisual,
  },
  {
    id: "logistics",
    slug: "logistics-transportation",
    title: "Logistics & Transport",
    subtitle: "Dynamic Route & Fleet Telematics",
    badgeIcon: Truck,
    VisualComponent: Logistics3DVisual,
  },
  {
    id: "realestate",
    slug: "real-estate",
    title: "Real Estate & PropTech",
    subtitle: "3D Digital Twins & AVM Valuations",
    badgeIcon: Building2,
    VisualComponent: RealEstate3DVisual,
  },
  {
    id: "professional-services",
    slug: "professional-services",
    title: "Legal & Professional",
    subtitle: "Contract Intelligence & Virtual Rooms",
    badgeIcon: Briefcase,
    VisualComponent: LegalServices3DVisual,
  },
];

export function IndustriesPreview() {
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
        {/* Mobile Header Matching Mockup (sm:hidden) */}
        <div className="text-center mb-6 sm:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Industry-<span className="text-[#008F53]">Specific</span> Expertise
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
            Tailored solutions for your industry.
          </p>
        </div>

        {/* Section Header (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto hidden sm:block"
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

        {/* 3 Industry Cards (3-col compact row on mobile, 3-col rich cards on desktop) */}
        <div className="mt-8 sm:mt-16 grid grid-cols-3 gap-2.5 sm:gap-8 max-w-6xl mx-auto">
          {industryCards.map((card, index) => {
            const BadgeIcon = card.badgeIcon;
            const Visual = card.VisualComponent;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
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
                  className="group relative flex flex-col justify-between items-center sm:items-stretch rounded-xl sm:rounded-[32px] bg-white border border-[#DFEDE5] p-3 sm:p-8 transition-all duration-300 hover:border-[#008F53]/40 hover:-translate-y-2 shadow-[0_8px_24px_rgba(0,143,83,0.04)] hover:shadow-[0_20px_40px_rgba(0,143,83,0.1)] focus:outline-hidden focus:ring-2 focus:ring-[#008F53] text-center sm:text-left h-full"
                  aria-label={`Explore ${card.title} domain solutions`}
                >
                  {/* Top Row: Mini Pill/Circle Badge (Centered on mobile, right on desktop) */}
                  <div className="flex items-center justify-center sm:justify-end w-full">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs">
                      <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Center: Bespoke 3D Glass & Isometric Vector Illustration (Desktop Only) */}
                  <div className="my-2 sm:my-3 hidden sm:flex items-center justify-center">
                    <div className="w-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <Visual />
                    </div>
                  </div>

                  {/* Bottom: Title & Minimal Circular Action Button */}
                  <div className="mt-1 sm:mt-2 sm:pt-2 w-full">
                    <h3 className="text-xs sm:text-2xl font-bold text-[#142A27] tracking-tight group-hover:text-[#008F53] transition-colors duration-200 leading-snug">
                      {card.title}
                    </h3>

                    <div className="mt-4 sm:mt-5 hidden sm:block">
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

        {/* Explore All Button */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105"
          >
            <span>Explore All Sector Engineering Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Indicator Dots for Rows (Desktop Only) */}
        <div className="mt-8 hidden sm:flex items-center justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((rowIdx) => (
            <button
              key={rowIdx}
              type="button"
              onClick={() => setActiveDot(rowIdx * 3)}
              className={`transition-all duration-300 rounded-full ${
                Math.floor(activeDot / 3) === rowIdx
                  ? "w-6 h-2 bg-[#008F53]"
                  : "w-2 h-2 bg-[#DFEDE5] hover:bg-[#008F53]/40"
              }`}
              aria-label={`Highlight industry row ${rowIdx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
