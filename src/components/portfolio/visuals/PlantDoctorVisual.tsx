"use client";

import React from "react";
import { Leaf, Scan, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function PlantDoctorVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#062619] via-[#0A3D28] to-[#041D13] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Grid & Scanlines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(21, 155, 80, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 155, 80, 0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#159B50]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-white">EDGE-INFERENCE // INT8</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#86D4A0]">
          <span>FPS: 58.4</span>
          <span className="text-[#159B50]">|</span>
          <span>LATENCY: 54ms</span>
        </div>
      </div>

      {/* Center Viewport: Leaf Scan Frame */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[16/10] rounded-xl border border-[#159B50]/40 bg-[#072418]/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-hidden">
          {/* Viewfinder Corner Brackets */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#159B50]" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#159B50]" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#159B50]" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#159B50]" />

          {/* Animated Scanning Laser Line */}
          <div
            className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent shadow-[0_0_12px_#22C55E]"
            style={{
              animation: "laserScan 3.5s ease-in-out infinite alternate",
            }}
          />

          {/* Stylized Leaf Silhouette Vector with Lesion Detection Box */}
          <div className="relative flex items-center justify-center">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 text-[#159B50]/80 drop-shadow-[0_0_15px_rgba(21,155,80,0.4)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            {/* Target Bounding Box over Pathological Lesion */}
            <div className="absolute -top-1 right-2 sm:right-3 px-2 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444] text-[9px] text-[#FCA5A5] flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-[#EF4444]" />
              <span>Early Blight [0.964]</span>
            </div>
          </div>

          {/* Subtle Crop Type Badge */}
          <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[9px] text-[#A3E5B9] bg-[#0A3D28]/80 px-2 py-0.5 rounded border border-[#159B50]/40">
            <Leaf className="w-3 h-3 text-[#22C55E]" />
            <span>SOLANUM LYCOPERSICUM (TOMATO)</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Prescriptions */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#159B50]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="truncate">TREATMENT: Copper Hydroxide 2.5g/L</span>
        </div>
        <div className="shrink-0 px-2 py-0.5 rounded bg-[#159B50]/30 text-[#86D4A0] border border-[#159B50]/50 font-bold">
          OFFLINE READY
        </div>
      </div>

      <style jsx>{`
        @keyframes laserScan {
          0% {
            top: 15%;
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 80%;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
