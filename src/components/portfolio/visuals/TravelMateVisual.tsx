"use client";

import React from "react";
import { Plane, MapPin, Calendar, Compass, ShieldCheck, ArrowRight, DollarSign } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function TravelMateVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#062419] via-[#0B3524] to-[#041A12] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Subtle Route Lines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#159B50 1px, transparent 1px), radial-gradient(#087A3D 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      {/* Top HUD: Multi-Agent State Inspector */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#159B50]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-white">LANGGRAPH // MULTI-AGENT STATE</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#159B50]/30 border border-[#159B50]/40">SUPERVISOR: ACTIVE</span>
        </div>
      </div>

      {/* Main Center Area: Simulated Itinerary Timeline & Live Agent Nodes */}
      <div className="relative z-10 my-auto py-2 flex flex-col gap-2.5">
        {/* Step 1: Flight Node */}
        <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#072B1D]/80 border border-[#159B50]/40 backdrop-blur-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#159B50]/20 border border-[#159B50]/50 flex items-center justify-center text-[#34D399]">
              <Plane className="w-4 h-4 transform rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span>LHR → HND</span>
                <span className="text-[10px] text-[#A3E5B9] font-normal">ANA #NH212</span>
              </div>
              <p className="text-[10px] text-[#86D4A0]">09:30 AM · Non-stop · Verified API GDS</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#34D399]">$784.00</span>
            <div className="text-[9px] text-[#A3E5B9]">FARE LOCKED</div>
          </div>
        </div>

        {/* Dynamic Route Waypoints & Weather Constraint */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded-lg bg-[#072418]/60 border border-[#159B50]/30 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            <div className="truncate">
              <div className="text-white font-medium truncate">Shinjuku Gyoen</div>
              <div className="text-[#86D4A0] text-[9px]">Transit: 14m subway</div>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#072418]/60 border border-[#159B50]/30 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
            <div className="truncate">
              <div className="text-white font-medium truncate">Omotesando Tea</div>
              <div className="text-[#86D4A0] text-[9px]">Weather: Clear 19°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar: Schedule Validation Guaranteed */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#159B50]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
          <span>ZERO SCHEDULE CONFLICTS · 100% FEASIBLE</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-[#86D4A0] font-semibold">
          <span>BUDGET: $2,450 / $2,500</span>
        </div>
      </div>
    </div>
  );
}

