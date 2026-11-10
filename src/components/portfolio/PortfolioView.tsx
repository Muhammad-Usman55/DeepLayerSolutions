"use client";

import React, { useState, useMemo } from "react";
import { ProjectCategory } from "@/types";
import { projectsData } from "@/data/projects";
import { PortfolioFilters } from "./PortfolioFilters";
import { ProjectCard } from "./ProjectCard";
import { Layers } from "lucide-react";

export function PortfolioView() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;

    return projectsData.filter((p) => {
      if (p.category === activeCategory) return true;
      // Allow secondary category matching (e.g. Plant Doctor is also Mobile, TravelMate is also Web Apps)
      if (activeCategory === "Mobile" && p.slug === "plant-doctor") return true;
      if (activeCategory === "Web Apps" && (p.slug === "travelmate-ai" || p.slug === "enterprise-rag-assistant" || p.slug === "smart-course-qa")) return true;
      if (activeCategory === "Automation" && (p.slug === "auto-labeling" || p.slug === "voice-agent")) return true;
      if (activeCategory === "AI & ML" && (p.slug === "plant-doctor" || p.slug === "visionsense-video-analytics" || p.slug === "gender-detection" || p.slug === "enterprise-rag-assistant" || p.slug === "smart-course-qa" || p.slug === "travelmate-ai")) return true;
      if (activeCategory === "Data Science" && p.slug === "finsecure-ml") return true;
      return false;
    });
  }, [activeCategory]);

  return (
    <div className="relative space-y-8">
      {/* Background Fluid Wave Curves & Floating Sphere in Bottom Right (matching reference image) */}
      <svg
        className="absolute -bottom-10 -right-20 w-[600px] h-[400px] pointer-events-none opacity-40 overflow-visible"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 380 C200 380 400 300 600 150"
          stroke="#C4E7D0"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M100 400 C280 400 450 340 600 240"
          stroke="#D8F3E2"
          strokeWidth="2.2"
          fill="none"
        />
      </svg>

      {/* Floating Glass Sphere on Bottom Right Wave (as in reference image) */}
      <div
        className="absolute bottom-16 right-24 sm:right-32 w-7 h-7 rounded-full bg-gradient-to-tr from-[#008F53] to-[#00B86B] opacity-75 shadow-lg pointer-events-none hidden md:block"
        style={{ filter: "drop-shadow(0 0 12px rgba(0,184,107,0.5))" }}
      />

      {/* Category Filter Pills Bar */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <PortfolioFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Projects Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-white border border-[#DFEDE5]">
          <Layers className="w-10 h-10 text-[#64736F] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#142A27]">No projects found</h3>
          <p className="mt-1 text-sm text-[#64736F]">
            No projects currently match the selected filter category.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-[#008F53] text-white hover:bg-[#007343] transition-colors cursor-pointer"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
