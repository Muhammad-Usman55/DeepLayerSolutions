"use client";

import React from "react";

export function TravelMate3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.08) 60%, transparent 80%)",
        }}
      />

      {/* SVG 3D Stepped Glass Pedestal & Glowing Brain */}
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tmGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="tmGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="tmBrainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </radialGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#tmGlassSide)"
            stroke="#10B981"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#tmGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#tmGlassSide)"
            stroke="#059669"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#tmGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* Orbital Glowing Glass Ring 1 (Tilted around brain) */}
        <ellipse
          cx="160"
          cy="85"
          rx="58"
          ry="18"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          strokeOpacity="0.8"
          transform="rotate(-15, 160, 85)"
        />

        {/* Orbital Glowing Ring 2 (Counter tilted) */}
        <ellipse
          cx="160"
          cy="85"
          rx="52"
          ry="15"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          transform="rotate(20, 160, 85)"
        />

        {/* Central Glowing 3D Brain / Neural Network Sphere */}
        <g id="brainCenter">
          {/* Outer glow sphere */}
          <circle cx="160" cy="85" r="30" fill="url(#tmBrainGlow)" filter="drop-shadow(0 0 16px rgba(16,185,129,0.5))" />

          {/* Stylized Brain Gyri / Folds (Emerald & Mint lines) */}
          {/* Left Hemisphere */}
          <path
            d="M157 65 C146 64 136 72 136 82 C136 90 142 96 142 101 C142 105 146 107 157 107"
            stroke="#ECFDF5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M142 80 C146 76 152 76 156 80 C156 86 146 88 152 94"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Hemisphere */}
          <path
            d="M163 65 C174 64 184 72 184 82 C184 90 178 96 178 101 C178 105 174 107 163 107"
            stroke="#ECFDF5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M178 80 C174 76 168 76 164 80 C164 86 174 88 168 94"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Central Division line */}
          <line x1="160" y1="63" x2="160" y2="108" stroke="#065F46" strokeWidth="2" strokeDasharray="3 2" />

          {/* Glowing Neural Synapse Nodes */}
          <circle cx="148" cy="74" r="2" fill="#FFFFFF" />
          <circle cx="172" cy="74" r="2" fill="#FFFFFF" />
          <circle cx="150" cy="95" r="2" fill="#FFFFFF" />
          <circle cx="170" cy="95" r="2" fill="#FFFFFF" />
        </g>

        {/* Floating Green Glass Data Cube 1 */}
        <g transform="translate(225, 60)">
          <path d="M0 6 L10 0 L20 6 L10 12 Z" fill="#6EE7B7" fillOpacity="0.8" stroke="#10B981" strokeWidth="0.8" />
          <path d="M0 6 L10 12 L10 22 L0 16 Z" fill="#059669" fillOpacity="0.7" stroke="#10B981" strokeWidth="0.8" />
          <path d="M20 6 L10 12 L10 22 L20 16 Z" fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="0.8" />
        </g>

        {/* Floating Small Sphere */}
        <circle cx="85" cy="80" r="5" fill="#34D399" fillOpacity="0.9" />
        <circle cx="215" cy="130" r="3.5" fill="#10B981" fillOpacity="0.8" />
      </svg>
    </div>
  );
}

