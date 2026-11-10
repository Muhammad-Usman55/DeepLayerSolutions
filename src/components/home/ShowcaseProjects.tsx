"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { Button } from "../common/Button";
import { projectsData } from "@/data/projects";
import { ProjectVisualDispatcher } from "../portfolio/visuals/ProjectVisualDispatcher";
import { CaseStudyProject } from "@/types";

interface ProjectCardProps {
  project: CaseStudyProject;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: "easeOut" }}
      className="h-full select-none"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[24px] bg-white/95 hover:bg-white backdrop-blur-xs border border-[#DFEDE5] hover:border-[#008F53]/50 shadow-xs hover:shadow-xl hover:shadow-[#008F53]/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden p-5 sm:p-6"
        aria-label={`Explore case study: ${project.title}`}
      >
        {/* Subtle Top Gradient Accent on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#075B3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Header: Category Tag & Production Status Badge */}
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold bg-[#E9FFF2] px-2.5 py-1 rounded-full border border-[#BCE8CF]/60">
            {project.category}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#64736F]">
            <span className="w-2 h-2 rounded-full bg-[#008F53] animate-pulse" />
            <span>Production Grade</span>
          </div>
        </div>

        {/* Card Center: Bespoke 3D Glass Platform Illustration */}
        <div className="relative w-full h-44 sm:h-52 my-2 sm:my-3 rounded-xl overflow-hidden bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8] border border-[#E3EDE5]/80 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ProjectVisualDispatcher
            visualType={project.heroVisualType || project.slug}
            mode="card"
            className="scale-90"
          />
        </div>

        {/* Card Bottom: Title, Tagline, Action Button & Tech Stack */}
        <div className="pt-3 border-t border-[#DFEDE5]/60 flex flex-col justify-between mt-auto gap-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug line-clamp-1">
                {project.title}
              </h3>

              {/* Circular Action Button */}
              <div className="w-8 h-8 rounded-full bg-[#E9FFF2] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs group-hover:scale-105 shrink-0 mt-0.5">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-[#64736F] leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStackFlat.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#F4FAF6] text-[#075C32] border border-[#D5EADB] transition-colors group-hover:border-[#BCE8CF] group-hover:bg-[#E9FFF2]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ShowcaseProjects() {
  const featuredProjects = projectsData.filter((p) => p.featured);

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
      id="portfolio"
      className="py-20 md:py-28 relative bg-[#FAFCF9] border-t border-[#DFEDE5] overflow-hidden"
      aria-label="Featured Portfolio Showcase"
    >
      {/* Background Soft Ambient Glow & Fluid Waves */}
      <div className="absolute top-0 right-1/4 -z-10 w-[550px] h-[450px] bg-gradient-to-bl from-[#E8F5E9]/60 via-[#F4FAF6] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-[400px] h-[400px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-10"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 180 C400 180 750 350 1440 240"
          stroke="#C4E7D0"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 320 C500 320 850 490 1440 380"
          stroke="#D8F3E2"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <Container size="wide">
        {/* Mobile Header (< sm) */}
        <div className="text-center mb-6 sm:hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
              Featured <span className="text-[#008F53]">Portfolio</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
              A glimpse of our recent enterprise software & AI engineering.
            </p>
          </motion.div>
        </div>

        {/* Tablet & Desktop Section Header (>= sm) */}
        <div className="hidden sm:flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow variant="chip" className="mb-4">
                Featured Portfolio
              </Eyebrow>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.12]"
            >
              Ideas We&apos;ve Built. <br />
              <span className="text-[#008F53]">Solutions We&apos;ve Delivered.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-[#64736F] leading-relaxed"
            >
              Explore selected software and AI engineering projects demonstrating our technical capabilities across computer vision, agentic reasoning, and high-concurrency systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0 w-full sm:w-auto"
          >
            <Button
              href="/portfolio"
              variant="secondary"
              size="md"
              withArrow
              className="w-full sm:w-auto justify-center"
            >
              View Full Portfolio
            </Button>
          </motion.div>
        </div>

        {/* Controls Bar: Overview Pill + View Full Catalog */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between flex-wrap gap-4 border-b border-[#DFEDE5]/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#142A27]">
              Production Case Studies
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E9FFF2] text-[#008F53] font-semibold border border-[#BCE8CF]">
              {featuredProjects.length} Projects
            </span>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] transition-colors"
          >
            <span>Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Embla Horizontal Card Carousel Viewport & Track */}
        <div
          className="relative overflow-hidden py-2"
          ref={emblaRef}
          data-lenis-prevent-horizontal="true"
        >
          <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y transform-gpu will-change-transform">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-4 sm:pl-5 lg:pl-6 h-full"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls: Horizontal Prev / Next Buttons Directly Below Cards (Desktop & Mobile) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous portfolio project"
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
            aria-label="Next portfolio project"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
              canScrollNext
                ? "bg-white hover:bg-[#008F53] text-[#142A27] hover:text-white border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                : "bg-[#F4FAF6] text-[#A0AEC0] border-[#DFEDE5]/60 cursor-not-allowed opacity-40 shadow-none"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Indicators */}
        {scrollSnaps.length > 1 && (
          <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to portfolio slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  selectedIndex === idx
                    ? "w-7 h-2 bg-[#008F53]"
                    : "w-2 h-2 bg-[#DFEDE5] hover:bg-[#008F53]/50"
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
