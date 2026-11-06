"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CarouselProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function CarouselProgress({
  current,
  total,
  className = "",
}: CarouselProgressProps) {
  const percentage = total > 1 ? ((current + 1) / total) * 100 : 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      className={cn("w-full h-1 bg-[#E3EDE5] rounded-full overflow-hidden", className)}
    >
      <div
        className="h-full bg-[#087A3D] transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
