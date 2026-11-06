"use client";

import React from "react";
import { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

interface PortfolioFiltersProps {
  categories: { id: ProjectCategory; label: string; count: number }[];
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export function PortfolioFilters({
  categories,
  activeCategory,
  onSelectCategory,
}: PortfolioFiltersProps) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 border select-none",
              isActive
                ? "bg-[#087A3D] text-white border-[#087A3D] shadow-sm"
                : "bg-white text-[#101C19] border-[#E3EDE5] hover:border-[#159B50]/60 hover:bg-[#F4FAF3] hover:text-[#087A3D]"
            )}
            aria-pressed={isActive}
          >
            <span>{cat.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-mono transition-colors",
                isActive
                  ? "bg-white/20 text-white font-bold"
                  : "bg-[#F4FAF3] text-[#65736D] group-hover:bg-[#E8F5E9] group-hover:text-[#075C32]"
              )}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
