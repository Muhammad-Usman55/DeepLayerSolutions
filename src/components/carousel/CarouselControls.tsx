"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CarouselControls({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className = "",
  size = "md",
}: CarouselControlsProps) {
  const sizeClasses = {
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-13 h-13 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous slide"
        className={cn(
          "rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer select-none",
          sizeClasses[size],
          canPrev
            ? "bg-white text-[#142A27] border-[#DFEDE5] hover:border-[#008F53] hover:text-[#008F53] hover:bg-[#E9FFF2]/60 shadow-xs active:scale-95"
            : "bg-[#FAFCF9] text-[#A0AEA7] border-[#DFEDE5]/60 cursor-not-allowed opacity-50"
        )}
      >
        <ArrowLeft className={iconSizes[size]} />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next slide"
        className={cn(
          "rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer select-none",
          sizeClasses[size],
          canNext
            ? "bg-[#008F53] text-white border-[#008F53] hover:bg-[#007343] shadow-sm hover:shadow-md active:scale-95"
            : "bg-[#FAFCF9] text-[#A0AEA7] border-[#DFEDE5]/60 cursor-not-allowed opacity-50"
        )}
      >
        <ArrowRight className={iconSizes[size]} />
      </button>
    </div>
  );
}

