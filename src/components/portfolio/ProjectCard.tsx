"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyProject } from "@/types";
import { ProjectVisualDispatcher } from "./visuals/ProjectVisualDispatcher";

interface ProjectCardProps {
  project: CaseStudyProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col justify-between rounded-[24px] sm:rounded-[28px] bg-white border border-[#DFEDE5] hover:border-[#008F53]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#008F53]"
    >
      {/* 3D Glass Platform Illustration Header */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gradient-to-b from-[#F8FCF9] via-[#F0FAF4] to-[#E9FFF2] border-b border-[#DFEDE5]">
        <ProjectVisualDispatcher
          visualType={project.heroVisualType || project.slug}
          mode="card"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="mt-1 text-sm text-[#64736F] leading-relaxed">
            {project.tagline}
          </p>

          {/* Technology Pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStackFlat.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] transition-colors group-hover:border-[#008F53]/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row */}
        <div className="mt-7 pt-4 border-t border-[#DFEDE5] flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#008F53] group-hover:text-[#007343] transition-colors">
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#008F53]" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#64736F] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#008F53]" />
            <span>Production Grade</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
