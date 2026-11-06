"use client";

import React from "react";

// 1. 3D Magnifying Glass on Translucent Pedestal
export function Discover3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,184,107,0.22)]`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="pedestalGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E9FFF2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4EBD0" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="magRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="magHandleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#006C3E" />
          </linearGradient>
          <linearGradient id="glassLens" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Translucent Glass Pedestal Slab */}
        <g transform="translate(10, 48)">
          <path
            d="M5 20 L40 38 L75 20 L40 2 Z"
            fill="url(#pedestalGlass)"
            stroke="#BCE8CF"
            strokeWidth="1.5"
          />
          <path
            d="M5 20 L40 38 L40 46 L5 28 Z"
            fill="#BCE8CF"
          />
          <path
            d="M40 38 L75 20 L75 28 L40 46 Z"
            fill="#A3DAC0"
          />
        </g>

        {/* 3D Magnifying Glass */}
        <g transform="translate(22, 12)">
          {/* Glass Lens Face */}
          <circle cx="28" cy="28" r="18" fill="url(#glassLens)" />
          {/* Lens Specular Reflection Streak */}
          <path
            d="M16 22 A 16 16 0 0 1 36 14"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 3D Metallic Ring Rim */}
          <circle
            cx="28"
            cy="28"
            r="19"
            stroke="url(#magRingGrad)"
            strokeWidth="5"
            fill="none"
          />
          {/* 3D Handle */}
          <path
            d="M42 42 L58 58 L52 64 L36 48 Z"
            fill="url(#magHandleGrad)"
            stroke="#008F53"
            strokeWidth="1"
          />
          <circle cx="55" cy="61" r="3" fill="#34D399" />
        </g>
      </svg>
    </div>
  );
}

// 2. 3D Architecture Tree / Flowchart on Translucent Pedestal
export function Strategize3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,184,107,0.22)]`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="stratPlat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E9FFF2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4EBD0" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="cubeTopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="cubeSideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#007A46" />
          </linearGradient>
        </defs>

        {/* Translucent Glass Pedestal Slab */}
        <g transform="translate(10, 48)">
          <path
            d="M5 20 L40 38 L75 20 L40 2 Z"
            fill="url(#stratPlat)"
            stroke="#BCE8CF"
            strokeWidth="1.5"
          />
          <path d="M5 20 L40 38 L40 46 L5 28 Z" fill="#BCE8CF" />
          <path d="M40 38 L75 20 L75 28 L40 46 Z" fill="#A3DAC0" />
        </g>

        {/* 3D Flowchart / Architecture Hierarchy Nodes */}
        <g transform="translate(20, 10)">
          {/* Connector Branches */}
          <path
            d="M30 22 L30 32 M14 32 L46 32 M14 32 L14 40 M46 32 L46 40"
            stroke="#00B86B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Central Node */}
          <g transform="translate(20, 4)">
            <rect x="0" y="0" width="20" height="15" rx="3.5" fill="url(#cubeTopGrad)" stroke="#008F53" strokeWidth="1.5" />
            <rect x="3" y="3" width="14" height="2" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Bottom Left Node */}
          <g transform="translate(4, 38)">
            <rect x="0" y="0" width="18" height="13" rx="3" fill="url(#cubeSideGrad)" stroke="#006C3E" strokeWidth="1.5" />
            <rect x="3" y="3" width="12" height="2" fill="#86EFAC" />
          </g>

          {/* Bottom Right Node */}
          <g transform="translate(38, 38)">
            <rect x="0" y="0" width="18" height="13" rx="3" fill="url(#cubeSideGrad)" stroke="#006C3E" strokeWidth="1.5" />
            <rect x="3" y="3" width="12" height="2" fill="#86EFAC" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// 3. 3D Code Symbol </> on Translucent Pedestal
export function Develop3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,184,107,0.22)]`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="devPlat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E9FFF2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4EBD0" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="codeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        {/* Translucent Glass Pedestal Slab */}
        <g transform="translate(10, 48)">
          <path
            d="M5 20 L40 38 L75 20 L40 2 Z"
            fill="url(#devPlat)"
            stroke="#BCE8CF"
            strokeWidth="1.5"
          />
          <path d="M5 20 L40 38 L40 46 L5 28 Z" fill="#BCE8CF" />
          <path d="M40 38 L75 20 L75 28 L40 46 Z" fill="#A3DAC0" />
        </g>

        {/* 3D Code Symbol </> */}
        <g transform="translate(23, 14)" filter="drop-shadow(0 2px 6px rgba(0,184,107,0.4))">
          {/* Left Angle Bracket < */}
          <path
            d="M17 16 L6 27 L17 38"
            stroke="url(#codeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Slash / */}
          <path
            d="M31 10 L23 44"
            stroke="#34D399"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Right Angle Bracket > */}
          <path
            d="M37 16 L48 27 L37 38"
            stroke="url(#codeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

// 4. 3D Rocket Launch on Translucent Pedestal
export function Deliver3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,184,107,0.22)]`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="rocketPlat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E9FFF2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4EBD0" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E9FFF2" />
            <stop offset="100%" stopColor="#C4EBD0" />
          </linearGradient>
          <linearGradient id="rocketFin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="rocketFlame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#00B86B" />
          </linearGradient>
        </defs>

        {/* Translucent Glass Pedestal Slab */}
        <g transform="translate(10, 48)">
          <path
            d="M5 20 L40 38 L75 20 L40 2 Z"
            fill="url(#rocketPlat)"
            stroke="#BCE8CF"
            strokeWidth="1.5"
          />
          <path d="M5 20 L40 38 L40 46 L5 28 Z" fill="#BCE8CF" />
          <path d="M40 38 L75 20 L75 28 L40 46 Z" fill="#A3DAC0" />
        </g>

        {/* 3D Aerodynamic Rocket */}
        <g transform="translate(26, 4) rotate(22 25 35)">
          {/* Flame Tail */}
          <path
            d="M17 44 Q 21 58 21 64 Q 21 58 25 44 Z"
            fill="url(#rocketFlame)"
            filter="drop-shadow(0 0 6px #34D399)"
          />

          {/* Left Fin */}
          <path
            d="M10 32 L5 44 L15 40 Z"
            fill="url(#rocketFin)"
            stroke="#006C3E"
            strokeWidth="1"
          />

          {/* Right Fin */}
          <path
            d="M32 32 L37 44 L27 40 Z"
            fill="url(#rocketFin)"
            stroke="#006C3E"
            strokeWidth="1"
          />

          {/* Fuselage / Rocket Body */}
          <path
            d="M21 4 C 12 12, 12 36, 15 44 L27 44 C 30 36, 30 12, 21 4 Z"
            fill="url(#rocketBody)"
            stroke="#BCE8CF"
            strokeWidth="1.5"
          />

          {/* Nosecone Cap */}
          <path
            d="M21 4 C 17 9, 15 16, 15 16 L27 16 C 27 16, 25 9, 21 4 Z"
            fill="#00B86B"
          />

          {/* Porthole Window */}
          <circle cx="21" cy="24" r="4.5" fill="#008F53" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="21" cy="24" r="2" fill="#86EFAC" />
        </g>
      </svg>
    </div>
  );
}

