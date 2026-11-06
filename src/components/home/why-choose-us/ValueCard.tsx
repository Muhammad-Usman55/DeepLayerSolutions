"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ValueCardItem } from "./types";

interface ValueCardProps {
  card: ValueCardItem;
  index: number;
}

export function ValueCard({ card, index }: ValueCardProps) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="w-full"
    >
      <Link
        href={card.href || "/services"}
        className="group relative flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-white/85 hover:bg-white/95 backdrop-blur-md border border-[#E3EDE5] hover:border-[#34D399]/60 shadow-[0_4px_20px_-4px_rgba(7,92,50,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(8,122,61,0.14)] transition-all duration-300 hover:-translate-y-1 select-none overflow-hidden"
        aria-label={`${card.title} - Learn more`}
      >
        {/* Subtle Top Specular Glass Reflection */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Left: Glass Bubble with Icon */}
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Glass Bubble Outer Ring */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#E8F5E9] via-white to-[#DDF5E9] border border-[#34D399]/40 shadow-xs flex items-center justify-center text-[#087A3D] group-hover:text-[#047F5B] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Bubble Specular Shine */}
            <div className="absolute top-1 left-2 w-3.5 h-2 rounded-full bg-white/80 blur-[0.5px] rotate-[-25deg] pointer-events-none" />
            <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:rotate-3 relative z-10" />
          </div>
        </div>

        {/* Center: Title */}
        <div className="flex-1 min-w-0 pr-1">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors leading-snug truncate">
            {card.title}
          </h3>
        </div>

        {/* Right: Circular Arrow Action Pill */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/70 text-[#087A3D] flex items-center justify-center transition-all duration-300 group-hover:bg-[#087A3D] group-hover:text-white group-hover:border-[#087A3D] group-hover:scale-105 shrink-0 shadow-2xs"
          aria-hidden="true"
        >
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
