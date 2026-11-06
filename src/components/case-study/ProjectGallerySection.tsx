"use client";

import React, { useState } from "react";
import { Container } from "../common/Container";
import { CaseStudyProject, GalleryScreenItem } from "@/types";
import { Sparkles, Eye, Monitor } from "lucide-react";
import { ProjectVisualDispatcher } from "../portfolio/visuals/ProjectVisualDispatcher";
import { cn } from "@/lib/utils";

interface Props {
  project: CaseStudyProject;
}

export function ProjectGallerySection({ project }: Props) {
  const { galleryScreens } = project;
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  if (!galleryScreens || galleryScreens.length === 0) return null;

  const currentScreen = galleryScreens[activeScreenIndex];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
            <Monitor className="w-3.5 h-3.5 text-[#159B50]" />
            <span>INSIDE THE PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
            Visual Product Architecture
          </h2>
          <p className="mt-3 text-base text-[#65736D]">
            Key interface views and operational dashboards engineered for {project.title}.
          </p>
        </div>

        {/* Screen Selection Tabs */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 no-scrollbar mb-8">
          {galleryScreens.map((screen, idx) => (
            <button
              key={screen.id}
              type="button"
              onClick={() => setActiveScreenIndex(idx)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer border whitespace-nowrap",
                activeScreenIndex === idx
                  ? "bg-[#087A3D] text-white border-[#087A3D] shadow-sm"
                  : "bg-[#FAFCF9] text-[#101C19] border-[#E3EDE5] hover:bg-[#F4FAF3] hover:text-[#087A3D]"
              )}
            >
              <span>{`0${idx + 1}. ${screen.title}`}</span>
            </button>
          ))}
        </div>

        {/* Active Screen Display Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-[#E3EDE5] overflow-hidden shadow-xl bg-[#062418]">
          <div className="h-72 sm:h-96 md:h-[440px] w-full">
            <ProjectVisualDispatcher
              visualType={currentScreen.visualType}
              mode="gallery"
            />
          </div>

          {/* Caption Box */}
          <div className="p-5 sm:p-6 bg-white border-t border-[#E3EDE5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#101C19]">
                {currentScreen.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#65736D] mt-1 leading-relaxed">
                {currentScreen.caption}
              </p>
            </div>
            <div className="shrink-0 text-xs font-mono font-semibold text-[#087A3D] px-3 py-1 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]">
              SCREEN 0{activeScreenIndex + 1} OF {galleryScreens.length}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
