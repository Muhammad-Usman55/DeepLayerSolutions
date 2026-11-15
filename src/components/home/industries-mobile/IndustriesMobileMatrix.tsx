"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  GraduationCap,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  Briefcase,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface SectorItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const SECTORS: SectorItem[] = [
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare",
    tag: "HIPAA & Clinical AI",
    icon: Activity,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-[#008F53]",
  },
  {
    id: "finance",
    slug: "finance-fintech",
    title: "FinTech",
    tag: "Risk & Fraud Engines",
    icon: BarChart3,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    id: "retail",
    slug: "retail-ecommerce",
    title: "E-Commerce",
    tag: "Headless Stores & POS",
    icon: ShoppingBag,
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    id: "logistics",
    slug: "logistics-transportation",
    title: "Logistics",
    tag: "Route AI & Fleet IoT",
    icon: Truck,
    iconBg: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Industry 4.0",
    tag: "Defect Vision & Edge",
    icon: Factory,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    id: "education",
    slug: "education-research",
    title: "EdTech",
    tag: "Academic AI & Telemetry",
    icon: GraduationCap,
    iconBg: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    id: "realestate",
    slug: "real-estate",
    title: "PropTech",
    tag: "3D Twins & Valuations",
    icon: Building2,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-700",
  },
  {
    id: "legal",
    slug: "professional-services",
    title: "Legal & Corp",
    tag: "Contract Intelligence",
    icon: Briefcase,
    iconBg: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
  },
];

export function IndustriesMobileMatrix() {
  return (
    <div className="w-full">
      {/* 1. Header with Minimal Punchy Copy */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[10px] font-bold text-[#008F53] uppercase tracking-wider mb-2">
          <span>✦ Vertical Sectors</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
          Domain <span className="text-[#008F53]">Expertise</span>
        </h2>
        <p className="text-xs text-[#64736F] mt-1 max-w-xs mx-auto">
          Tailored architectural blueprints for high-stakes industries.
        </p>
      </div>

      {/* 2. Interactive 2-Column Bento Matrix (No repetitive slider!) */}
      <div className="grid grid-cols-2 gap-2.5">
        {SECTORS.map((sector) => {
          const Icon = sector.icon;
          return (
            <Link
              key={sector.id}
              href={`/industries/${sector.slug}`}
              className="group relative flex flex-col justify-between h-[115px] p-3 rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53]/40 shadow-xs active:scale-97 transition-all overflow-hidden"
            >
              {/* Top Row: Icon Container + Small Chevron */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-xl ${sector.iconBg} ${sector.iconColor} border flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#A0AEA7] group-hover:text-[#008F53] group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Bottom: Title & Micro-Tag */}
              <div>
                <h3 className="text-xs font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-tight">
                  {sector.title}
                </h3>
                <p className="text-[10px] text-[#64736F] mt-0.5 font-medium truncate">
                  {sector.tag}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Bottom Link to All Industries */}
      <div className="text-center mt-4">
        <Link
          href="/industries"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008F53] hover:underline"
        >
          <span>View all 9 industry blueprints</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
