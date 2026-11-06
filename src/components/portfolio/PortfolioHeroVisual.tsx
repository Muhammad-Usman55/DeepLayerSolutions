"use client";

import React from "react";

export function PortfolioHeroVisual() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[520px] mx-auto flex items-center justify-center select-none">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.28) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 75%)",
        }}
      />

      {/* SVG 3D Hero Structure */}
      <svg
        viewBox="0 0 460 380"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="heroGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="heroCubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="heroCubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
          <linearGradient id="heroCubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#052E16" />
          </linearGradient>
          <linearGradient id="heroBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Ambient Pedestal Shadow */}
        <ellipse cx="230" cy="275" rx="140" ry="38" fill="#064E3B" fillOpacity="0.18" />

        {/* Orbital Glowing Glass Rings around structure */}
        <ellipse
          cx="230"
          cy="190"
          rx="180"
          ry="65"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          strokeOpacity="0.6"
          transform="rotate(-12, 230, 190)"
        />
        <ellipse
          cx="230"
          cy="190"
          rx="160"
          ry="55"
          stroke="#10B981"
          strokeWidth="1"
          strokeOpacity="0.35"
          transform="rotate(18, 230, 190)"
        />

        {/* Base Layer: Large Stepped Glass Platform */}
        <g transform="translate(0, 35)">
          <path
            d="M110 210 L230 258 L350 210 L350 225 L230 273 L110 225 Z"
            fill="url(#heroGlassSide)"
            stroke="#10B981"
            strokeWidth="1"
          />
          <path
            d="M110 210 L230 162 L350 210 L230 258 Z"
            fill="url(#heroGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.5"
          />
        </g>

        {/* Middle Layer: Intermediate Stepped Glass Platform */}
        <g transform="translate(0, 18)">
          <path
            d="M135 200 L230 238 L325 200 L325 214 L230 252 L135 214 Z"
            fill="url(#heroGlassSide)"
            stroke="#059669"
            strokeWidth="1"
          />
          <path
            d="M135 200 L230 162 L325 200 L230 238 Z"
            fill="url(#heroGlassTop)"
            stroke="#86EFAC"
            strokeWidth="1.5"
          />
        </g>

        {/* Top Platform Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M160 190 L230 218 L300 190 L300 202 L230 230 L160 202 Z"
            fill="url(#heroGlassSide)"
            stroke="#047857"
            strokeWidth="1"
          />
          <path
            d="M160 190 L230 162 L300 190 L230 218 Z"
            fill="url(#heroGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.5"
          />
        </g>

        {/* Central Floating Glowing Green Translucent Cube */}
        <g id="centerCube" transform="translate(0, -18)">
          {/* Top Face */}
          <path
            d="M200 132 L230 116 L260 132 L230 148 Z"
            fill="url(#heroCubeTop)"
            stroke="#DCFCE7"
            strokeWidth="1.2"
            filter="drop-shadow(0 0 16px rgba(34,197,94,0.6))"
          />
          {/* Left Face */}
          <path
            d="M200 132 L230 148 L230 188 L200 172 Z"
            fill="url(#heroCubeLeft)"
            stroke="#22C55E"
            strokeWidth="1"
          />
          {/* Right Face */}
          <path
            d="M260 132 L230 148 L230 188 L260 172 Z"
            fill="url(#heroCubeRight)"
            stroke="#15803D"
            strokeWidth="1"
          />
          {/* Glass Inner Reflection Glow */}
          <ellipse cx="230" cy="148" rx="14" ry="7" fill="#FFFFFF" fillOpacity="0.4" />
        </g>

        {/* Floating Top-Left Glass Code Panel: `</>` */}
        <g transform="translate(75, 45) rotate(-6)">
          <rect
            width="72"
            height="52"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#10B981"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 16px rgba(16,185,129,0.25))"
          />
          {/* Code Icon `</>` */}
          <path
            d="M24 26 L16 32 L24 38 M48 26 L56 32 L48 38 M38 20 L34 44"
            stroke="#047857"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Top-Right Glass Picture / Landscape Panel */}
        <g transform="translate(315, 40) rotate(8)">
          <rect
            width="68"
            height="50"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#10B981"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 16px rgba(16,185,129,0.25))"
          />
          {/* Landscape / Mountain Graphic */}
          <circle cx="24" cy="20" r="5" fill="#34D399" />
          <path
            d="M14 38 L28 24 L42 38"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36 38 L46 28 L56 38"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Bottom-Right Glass Analytics Bar Chart Panel */}
        <g transform="translate(310, 140) rotate(-4)">
          <rect
            width="78"
            height="62"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.88"
            stroke="#10B981"
            strokeWidth="1.5"
            filter="drop-shadow(0 8px 20px rgba(16,185,129,0.22))"
          />
          {/* 4 Rising Green Bars */}
          <rect x="14" y="38" width="8" height="14" rx="2" fill="#86EFAC" />
          <rect x="28" y="30" width="8" height="22" rx="2" fill="#34D399" />
          <rect x="42" y="22" width="8" height="30" rx="2" fill="#10B981" />
          <rect x="56" y="14" width="8" height="38" rx="2" fill="#047857" />
          {/* Upward Trend Line */}
          <path
            d="M18 36 L32 28 L46 18 L60 10"
            stroke="#052E16"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="10" r="2.5" fill="#22C55E" />
        </g>

        {/* Floating Small Green Glass Spheres & Cubes */}
        {/* Sphere 1 - Left */}
        <circle cx="95" cy="180" r="8" fill="#34D399" filter="drop-shadow(0 0 10px rgba(52,211,153,0.6))" />
        <ellipse cx="93" cy="178" rx="3" ry="2" fill="#FFFFFF" fillOpacity="0.7" />

        {/* Sphere 2 - Right */}
        <circle cx="375" cy="225" r="7" fill="#10B981" filter="drop-shadow(0 0 8px rgba(16,185,129,0.6))" />
        <ellipse cx="373" cy="223" rx="2.5" ry="1.5" fill="#FFFFFF" fillOpacity="0.7" />

        {/* Sphere 3 - Top Right Orbit */}
        <circle cx="365" cy="115" r="5" fill="#86EFAC" />

        {/* Floating Mini Cube Left */}
        <g transform="translate(145, 120)">
          <path d="M0 4 L6 0 L12 4 L6 8 Z" fill="#86EFAC" stroke="#10B981" strokeWidth="0.6" />
          <path d="M0 4 L6 8 L6 14 L0 10 Z" fill="#059669" stroke="#10B981" strokeWidth="0.6" />
          <path d="M12 4 L6 8 L6 14 L12 10 Z" fill="#10B981" stroke="#10B981" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  );
}
