"use client";

import React from "react";

export function FinSecure3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(5, 150, 105, 0.08) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fsGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="fsGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#087A3D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#044E26" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="fsShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#fsGlassSide)"
            stroke="#10B981"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#fsGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#fsGlassSide)"
            stroke="#059669"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#fsGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* Floating Shield Orbit Ring */}
        <ellipse
          cx="160"
          cy="92"
          rx="52"
          ry="18"
          stroke="#34D399"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          strokeOpacity="0.7"
          transform="rotate(-10, 160, 92)"
        />

        {/* 3D Vibrant Glowing Green Security Shield */}
        <g id="shieldCenter" transform="translate(132, 58)">
          {/* Outer Glass Shield Border */}
          <path
            d="M28 2 C44 2 54 8 54 8 C54 36 34 52 28 58 C22 52 2 36 2 8 C2 8 12 2 28 2 Z"
            fill="url(#fsShield)"
            stroke="#ECFDF5"
            strokeWidth="2.5"
            filter="drop-shadow(0 6px 16px rgba(16,185,129,0.45))"
          />

          {/* Inner Gloss Facet Highlight */}
          <path
            d="M28 6 C38 6 46 11 48 12 C48 34 32 46 28 50 C24 46 8 34 8 12 C10 11 18 6 28 6 Z"
            fill="#065F46"
            fillOpacity="0.25"
          />

          {/* Crisp White Checkmark `✓` */}
          <path
            d="M18 28 L25 36 L39 20"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Glass Security Lock / Data Nodes */}
        <g transform="translate(220, 65)">
          <path d="M0 6 L10 0 L20 6 L10 12 Z" fill="#6EE7B7" fillOpacity="0.8" stroke="#10B981" strokeWidth="0.8" />
          <path d="M0 6 L10 12 L10 22 L0 16 Z" fill="#059669" fillOpacity="0.7" stroke="#10B981" strokeWidth="0.8" />
          <path d="M20 6 L10 12 L10 22 L20 16 Z" fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="0.8" />
        </g>

        {/* Floating Particles */}
        <circle cx="85" cy="85" r="4.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="215" cy="130" r="3.5" fill="#10B981" fillOpacity="0.7" />
        <circle cx="115" cy="45" r="3" fill="#6EE7B7" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

