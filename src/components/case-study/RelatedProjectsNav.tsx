"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import { projectsData } from "@/data/projects";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

export function RelatedProjectsNav({ project }: Props) {
  const prevProject = project.prevProjectSlug
    ? projectsData.find((p) => p.slug === project.prevProjectSlug)
    : null;

  const nextProject = project.nextProjectSlug
    ? projectsData.find((p) => p.slug === project.nextProjectSlug)
    : null;

  if (!prevProject && !nextProject) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#FAFCF9] border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E3EDE5]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#075C32]">
            <Compass className="w-4 h-4 text-[#159B50]" />
            <span>MORE CASE STUDIES</span>
          </div>
          <Link
            href="/portfolio"
            className="text-xs font-semibold text-[#087A3D] hover:text-[#075C32] transition-colors"
          >
            View Complete Index →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Project Card */}
          {prevProject && (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="p-6 rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 transition-all duration-300 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4FAF3] border border-[#E3EDE5] flex items-center justify-center text-[#087A3D] group-hover:bg-[#E8F5E9] transition-colors">
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#65736D]">
                    Previous Case Study
                  </span>
                  <h4 className="text-base font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                    {prevProject.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#159B50]">
                    {prevProject.category}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Next Project Card */}
          {nextProject && (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="p-6 rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 transition-all duration-300 group flex items-center justify-between md:text-right"
            >
              <div className="flex items-center justify-between w-full md:flex-row-reverse gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4FAF3] border border-[#E3EDE5] flex items-center justify-center text-[#087A3D] group-hover:bg-[#E8F5E9] transition-colors">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#65736D]">
                    Next Case Study
                  </span>
                  <h4 className="text-base font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                    {nextProject.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#159B50]">
                    {nextProject.category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}

