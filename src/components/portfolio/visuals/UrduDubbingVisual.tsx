"use client";

import React from "react";
import { Sliders, Languages, Mic2, Volume2, ShieldCheck, Film } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function UrduDubbingVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#052216] via-[#093523] to-[#03170F] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Audio Stem Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5, 150, 105, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 150, 105, 0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top HUD: Demucs Stem Separation */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#059669]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">DEMUCS v4 // 4-STEM ISOLATION</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#059669]/30 border border-[#10B981]/40">XTTS-v2 CLONER</span>
        </div>
      </div>

      {/* Center Audio Timeline & Translation Match */}
      <div className="relative z-10 my-auto py-2 flex flex-col gap-2">
        {/* Source Track: English Stem */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#072418]/80 border border-[#059669]/30 text-[10px]">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="text-[#A3E5B9]">EN VOCALS [SRC]:</span>
            <span className="text-white font-medium">&quot;Welcome to modern deep learning...&quot;</span>
          </div>
          <span className="text-[9px] text-[#86D4A0] font-bold">00:03.4s</span>
        </div>

        {/* Target Track: Cloned Urdu Dialogue */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#072B1D]/90 border border-[#10B981]/40 text-[10px]">
          <div className="flex items-center gap-2">
            <Languages className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-[#34D399]">UR CLONED [TGT]:</span>
            <span className="text-white font-serif font-bold text-xs" dir="rtl">
              جدید ڈیپ لرننگ میں خوش آمدید...
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10B981]/30 text-[#86D4A0] font-bold border border-[#10B981]/40">
            00:03.5s
          </span>
        </div>
      </div>

      {/* Bottom Lip-Sync & Foley Preservation */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#059669]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <Mic2 className="w-3.5 h-3.5 text-[#34D399]" />
          <span>ORIGINAL TIMBRE & BACKGROUND MUSIC PRESERVED</span>
        </div>
        <div className="text-[9px] text-[#86D4A0] font-bold">
          94.8% SYLLABLE CADENCE
        </div>
      </div>
    </div>
  );
}
