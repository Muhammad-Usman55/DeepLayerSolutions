"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Code2,
  Globe,
  ShoppingCart,
  Store,
  Workflow,
  Cloud,
  Database,
  Smartphone,
  Compass,
  SearchCheck,
} from "lucide-react";
import { PreviewService, VisualType } from "./types";

interface ServiceCardProps {
  service: PreviewService;
  index?: number;
}

function getServiceIcon(type: VisualType) {
  switch (type) {
    case "ai":
      return Brain;
    case "genai":
      return Sparkles;
    case "ecommerce":
      return ShoppingCart;
    case "erp":
      return Store;
    case "automation":
      return Workflow;
    case "software":
      return Code2;
    case "web":
      return Globe;
    case "cloud":
      return Cloud;
    case "data":
      return Database;
    case "mobile":
      return Smartphone;
    case "consulting":
      return Compass;
    case "seo":
      return SearchCheck;
    default:
      return Brain;
  }
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const iconComponent = getServiceIcon(service.visualType);

  return (
    <div className="h-full select-none service-card-item">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col h-full min-h-[208px] sm:min-h-0 rounded-xl sm:rounded-2xl lg:rounded-[24px] bg-white border border-[#DFEDE5] hover:border-[#87C9A4] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden p-3.5 sm:p-5 lg:p-6"
        aria-label={`Explore ${service.title}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="pt-1 font-mono text-[11px] sm:text-xs tracking-wide text-[#84918B]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="service-card-art flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D5EBDD] bg-[#F2F8F3] text-[#087A3D] transition-colors duration-200 group-hover:bg-[#E8F5E9]">
            {React.createElement(iconComponent, { className: "h-6 w-6 sm:h-7 sm:w-7", strokeWidth: 1.7 })}
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#142A27] group-hover:text-[#087A3D] transition-colors leading-snug line-clamp-2">
            {service.title}
          </h3>
          <p className="mt-1.5 text-[11px] sm:text-xs text-[#65736D] line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#E8EEE9] pt-3 sm:pt-4">
          <span className="text-xs font-semibold text-[#087A3D]">Learn more</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D5EBDD] text-[#087A3D] transition-all duration-200 group-hover:border-[#087A3D] group-hover:bg-[#087A3D] group-hover:text-white" aria-hidden="true">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
