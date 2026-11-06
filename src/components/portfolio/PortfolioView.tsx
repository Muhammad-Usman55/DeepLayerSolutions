"use client";

import React, { useState, useMemo } from "react";
import { ProjectCategory, CaseStudyProject } from "@/types";
import { projectsData } from "@/data/projects";
import { PortfolioFilters } from "./PortfolioFilters";
import { ProjectCard } from "./ProjectCard";
import { Layers } from "lucide-react";

export function PortfolioView() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const categories = useMemo(() => {
    const list: { id: ProjectCategory; label: string; count: number }[] = [
      { id: "All", label: "All Projects", count: projectsData.length },
      {
        id: "AI & ML",
        label: "AI & ML",
        count: projectsData.filter((p) => p.category === "AI & ML").length,
      },
      {
        id: "Computer Vision",
        label: "Computer Vision",
        count: projectsData.filter((p) => p.category === "Computer Vision").length,
      },
      {
        id: "Voice & Conversational AI",
        label: "Voice & Conversational AI",
        count: projectsData.filter((p) => p.category === "Voice & Conversational AI").length,
      },
      {
        id: "Automation",
        label: "Automation",
        count: projectsData.filter((p) => p.category === "Automation").length,
      },
    ];
    return list;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3EDE5]">
        <PortfolioFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <div className="text-xs font-mono text-[#65736D] self-end sm:self-center shrink-0">
          Showing <span className="font-bold text-[#101C19]">{filteredProjects.length}</span> of {projectsData.length} projects
        </div>
      </div>

      {/* Projects Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-[#FAFCF9] border border-[#E3EDE5]">
          <Layers className="w-10 h-10 text-[#65736D] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#101C19]">No projects found</h3>
          <p className="mt-1 text-sm text-[#65736D]">
            No projects currently match the selected filter category.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-[#087A3D] text-white hover:bg-[#075C32] transition-colors cursor-pointer"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
