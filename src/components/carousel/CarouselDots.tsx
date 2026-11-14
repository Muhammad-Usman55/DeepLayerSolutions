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
            data-carousel-dot
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            aria-label={`Go to slide ${idx + 1} of ${total}`}
            onClick={() => onSelect(idx)}
            className="h-6 flex items-center justify-center cursor-pointer p-1 focus:outline-none"
            style={{ minHeight: "unset", minWidth: "unset" }}
          >
            <span
              className="block transition-all duration-300 rounded-full"
              style={{
                width: isActive ? "22px" : "6px",
                height: "6px",
                backgroundColor: isActive ? "#008F53" : "#DFEDE5",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

