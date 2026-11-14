"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Cpu, Brain } from "lucide-react";

export function MobileHeroView() {
  const [activeMode, setActiveMode] = useState<"ai" | "core">("ai");

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100svh-90px)] py-3 px-3 text-center select-none relative overflow-visible">
      {/* Self-contained Hardware-Accelerated Animations */}
      <style>{`
        @keyframes dl-orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dl-orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes dl-core-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .dl-orbit-1 {
          transform-box: fill-box;
          transform-origin: center;
          animation: dl-orbit-cw 32s linear infinite;
        }
        .dl-orbit-2 {
          transform-box: fill-box;
          transform-origin: center;
          animation: dl-orbit-ccw 26s linear infinite;
        }
        .dl-core-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: dl-core-pulse 3.8s ease-in-out infinite;
        }
      `}</style>

      {/* Soft Ambient Volumetric Lighting (GPU cached) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-[#008F53]/20 via-[#34D399]/25 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      {/* --------------------------------------------------------------------
         1. 3D LUMINOUS GLASS NEURAL SPHERE & SPATIAL METRIC PILLS
         -------------------------------------------------------------------- */}
      <div className="relative w-full max-w-[310px] aspect-square flex items-center justify-center my-auto overflow-visible">
        {/* Ambient Core Radial Glow */}
        <div className="absolute inset-6 rounded-full bg-radial from-[#34D399]/30 via-[#008F53]/15 to-transparent blur-xl pointer-events-none" />

        {/* 3D Glass Neural Sphere SVG */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full relative z-10 drop-shadow-[0_12px_28px_rgba(0,143,83,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Glass Shell Gradients */}
            <radialGradient id="sphereGlass" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#E9FFF2" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#BCE8CF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#008F53" stopOpacity="0.55" />
            </radialGradient>

            <linearGradient id="glassRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#008F53" stopOpacity="0.4" />
            </linearGradient>

            {/* Glowing Internal Neural Nucleus */}
            <radialGradient id="neuralCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#6EE7B7" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00B86B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#075C32" stopOpacity="0" />
            </radialGradient>

            {/* Orbital Ring Gradients */}
            <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#008F53" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="ringGrad2" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#008F53" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
            </linearGradient>

            <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cast Ground Caustic Shadow */}
          <ellipse cx="160" cy="275" rx="90" ry="16" fill="#075C32" fillOpacity="0.12" />

          {/* Outer Orbital Filament Ring 1 (Tilted -25deg with rotation) */}
          <g className="dl-orbit-1">
            <ellipse
              cx="160"
              cy="160"
              rx="135"
              ry="48"
              stroke="url(#ringGrad1)"
              strokeWidth="2.2"
              strokeDasharray="12 4 4 4"
              transform="rotate(-25 160 160)"
            />
            {/* Orbital Satellite Node */}
            <circle cx="270" cy="115" r="4.5" fill="#34D399" />
            <circle cx="270" cy="115" r="7" stroke="#34D399" strokeOpacity="0.4" strokeWidth="1" />
          </g>

          {/* Outer Orbital Filament Ring 2 (Tilted +35deg with counter-rotation) */}
          <g className="dl-orbit-2">
            <ellipse
              cx="160"
              cy="160"
              rx="125"
              ry="42"
              stroke="url(#ringGrad2)"
              strokeWidth="1.8"
              transform="rotate(35 160 160)"
            />
          </g>

          {/* Outer Translucent Glass Sphere */}
          <circle
            cx="160"
            cy="160"
            r="82"
            fill="url(#sphereGlass)"
            stroke="url(#glassRim)"
            strokeWidth="2"
          />

          {/* Internal Volumetric Glowing Core */}
          <g className="dl-core-pulse">
            <circle
              cx="160"
              cy="160"
              r="46"
              fill="url(#neuralCore)"
              filter="url(#coreGlow)"
            />

            {/* Internal Synaptic Neural Lattice & Light Beams */}
            <g stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85">
              <line x1="160" y1="160" x2="135" y2="135" />
              <line x1="160" y1="160" x2="185" y2="135" />
              <line x1="160" y1="160" x2="135" y2="185" />
              <line x1="160" y1="160" x2="185" y2="185" />
              <line x1="160" y1="130" x2="160" y2="190" />
              <line x1="130" y1="160" x2="190" y2="160" />
            </g>

            {/* Synaptic Nodes */}
            <circle cx="160" cy="160" r="8" fill="#FFFFFF" />
            <circle cx="135" cy="135" r="4" fill="#E9FFF2" />
            <circle cx="185" cy="135" r="4" fill="#E9FFF2" />
            <circle cx="135" cy="185" r="4" fill="#E9FFF2" />
            <circle cx="185" cy="185" r="4" fill="#E9FFF2" />
          </g>

          {/* Glass Lens Light Reflection Highlight Arc */}
          <path
            d="M105,125 A70,70 0 0,1 190,95"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </svg>

        {/* Floating Spatial Metric Pill: Left */}
        <div
          className="absolute left-0 top-1/3 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-[#DFEDE5] shadow-[0_6px_18px_rgba(0,143,83,0.12)] transition-all duration-300"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] shrink-0 animate-pulse" />
          <span className="text-[11px] font-bold text-[#142A27] tracking-tight whitespace-nowrap">
            {activeMode === "ai" ? "99.8% Accuracy" : "Sub-450ms"}
          </span>
        </div>

        {/* Floating Spatial Metric Pill: Right */}
        <div
          className="absolute right-0 bottom-1/3 translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-[#DFEDE5] shadow-[0_6px_18px_rgba(0,143,83,0.12)] transition-all duration-300"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <Sparkles className="w-3 h-3 text-[#008F53] shrink-0" />
          <span className="text-[11px] font-bold text-[#142A27] tracking-tight whitespace-nowrap">
            {activeMode === "ai" ? "Autonomous Agents" : "Enterprise Core"}
          </span>
        </div>
      </div>

      {/* --------------------------------------------------------------------
         2. MINIMALIST HIGH-CRAFT HEADLINE & CRISP SUBTEXT
         -------------------------------------------------------------------- */}
      <div className="mt-2 mb-3.5 w-full max-w-sm px-2">
        <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-[#142A27] leading-[1.14]">
          Architecting{" "}
          <span className="text-[#008F53] relative inline-block">
            Intelligent Systems
            <svg
              className="absolute -bottom-1 left-0 w-full h-2 text-[#34D399]/40 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0,7 Q50,0 100,7" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="mt-1.5 text-xs text-[#64736F] font-normal leading-relaxed max-w-[280px] mx-auto">
          Enterprise AI &amp; High-Throughput Digital Engines
        </p>
      </div>

      {/* --------------------------------------------------------------------
         3. PRIMARY LUMINOUS ACTION CTA
         -------------------------------------------------------------------- */}
      <div className="mb-4 w-full flex justify-center">
        <Link
          href="/services"
          className="group inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#008F53] via-[#00A35E] to-[#008F53] text-white font-semibold text-sm shadow-[0_6px_22px_rgba(0,143,83,0.32)] hover:shadow-[0_8px_28px_rgba(0,143,83,0.45)] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span>Deploy Intelligence</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* --------------------------------------------------------------------
         4. TACTILE INTERACTIVE FLOATING DOCK (Soft Touching Toggles)
         -------------------------------------------------------------------- */}
      <div className="w-full max-w-[310px] mx-auto p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DFEDE5] shadow-[0_4px_16px_rgba(20,42,39,0.06)] flex items-center justify-between gap-1 select-none">
        {/* Toggle 1: Autonomous AI */}
        <button
          type="button"
          data-dock-toggle
          onClick={() => setActiveMode("ai")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeMode === "ai"
              ? "bg-[#E9FFF2] text-[#008F53] shadow-xs"
              : "text-[#64736F] hover:text-[#142A27]"
          }`}
          aria-pressed={activeMode === "ai"}
        >
          <Brain className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Autonomous AI</span>
          {/* iOS-style Soft-Touch Switch */}
          <span
            className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors duration-200 shrink-0 ml-0.5 ${
              activeMode === "ai" ? "bg-[#008F53]" : "bg-[#D2E2D8]"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                activeMode === "ai" ? "translate-x-3" : "translate-x-0"
              }`}
            />
          </span>
        </button>

        {/* Toggle 2: Scalable Core */}
        <button
          type="button"
          data-dock-toggle
          onClick={() => setActiveMode("core")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeMode === "core"
              ? "bg-[#E9FFF2] text-[#008F53] shadow-xs"
              : "text-[#64736F] hover:text-[#142A27]"
          }`}
          aria-pressed={activeMode === "core"}
        >
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Scalable Core</span>
          {/* iOS-style Soft-Touch Switch */}
          <span
            className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors duration-200 shrink-0 ml-0.5 ${
              activeMode === "core" ? "bg-[#008F53]" : "bg-[#D2E2D8]"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                activeMode === "core" ? "translate-x-3" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
