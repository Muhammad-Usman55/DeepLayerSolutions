"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CaseStudyProject } from "@/types";
import { ProjectVisualDispatcher } from "./visuals/ProjectVisualDispatcher";

interface ProjectCardProps {
  project: CaseStudyProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col justify-between rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#087A3D]"
    >
      {/* Bespoke Project Visual Preview Header */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden border-b border-[#E3EDE5] bg-[#072418]">
        <ProjectVisualDispatcher
          visualType={project.heroVisualType || project.slug}
          mode="card"
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Category Pill Tag Overlay */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/60 text-[#A3E5B9] border border-[#159B50]/40 backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B50]" />
            {project.category}
          </span>
        </div>

        {/* Project Classification Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-[#D1FAE5] bg-black/50 border border-white/20 backdrop-blur-md">
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-[#159B50]">
            {project.tagline}
          </p>
          <p className="mt-3 text-sm text-[#65736D] leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Technology Stack Pills */}
          <div className="mt-5 pt-4 border-t border-[#E3EDE5] flex flex-wrap gap-1.5">
            {project.techStackFlat.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#F4FAF3] text-[#075C32] border border-[#E3EDE5] group-hover:border-[#C4D9C8] transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStackFlat.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FAFCF9] text-[#65736D] border border-[#E3EDE5]">
                +{project.techStackFlat.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Explore Project Link */}
        <div className="mt-6 pt-4 border-t border-[#E3EDE5] flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#087A3D] group-hover:text-[#075C32] transition-colors">
            <span>Explore Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#159B50]" />
          </div>

          <span className="text-[11px] font-mono text-[#A0AEA7] font-medium">
            Production Spec
          </span>
        </div>
      </div>
    </Link>
  );
}
