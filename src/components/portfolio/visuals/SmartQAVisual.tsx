"use client";

import React from "react";
import { FileText, Search, BookmarkCheck, CheckCircle2, Layers, Binary } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function SmartQAVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#052115] via-[#093522] to-[#03170F] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Academic Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7, 92, 50, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(7, 92, 50, 0.3) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Top HUD: RAG Retrieval Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#075C32]/40 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">RAG ENGINE // GEMINI 1.5 PRO + QDRANT</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#075C32]/40 border border-[#159B50]/40">COSINE: 0.942</span>
        </div>
      </div>

      {/* Center Split Screen: Math Equation & Slide Reference */}
      <div className="relative z-10 my-auto py-2 flex flex-col gap-2">
        {/* Cited Slide Badge */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#072B1D]/80 border border-[#159B50]/40 text-[10px]">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="font-bold">CS229_LECTURE_07.PDF</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#159B50]/30 text-[#86D4A0] font-semibold border border-[#159B50]/50">
            SLIDE 24 OF 86
          </span>
        </div>

        {/* KaTeX Math Formula Preview Box */}
        <div className="p-2.5 rounded-lg bg-[#062418]/90 border border-[#10B981]/30 backdrop-blur-xs">
          <div className="text-[9px] text-[#A3E5B9] mb-1 font-sans font-semibold flex items-center gap-1">
            <Binary className="w-3 h-3 text-[#34D399]" />
            <span>Policy Gradient Theorem:</span>
          </div>
          <div className="text-center font-serif text-xs sm:text-sm text-[#D1FAE5] py-1 bg-[#041D13] rounded border border-[#159B50]/30 tracking-wide">
            ∇<sub>θ</sub> J(θ) = E<sub>π</sub> [ ∇<sub>θ</sub> log π<sub>θ</sub>(a|s) · Q<sup>π</sup>(s,a) ]
          </div>
        </div>
      </div>

      {/* Bottom Citation Precision */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#075C32]/40 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <BookmarkCheck className="w-3.5 h-3.5 text-[#34D399]" />
          <span>EXACT PARAGRAPH BOUNDING BOX HIGHLIGHTED</span>
        </div>
        <div className="text-[9px] text-[#86D4A0] font-bold">
          99.2% CITATION ACCURACY
        </div>
      </div>
    </div>
  );
}
