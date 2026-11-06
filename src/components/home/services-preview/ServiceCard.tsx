"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PreviewService } from "./types";
import { Card3DVisual } from "./Card3DVisual";

interface ServiceCardProps {
  service: PreviewService;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xs border border-[#DFEDE5] hover:border-[#008F53]/45 shadow-xs hover:shadow-xl hover:shadow-[#008F53]/12 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
        aria-label={`Explore ${service.title}`}
      >
        {/* Subtle Top Gradient Glass Accent on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#075B3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Top: 3D Illustration */}
        <div className="w-full flex flex-col items-center justify-center pt-2 pb-4">
          <Card3DVisual type={service.visualType} />
        </div>

        {/* Card Bottom: Service Name & Circular Arrow Button */}
        <div className="pt-4 border-t border-[#DFEDE5]/60 flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-semibold">
              {service.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug line-clamp-2">
              {service.title}
            </h3>
          </div>

          {/* Circular Arrow Button */}
          <div
            className="w-9 h-9 rounded-full bg-[#E9FFF2] border border-[#DFEDE5] text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white group-hover:border-[#008F53] flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-105"
            aria-hidden="true"
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

