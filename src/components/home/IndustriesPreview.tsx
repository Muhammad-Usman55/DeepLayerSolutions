"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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
    subtitle: "HIPAA-compliant diagnostic models, EHR sync, and clinical computer vision.",
    badgeIcon: Activity,
    VisualComponent: Healthcare3DVisual,
  },
  {
    id: "finance",
    slug: "finance-fintech",
    title: "Finance & FinTech",
    subtitle: "Sub-millisecond fraud scoring, algorithmic risk engines, and ledger automation.",
    badgeIcon: BarChart3,
    VisualComponent: Finance3DVisual,
  },
  {
    id: "education",
    slug: "education-research",
    title: "Education & Research",
    subtitle: "Adaptive learning curricula, student performance telemetry, and academic LLMs.",
    badgeIcon: GraduationCap,
    VisualComponent: Education3DVisual,
  },
  {
    id: "retail-ecommerce",
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    subtitle: "Omni-channel headless storefronts, real-time inventory, and AI checkout engines.",
    badgeIcon: ShoppingBag,
    VisualComponent: Ecommerce3DVisual,
  },
  {
    id: "hospitality",
    slug: "hospitality-restaurants",
    title: "Hospitality & Dining",
    subtitle: "Kitchen display systems (KDS), contactless order dispatch, and reservation CRM.",
    badgeIcon: UtensilsCrossed,
    VisualComponent: Hospitality3DVisual,
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing & IoT",
    subtitle: "Computer vision defect inspection, edge telemetry, and predictive maintenance.",
    badgeIcon: Factory,
    VisualComponent: Manufacturing3DVisual,
  },
  {
    id: "logistics",
    slug: "logistics-transportation",
    title: "Logistics & Transport",
    subtitle: "Dynamic multi-stop route optimization, telematics, and warehouse orchestration.",
    badgeIcon: Truck,
    VisualComponent: Logistics3DVisual,
  },
  {
    id: "realestate",
    slug: "real-estate",
    title: "Real Estate & PropTech",
    subtitle: "3D digital twin visualization, AVM valuation models, and automated leasing.",
    badgeIcon: Building2,
    VisualComponent: RealEstate3DVisual,
  },
  {
    id: "professional-services",
    slug: "professional-services",
    title: "Legal & Professional",
    subtitle: "Contract intelligence, automated NDAs, and secure multi-tenant virtual deal rooms.",
    badgeIcon: Briefcase,
    VisualComponent: LegalServices3DVisual,
  },
];

export function IndustriesPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 35,
    skipSnaps: false,
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

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
        {/* Mobile Header (sm:hidden) */}
        <div className="text-center mb-6 sm:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Industry-<span className="text-[#008F53]">Specific</span> Expertise
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
            Tailored solutions for your domain.
          </p>
        </div>

        {/* Section Header (Desktop & Tablet) */}
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

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-tight">
            Industry-<span className="text-[#008F53]">Specific</span> Expertise.
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-base sm:text-lg text-[#64736F] leading-relaxed">
            Tailored architectural blueprints engineered for vertical market challenges.
          </p>

          {/* Small Decorative Centered Emerald Dash Bar */}
          <div className="w-12 h-1 bg-[#008F53] rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Carousel Header Controls Bar */}
        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 flex items-center justify-between border-b border-[#DFEDE5]/70 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-bold text-[#142A27]">
              Specialized Industries
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E9FFF2] text-[#008F53] font-semibold border border-[#BCE8CF]">
              {industryCards.length} Sectors
            </span>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] transition-colors"
          >
            <span>All Sectors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Embla Horizontal Card Carousel Viewport & Track */}
        <div
          className="relative overflow-hidden py-2"
          ref={emblaRef}
          data-lenis-prevent-horizontal="true"
        >
          <div className="flex -ml-4 sm:-ml-6 lg:-ml-7 touch-pan-y transform-gpu will-change-transform">
            {industryCards.map((card) => {
              const BadgeIcon = card.badgeIcon;
              const Visual = card.VisualComponent;

              return (
                <div
                  key={card.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-4 sm:pl-6 lg:pl-7 h-full"
                >
                  <Link
                    href={`/industries/${card.slug}`}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[30px] bg-white border border-[#DFEDE5] hover:border-[#008F53]/50 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 shadow-[0_8px_24px_rgba(0,143,83,0.04)] hover:shadow-[0_20px_40px_rgba(0,143,83,0.12)] focus:outline-hidden focus:ring-2 focus:ring-[#008F53] text-left h-full select-none"
                    aria-label={`Explore ${card.title} domain solutions`}
                  >
                    {/* Top Header: Sector Badge Icon & Label */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold bg-[#E9FFF2] px-2.5 py-1 rounded-full border border-[#BCE8CF]/60">
                        Sector
                      </span>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs">
                        <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Center: Bespoke 3D Glass & Isometric Vector Illustration */}
                    <div className="my-2 sm:my-3 flex items-center justify-center">
                      <div className="w-full transition-transform duration-500 ease-out group-hover:scale-105">
                        <Visual />
                      </div>
                    </div>

                    {/* Bottom: Title, Subtitle & Circular Action Button */}
                    <div className="mt-2 pt-3 border-t border-[#DFEDE5]/60 flex flex-col justify-between mt-auto gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#142A27] tracking-tight group-hover:text-[#008F53] transition-colors duration-200 leading-snug line-clamp-1">
                          {card.title}
                        </h3>

                        {/* Circular Action Button */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E9FFF2] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs group-hover:scale-105 shrink-0 mt-0.5">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <p className="text-xs text-[#64736F] line-clamp-2 font-normal leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls: Horizontal Prev / Next Buttons Directly Below Cards (Desktop & Mobile) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous industry slide"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
              canScrollPrev
                ? "bg-white hover:bg-[#008F53] text-[#142A27] hover:text-white border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                : "bg-[#F4FAF6] text-[#A0AEC0] border-[#DFEDE5]/60 cursor-not-allowed opacity-40 shadow-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next industry slide"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
              canScrollNext
                ? "bg-white hover:bg-[#008F53] text-[#142A27] hover:text-white border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                : "bg-[#F4FAF6] text-[#A0AEC0] border-[#DFEDE5]/60 cursor-not-allowed opacity-40 shadow-none"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to industry slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  selectedIndex === idx
                    ? "w-7 h-2 bg-[#008F53]"
                    : "w-2 h-2 bg-[#DFEDE5] hover:bg-[#008F53]/50"
                }`}
              />
            ))}
          </div>
        )}

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
      </Container>
    </section>
  );
}
