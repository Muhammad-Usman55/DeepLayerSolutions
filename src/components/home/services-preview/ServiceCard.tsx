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
  const Icon = getServiceIcon(service.visualType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col justify-between h-full rounded-2xl bg-white/95 hover:bg-white backdrop-blur-xs border border-[#DFEDE5] hover:border-[#008F53]/50 shadow-xs hover:shadow-xl hover:shadow-[#008F53]/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
        aria-label={`Explore ${service.title}`}
      >
        {/* Subtle Top Gradient Glass Accent on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#075B3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Mobile View: Clean Centered Card with Icon & Category (lg:hidden) */}
        <div className="flex flex-col items-center text-center p-3.5 sm:p-4 lg:hidden">
          <div className="w-10 h-10 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center mb-2 shadow-2xs group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#008F53] font-semibold mb-0.5">
            {service.category}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug line-clamp-2">
            {service.title}
          </h3>
        </div>

        {/* Desktop View: Full 3D Illustration & Interactive Details (hidden lg:flex) */}
        <div className="hidden lg:flex flex-col justify-between h-full p-5 xl:p-6">
          {/* Card Top: 3D Illustration */}
          <div className="w-full flex flex-col items-center justify-center pt-1 pb-3">
            <Card3DVisual type={service.visualType} />
          </div>

          {/* Card Bottom: Service Name, Description & Circular Arrow Button */}
          <div className="pt-3.5 border-t border-[#DFEDE5]/60 flex flex-col justify-between mt-auto gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-semibold truncate">
                  {service.category}
                </span>
                <h3 className="text-base xl:text-[17px] font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug line-clamp-2 mt-0.5">
                  {service.title}
                </h3>
              </div>

              {/* Circular Arrow Button */}
              <div
                className="w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white group-hover:border-[#087A3D] flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-105 mt-1"
                aria-hidden="true"
              >
                <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>

            <p className="text-xs text-[#64736F] line-clamp-2 font-normal leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
