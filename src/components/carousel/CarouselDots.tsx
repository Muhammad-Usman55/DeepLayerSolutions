"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function CarouselDots({
  total,
  current,
  onSelect,
  className = "",
}: CarouselDotsProps) {
  if (total <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Carousel slide pagination"
      className={cn("inline-flex items-center gap-2", className)}
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${idx + 1} of ${total}`}
            onClick={() => onSelect(idx)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              isActive
                ? "w-8 bg-[#008F53]"
                : "w-2 bg-[#DFEDE5] hover:bg-[#008F53]/60"
            )}
          />
        );
      })}
    </div>
  );
}

