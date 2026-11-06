"use client";

import React from "react";
import { ProjectCategory } from "@/types";
import { LayoutGrid, Cpu, Globe, Smartphone, Database, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterItem {
  id: ProjectCategory;
  label: string;
}

const filterTabs: FilterItem[] = [
  { id: "All", label: "All" },
  { id: "AI & ML", label: "AI & ML" },
  { id: "Web Apps", label: "Web Apps" },
  { id: "Mobile", label: "Mobile" },
  { id: "Data Science", label: "Data Science" },
  { id: "Automation", label: "Automation" },
];

function getCategoryIcon(id: ProjectCategory, isActive: boolean) {
  const iconClass = cn("w-4 h-4 transition-colors", isActive ? "text-white" : "text-[#159B50]");

  switch (id) {
    case "All":
      return <LayoutGrid className={iconClass} />;
    case "AI & ML":
      return <Cpu className={iconClass} />;
    case "Web Apps":
      return <Globe className={iconClass} />;
    case "Mobile":
      return <Smartphone className={iconClass} />;
    case "Data Science":
      return <Database className={iconClass} />;
    case "Automation":
      return <Cog className={iconClass} />;
    default:
      return <LayoutGrid className={iconClass} />;
  }
}

interface PortfolioFiltersProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export function PortfolioFilters({
  activeCategory,
  onSelectCategory,
}: PortfolioFiltersProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
      {filterTabs.map((tab) => {
        const isActive = activeCategory === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className={cn(
              "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 border select-none shadow-2xs",
              isActive
                ? "bg-[#087A3D] text-white border-[#087A3D] shadow-sm"
                : "bg-white text-[#101C19] border-[#E3EDE5] hover:border-[#159B50]/60 hover:bg-[#F4FAF3] hover:text-[#087A3D]"
            )}
            aria-pressed={isActive}
          >
            {getCategoryIcon(tab.id, isActive)}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
