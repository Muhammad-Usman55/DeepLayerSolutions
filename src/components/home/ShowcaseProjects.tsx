"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { Button } from "../common/Button";
import { projectsData } from "@/data/projects";
import { Carousel } from "../carousel/Carousel";
import { ProjectVisualDispatcher } from "../portfolio/visuals/ProjectVisualDispatcher";

export function ShowcaseProjects() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section className="py-20 md:py-28 relative bg-[#FAFCF9] border-t border-[#E3EDE5]">
      {/* Background Soft Fluid Waves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
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
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Eyebrow Label */}
            <Eyebrow variant="chip" className="mb-4">
              Featured Portfolio
            </Eyebrow>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.12]">
              Ideas We&apos;ve Built. <br />
              <span className="text-[#008F53]">Solutions We&apos;ve Delivered.</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-[#64736F] leading-relaxed">
              Explore selected software and AI engineering projects demonstrating our technical capabilities across computer vision, agentic reasoning, and high-concurrency applications.
            </p>
          </div>

          <div className="shrink-0">
            <Button href="/portfolio" variant="secondary" size="md" withArrow>
              View Full Portfolio
            </Button>
          </div>
        </div>

        {/* Featured Projects Carousel (3 Desktop, 2 Tablet, 1 Mobile) */}
        <Carousel
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          gap={24}
          showControls={true}
          showDots={true}
          ariaLabel="Featured project showcase"
        >
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col justify-between rounded-[24px] sm:rounded-[28px] bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 h-full focus:outline-hidden focus:ring-2 focus:ring-[#087A3D]"
            >
              {/* Bespoke 3D Glass Platform Illustration Header */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8] border-b border-[#E3EDE5]">
                <ProjectVisualDispatcher
                  visualType={project.heroVisualType || project.slug}
                  mode="card"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#65736D] leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Technology Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStackFlat.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-[#E8F5E9] text-[#075C32] border border-[#D5EADB] transition-colors group-hover:border-[#C4D9C8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-7 pt-4 border-t border-[#E8F0EA] flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#087A3D] group-hover:text-[#065F34] transition-colors">
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#159B50]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#8A9A92] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#159B50]" />
                    <span>Production Grade</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
