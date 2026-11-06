"use client";

import React from "react";

export function CareersHeroVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="carShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="carGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="carCoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#carShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#carGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Central 3D Collaboration Orb & Orbiting Nodes */}
        <g transform="translate(170, 110)">
          {/* Orbital Satellite Ring */}
          <ellipse cx="0" cy="0" rx="68" ry="24" fill="none" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="5 4" transform="rotate(-15)" />
          <ellipse cx="0" cy="0" rx="55" ry="18" fill="none" stroke="#008F53" strokeWidth="1.2" strokeDasharray="3 3" transform="rotate(22)" />

          {/* Central Collaboration Sphere */}
          <circle cx="0" cy="0" r="30" fill="url(#carCoreGrad)" filter="drop-shadow(0 8px 20px rgba(0,143,83,0.25))" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.6" />

          {/* Central Teamwork Iconography */}
          <g transform="translate(0, -2)">
            <circle cx="0" cy="-6" r="5" fill="#FFFFFF" />
            <path d="M-9 8 C-9 2 9 2 9 8" fill="#FFFFFF" />
          </g>

          {/* Orbiting Satellite Node 1 (AI) */}
          <g transform="translate(-56, -18)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
            <text x="-7" y="4" fill="#008F53" fontSize="9" fontFamily="monospace" fontWeight="bold">AI</text>
          </g>

          {/* Orbiting Satellite Node 2 (Code) */}
          <g transform="translate(56, -14)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#008F53" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
            <text x="-9" y="4" fill="#008F53" fontSize="8" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
          </g>

          {/* Orbiting Satellite Node 3 (Growth) */}
          <g transform="translate(-32, 28)">
            <circle cx="0" cy="0" r="12" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4.5" fill="#008F53" />
          </g>

          {/* Orbiting Satellite Node 4 (Leads) */}
          <g transform="translate(36, 26)">
            <circle cx="0" cy="0" r="12" fill="#E9FFF2" stroke="#008F53" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4.5" fill="#00B86B" />
          </g>
        </g>

        {/* Telemetry Pill Badge: 100% Remote */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">100% Remote</text>
        </g>
      </svg>
    </div>
  );
}
