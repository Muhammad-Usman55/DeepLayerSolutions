"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Cpu, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectItem } from "@/types";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

const categories = ["All", "AI & ML", "Web Apps", "Mobile", "Data Science", "Automation"];

export function PortfolioView() {
  const searchParams = useSearchParams();
  const highlightSlug = searchParams.get("highlight");

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProjectOverride, setActiveProjectOverride] = useState<ProjectItem | null | undefined>(undefined);

  // Derive project from highlightSlug or override
  const selectedProject =
    activeProjectOverride !== undefined
      ? activeProjectOverride
      : highlightSlug
      ? projectsData.find((p) => p.slug === highlightSlug) ?? null
      : null;

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  // Accessible Escape key listener & body scroll lock for modal
  useEffect(() => {
    if (!selectedProject) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProjectOverride(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer",
              activeCategory === cat
                ? "bg-[#087A3D] text-white shadow-sm"
                : "bg-white text-[#101C19] hover:bg-[#F4FAF3] hover:text-[#087A3D] border border-[#E3EDE5]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Visual Card Header */}
            <div className="relative h-48 w-full bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF3] to-[#FAFCF9] border-b border-[#E3EDE5] flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div
                className="absolute w-28 h-28 rounded-full blur-2xl opacity-40 transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundColor: project.accentColor || "#159B50" }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-[#E3EDE5] flex items-center justify-center text-[#087A3D] group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="mt-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#075C32] px-2.5 py-0.5 rounded-full bg-white/90 border border-[#C4D9C8]">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#159B50]">
                  {project.tagline}
                </p>
                <p className="mt-3 text-sm text-[#65736D] leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="mt-4 pt-4 border-t border-[#E3EDE5] flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4FAF3] text-[#075C32] border border-[#E3EDE5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button to Open Detail Modal */}
              <div className="mt-6 pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveProjectOverride(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#087A3D] hover:text-[#075C32] transition-colors cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-[11px] text-[#A0AEA7] font-medium">Production Code</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Dialog */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E3EDE5] overflow-y-auto p-6 sm:p-10 my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProjectOverride(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F4FAF3] text-[#65736D] hover:text-[#101C19] hover:bg-[#E8F5E9] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-3">
                {selectedProject.category}
              </span>
              <h2 id="case-study-title" className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
                {selectedProject.title}
              </h2>
              <p className="mt-2 text-base font-semibold text-[#087A3D]">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Overview */}
            <div className="mt-6 pt-6 border-t border-[#E3EDE5]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#101C19] mb-2">
                Project Overview
              </h3>
              <p className="text-sm sm:text-base text-[#65736D] leading-relaxed">
                {selectedProject.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#FAFCF9] border border-[#E3EDE5]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                  The Technical Challenge
                </h4>
                <p className="text-xs sm:text-sm text-[#65736D] leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAF3] border border-[#C4D9C8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#075C32] mb-2">
                  Our Engineering Solution
                </h4>
                <p className="text-xs sm:text-sm text-[#101C19] leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#101C19] mb-3">
                Key Architectural Features
              </h3>
              <ul className="space-y-2.5">
                {selectedProject.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#65736D]">
                    <CheckCircle2 className="w-4 h-4 text-[#159B50] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div className="mt-6 pt-6 border-t border-[#E3EDE5]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#101C19] mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#FAFCF9] text-[#075C32] border border-[#C4D9C8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="mt-8 pt-6 border-t border-[#E3EDE5] flex flex-wrap items-center justify-between gap-4">
              <Button href="/contact" variant="primary" size="md" withArrow>
                Discuss a Similar Project
              </Button>
              <button
                type="button"
                onClick={() => setActiveProjectOverride(null)}
                className="text-xs font-semibold text-[#65736D] hover:text-[#101C19] cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
