"use client";

import React from "react";

export function DeepVoice3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.08) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dvGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="dvGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="dvRobotHead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D1FAE5" />
          </linearGradient>
          <linearGradient id="dvRobotVisor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#dvGlassSide)"
            stroke="#10B981"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#dvGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#dvGlassSide)"
            stroke="#059669"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#dvGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* 3D Cute Robot Character */}
        <g id="robotGroup" transform="translate(0, -6)">
          {/* Robot Torso / Pedestal */}
          <path
            d="M145 120 C145 110 175 110 175 120 L180 134 C180 138 140 138 140 134 Z"
            fill="url(#dvRobotHead)"
            stroke="#A7F3D0"
            strokeWidth="1"
          />

          {/* Robot Head (Rounded White Cube) */}
          <rect
            x="136"
            y="72"
            width="48"
            height="42"
            rx="16"
            fill="url(#dvRobotHead)"
            stroke="#A7F3D0"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 10px rgba(16,185,129,0.25))"
          />

          {/* Green Digital Visor Screen */}
          <rect x="142" y="82" width="36" height="18" rx="8" fill="url(#dvRobotVisor)" />

          {/* Friendly LED Eyes */}
          <circle cx="152" cy="91" r="3" fill="#6EE7B7" />
          <circle cx="168" cy="91" r="3" fill="#6EE7B7" />
          <circle cx="153" cy="90" r="1" fill="#FFFFFF" />
          <circle cx="169" cy="90" r="1" fill="#FFFFFF" />

          {/* Headphones Band Over Head */}
          <path
            d="M132 88 C132 60 188 60 188 88"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Headphone Earcup */}
          <rect x="129" y="82" width="8" height="18" rx="4" fill="#047857" stroke="#34D399" strokeWidth="1" />

          {/* Right Headphone Earcup */}
          <rect x="183" y="82" width="8" height="18" rx="4" fill="#047857" stroke="#34D399" strokeWidth="1" />

          {/* Cute Little Antenna on top */}
          <line x1="160" y1="72" x2="160" y2="60" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <circle cx="160" cy="58" r="3.5" fill="#34D399" />
        </g>

        {/* Floating Glass Speech Bubble Right */}
        <g transform="translate(198, 54)">
          <rect
            width="46"
            height="32"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#10B981"
            strokeWidth="1.2"
            filter="drop-shadow(0 2px 8px rgba(16,185,129,0.18))"
          />
          {/* Mini Sound Wave Bars inside bubble */}
          <line x1="12" y1="16" x2="12" y2="16" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="18" y1="11" x2="18" y2="21" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="8" x2="24" y2="24" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="13" x2="30" y2="19" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="16" x2="36" y2="16" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Floating Particles */}
        <circle cx="85" cy="85" r="4.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="115" cy="45" r="3" fill="#6EE7B7" fillOpacity="0.9" />
        <circle cx="215" cy="125" r="3.5" fill="#10B981" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
