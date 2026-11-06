import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children?: ReactNode;
  label?: string;
  icon?: ReactNode;
  variant?: "chip" | "pill" | "subtle";
  className?: string;
  theme?: "light" | "dark";
}

/**
 * Bespoke architectural section badge / eyebrow component.
 * Replaces generic AI-template pills with high-craft typography,
 * crisp micro-borders, and technical geometric indicators.
 */
export function Eyebrow({
  children,
  label,
  icon,
  variant = "chip",
  className,
  theme = "light",
}: EyebrowProps) {
  const content = children || label;
  const isDark = theme === "dark";

  if (variant === "subtle") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.16em] mb-3 select-none",
          isDark ? "text-[#34D399]" : "text-[#008F53]",
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#008F53] opacity-90" />
        <span>{content}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 select-none transition-all duration-200",
        variant === "pill" ? "rounded-full" : "rounded-md",
        isDark
          ? "bg-white/10 text-white border border-white/15 backdrop-blur-xs"
          : "bg-white text-[#008F53] border border-[#DFEDE5] shadow-[0_1px_3px_rgba(0,184,107,0.06)] hover:border-[#008F53]/40",
        className
      )}
    >
      {icon ? (
        icon
      ) : (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-[2px] shrink-0",
            isDark ? "bg-[#34D399]" : "bg-[#008F53]"
          )}
        />
      )}
      <span className="tracking-wider">{content}</span>
    </div>
  );
}

