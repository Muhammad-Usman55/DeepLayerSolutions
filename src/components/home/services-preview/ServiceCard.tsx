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
import { motion } from "framer-motion";
import { PreviewService, VisualType } from "./types";
import { Card3DVisual } from "./Card3DVisual";

interface ServiceCardProps {
  service: PreviewService;
  index: number;
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

export function ServiceCard({ service, index }: ServiceCardProps) {
  const iconComponent = getServiceIcon(service.visualType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: "easeOut" }}
      className="h-full select-none"
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-[24px] bg-white/95 hover:bg-white backdrop-blur-xs border border-[#DFEDE5] hover:border-[#008F53]/50 shadow-xs hover:shadow-xl hover:shadow-[#008F53]/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden p-5 sm:p-6"
        aria-label={`Explore ${service.title}`}
      >
        {/* Subtle Top Gradient Glass Accent on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#075B3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Header: Category Tag & Icon Badge */}
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold bg-[#E9FFF2] px-2.5 py-1 rounded-full border border-[#BCE8CF]/60">
            {service.category}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300">
            {React.createElement(iconComponent, { className: "w-4 h-4" })}
          </div>
        </div>

        {/* Card Center: 3D Illustration */}
        <div className="w-full flex flex-col items-center justify-center py-2 sm:py-3 transition-transform duration-500 ease-out group-hover:scale-105">
          <Card3DVisual type={service.visualType} />
        </div>

        {/* Card Bottom: Service Name, Description & Circular Arrow Button */}
        <div className="pt-3 border-t border-[#DFEDE5]/60 flex flex-col justify-between mt-auto gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug line-clamp-2">
              {service.title}
            </h3>

            {/* Circular Arrow Button */}
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white group-hover:border-[#008F53] flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-105 mt-0.5"
              aria-hidden="true"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>

          <p className="text-xs text-[#64736F] line-clamp-2 font-normal leading-relaxed">
            {service.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
