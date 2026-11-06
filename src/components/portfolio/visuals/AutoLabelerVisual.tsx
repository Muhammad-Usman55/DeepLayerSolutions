"use client";

import React from "react";
import { MousePointerClick, Film, Scissors, Layers, CheckCircle2, Sliders } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function AutoLabelerVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#052317] via-[#093523] to-[#031810] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Pixel Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(21, 155, 80, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 155, 80, 0.25) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top HUD: SAM2 Viewport Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#159B50]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">META SAM2 // WEBGL VIEWPORT</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#159B50]/30 border border-[#159B50]/40">MASK TIME: 42ms</span>
        </div>
      </div>

      {/* Center Canvas Viewport: Interactive Polygon Spline */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[16/10] rounded-xl border border-[#159B50]/40 bg-[#062418]/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-hidden">
          {/* Simulated Segmented Polygon with Pulsing Glow */}
          <div className="relative w-40 h-24 rounded-2xl bg-[#159B50]/25 border-2 border-dashed border-[#22C55E] flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            {/* Positive Prompt Anchor Point (+) */}
            <div className="absolute top-4 left-6 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#22C55E] text-black text-[9px] font-bold shadow-md">
              <span>+</span>
              <span>FOREGROUND</span>
            </div>

            {/* Negative Prompt Anchor Point (-) */}
            <div className="absolute bottom-3 right-5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#EF4444] text-white text-[9px] font-bold shadow-md">
              <span>-</span>
              <span>BACKGROUND</span>
            </div>

            {/* Central Mask Label */}
            <div className="text-[10px] font-bold text-white bg-[#0A3D28]/90 px-2 py-1 rounded border border-[#159B50]/50">
              VEHICLE_POLYGON [99.1%]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Video Propagation & Export Status */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#159B50]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <Film className="w-3.5 h-3.5 text-[#34D399]" />
          <span>PROPAGATED ACROSS 150 FRAMES</span>
        </div>
        <div className="text-[9px] text-[#86D4A0] px-2 py-0.5 rounded bg-[#159B50]/20 font-bold border border-[#159B50]/30">
          YOLOv8-SEG READY
        </div>
      </div>
    </div>
  );
}

