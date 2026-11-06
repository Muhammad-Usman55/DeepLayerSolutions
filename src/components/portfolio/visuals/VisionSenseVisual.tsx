"use client";

import React from "react";
import { Eye, Shield, Cpu, Activity, User, Clock } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function VisionSenseVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#052116] via-[#093523] to-[#03170F] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* CCTV Reticle & Crosshair Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top CCTV Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#10B981]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
          <span className="font-semibold tracking-wider text-white">CAM_04 // RETAIL_AISLE_WEST</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/40">
            TENSORRT: 48.2 FPS
          </span>
          <span>GPU: 34°C</span>
        </div>
      </div>

      {/* Center CCTV Viewfinder Simulation */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[16/10] rounded-xl border border-[#10B981]/40 bg-[#062418]/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-hidden">
          {/* Target Bounding Box 1 */}
          <div className="absolute top-3 left-4 sm:left-6 w-28 p-1.5 rounded border border-[#10B981] bg-[#10B981]/15 text-[9px] shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <div className="flex items-center justify-between font-bold text-white mb-0.5">
              <span>TRACK_#104</span>
              <span className="text-[#34D399]">98%</span>
            </div>
            <div className="text-[8px] text-[#A3E5B9] space-y-0.5">
              <div className="flex items-center justify-between">
                <span>AGE:</span>
                <span className="font-semibold text-white">25-34</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GENDER:</span>
                <span className="font-semibold text-white">FEMALE [0.94]</span>
              </div>
            </div>
          </div>

          {/* Target Bounding Box 2 */}
          <div className="absolute bottom-3 right-4 sm:right-6 w-32 p-1.5 rounded border border-[#34D399] bg-[#34D399]/15 text-[9px] shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <div className="flex items-center justify-between font-bold text-white mb-0.5">
              <span>TRACK_#105</span>
              <span className="text-[#34D399]">96%</span>
            </div>
            <div className="text-[8px] text-[#A3E5B9] space-y-0.5">
              <div className="flex items-center justify-between">
                <span>AGE:</span>
                <span className="font-semibold text-white">35-44</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DWELL TIME:</span>
                <span className="font-semibold text-white">4m 12s</span>
              </div>
            </div>
          </div>

          {/* Central Silhouette Icons */}
          <div className="flex items-center gap-6 opacity-30">
            <User className="w-12 h-12 text-[#10B981]" />
            <User className="w-14 h-14 text-[#34D399]" />
          </div>
        </div>
      </div>

      {/* Bottom Privacy Assurance */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#10B981]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <Shield className="w-3.5 h-3.5 text-[#34D399]" />
          <span>ZERO FACIAL TEMPLATES STORED · 100% GDPR</span>
        </div>
        <div className="text-[9px] text-[#86D4A0] px-2 py-0.5 rounded bg-[#10B981]/20 font-bold border border-[#10B981]/30">
          MQTT TELEMETRY
        </div>
      </div>
    </div>
  );
}
