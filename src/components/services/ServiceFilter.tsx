"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Sparkles, Code2, Globe, Database, Cloud, Smartphone, Compass, SearchCheck } from "lucide-react";
import { servicesData } from "@/data/services";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Sparkles,
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Compass,
  SearchCheck,
};

const categories = [
  "All",
  "Intelligent Systems",
  "Next-Gen AI",
  "Core Engineering",
  "Digital Platforms",
  "Search & Visibility",
  "Infrastructure",
  "Mobile Platforms",
  "Strategic Advisory",
];

export function ServiceFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={cn(
              "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer",
              activeCategory === cat
                ? "bg-[#008F53] text-white shadow-sm"
                : "bg-white text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] border border-[#DFEDE5]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.iconName] || Brain;
          return (
            <div
              key={service.id}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs hover:shadow-xl hover:border-[#008F53]/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-[#64736F] leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Capabilities List */}
                <div className="mt-6 pt-5 border-t border-[#DFEDE5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#142A27] block mb-2.5">
                    Key Capabilities:
                  </span>
                  <ul className="space-y-1.5">
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap} className="text-xs text-[#64736F] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-[#DFEDE5] flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#008F53] group-hover:text-[#007343] transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center gap-1 text-[11px] text-[#64736F] font-mono">
                  <span>{service.techStack.length}+ Technologies</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
