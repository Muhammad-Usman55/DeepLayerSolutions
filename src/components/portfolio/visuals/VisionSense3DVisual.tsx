"use client";

import React from "react";

export function VisionSense3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(5, 150, 105, 0.28) 0%, rgba(16, 185, 129, 0.08) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vsGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="vsGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#064E3B" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="vsBar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#vsGlassSide)"
            stroke="#059669"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#vsGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#vsGlassSide)"
            stroke="#047857"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#vsGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* Floating 3D Glass Video Analytics Display Screen */}
        <g transform="translate(100, 48)">
          {/* Monitor Screen Frame */}
          <rect
            width="65"
            height="52"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#059669"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 12px rgba(5,150,105,0.2))"
          />
          {/* Inner Screen Display */}
          <rect x="5" y="5" width="55" height="42" rx="5" fill="#064E3B" fillOpacity="0.9" />

          {/* Surveillance Video Feed Bounding Boxes */}
          <rect x="9" y="9" width="22" height="16" rx="2" fill="#0E3826" stroke="#10B981" strokeWidth="0.8" />
          <rect x="34" y="9" width="22" height="16" rx="2" fill="#0E3826" stroke="#34D399" strokeWidth="0.8" />
          <circle cx="20" cy="17" r="3" fill="#10B981" />
          <circle cx="45" cy="17" r="3" fill="#34D399" />

          {/* Mini Waveform / Analytics Bars inside screen */}
          <line x1="9" y1="36" x2="16" y2="36" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="33" x2="27" y2="33" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="38" x2="38" y2="38" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="30" x2="51" y2="30" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 3D Glass Rising Bar Chart Pillar 1 */}
        <g transform="translate(178, 85)">
          <path d="M0 5 L8 0 L16 5 L8 10 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="0.8" />
          <path d="M0 5 L8 10 L8 35 L0 30 Z" fill="url(#vsBar)" stroke="#059669" strokeWidth="0.8" />
          <path d="M16 5 L8 10 L8 35 L16 30 Z" fill="#047857" stroke="#059669" strokeWidth="0.8" />
        </g>

        {/* 3D Glass Rising Bar Chart Pillar 2 (Taller) */}
        <g transform="translate(198, 68)">
          <path d="M0 5 L8 0 L16 5 L8 10 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="0.8" />
          <path d="M0 5 L8 10 L8 52 L0 47 Z" fill="url(#vsBar)" stroke="#059669" strokeWidth="0.8" />
          <path d="M16 5 L8 10 L8 52 L16 47 Z" fill="#047857" stroke="#059669" strokeWidth="0.8" />
        </g>

        {/* 3D Glass Rising Bar Chart Pillar 3 (Tallest) */}
        <g transform="translate(218, 52)">
          <path d="M0 5 L8 0 L16 5 L8 10 Z" fill="#ECFDF5" stroke="#059669" strokeWidth="0.8" />
          <path d="M0 5 L8 10 L8 68 L0 63 Z" fill="url(#vsBar)" stroke="#059669" strokeWidth="0.8" />
          <path d="M16 5 L8 10 L8 68 L16 63 Z" fill="#047857" stroke="#059669" strokeWidth="0.8" />
        </g>

        {/* Floating Green Glass Particles */}
        <circle cx="80" cy="70" r="4.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="230" cy="135" r="3.5" fill="#10B981" fillOpacity="0.7" />
        <circle cx="150" cy="35" r="3" fill="#6EE7B7" fillOpacity="0.9" />
      </svg>
    </div>
  );
}
