"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectVisualDispatcher } from "@/components/portfolio/visuals/ProjectVisualDispatcher";

const PROJECT_METRICS: Record<string, string> = {
  "finsecure-ml": "⚡ 11.4ms Inference • 65% Less Declines",
  "voice-agent": "🎙️ 480ms Roundtrip • 120+ Languages",
  "omni-commerce": "🚀 3.4x Faster Checkout • 99.99% Uptime",
  "healthcare-diagnostic": "🩺 98.4% Precision • HIPAA Certified",
  "logistics-fleet": "🚚 22% Fuel Saved • Real-Time Route AI",
  "proptech-twin": "🏢 60FPS 3D Twins • Automated Leasing",
};

export function PortfolioMobileShowcase() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(index, featuredProjects.length - 1));
  };

  return (
    <div className="w-full">
      {/* 1. Header with Minimal Punchy Copy */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[10px] font-bold text-[#008F53] uppercase tracking-wider mb-2">
          <span>✦ Real Outcomes</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
          Featured <span className="text-[#008F53]">Portfolio</span>
        </h2>
        <p className="text-xs text-[#64736F] mt-1 max-w-xs mx-auto">
          Production systems delivering measurable business impact.
        </p>
      </div>

      {/* 2. Horizontal Peeking Visual Card Reel */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory px-3 pb-4 no-scrollbar -mx-2"
      >
        {featuredProjects.map((project) => {
          const metric = PROJECT_METRICS[project.slug] || "⚡ Production Scale Architecture";
          return (
            <div
              key={project.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center select-none"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group flex flex-col justify-between h-full rounded-3xl bg-white border border-[#DFEDE5] hover:border-[#008F53]/50 shadow-md hover:shadow-xl transition-all p-4.5 overflow-hidden relative"
              >
                {/* Top Subtle Emerald Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#008F53] via-[#00B86B] to-[#075B3E]" />

                {/* Top Bar: Category & Live Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-bold bg-[#E9FFF2] px-2.5 py-0.5 rounded-full border border-[#BCE8CF]/60">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#087A3D]">
                    <span className="w-2 h-2 rounded-full bg-[#008F53] animate-pulse" />
                    <span>Live in Prod</span>
                  </div>
                </div>

                {/* Center: 3D Visual Stage */}
                <div className="w-full h-36 my-2 rounded-2xl bg-linear-to-b from-[#F5FAF7] to-[#EAF5EF] border border-[#E3EDE5] flex items-center justify-center overflow-hidden">
                  <div className="scale-85 origin-center flex items-center justify-center">
                    <ProjectVisualDispatcher
                      visualType={project.heroVisualType || project.slug}
                      mode="card"
                    />
                  </div>
                </div>

                {/* Key Metric Pill */}
                <div className="my-2 px-2.5 py-1.5 rounded-xl bg-[#F0FAF4] border border-[#CDE8D8] text-[10px] font-bold text-[#087A3D] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#008F53] shrink-0" />
                  <span className="truncate">{metric}</span>
                </div>

                {/* Title & 1-line Tagline */}
                <div>
                  <h3 className="text-base font-extrabold text-[#142A27] tracking-tight group-hover:text-[#008F53] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#64736F] mt-0.5 line-clamp-1 font-medium">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Flat & Action */}
                <div className="mt-3 pt-3 border-t border-[#DFEDE5]/60 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {project.techStackFlat.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-[#F4FAF6] text-[#075C32] border border-[#D5EADB]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#008F53] group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* 3. Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {featuredProjects.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "w-6 bg-[#008F53]" : "w-1.5 bg-[#DFEDE5]"
            }`}
          />
        ))}
      </div>

      {/* 4. Bottom View All Link */}
      <div className="text-center mt-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008F53] hover:underline"
        >
          <span>View all enterprise case studies</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
