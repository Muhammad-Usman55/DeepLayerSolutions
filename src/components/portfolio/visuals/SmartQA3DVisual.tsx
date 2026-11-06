"use client";

import React from "react";

export function SmartQA3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(7, 92, 50, 0.28) 0%, rgba(21, 155, 80, 0.08) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sqaGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="sqaGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#087A3D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#054A25" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="sqaBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#087A3D" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#sqaGlassSide)"
            stroke="#087A3D"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#sqaGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#sqaGlassSide)"
            stroke="#054A25"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#sqaGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* Floating Background Document Layer */}
        <g transform="translate(115, 45) rotate(-6)">
          <rect
            width="68"
            height="50"
            rx="6"
            fill="#FFFFFF"
            fillOpacity="0.6"
            stroke="#C4D9C8"
            strokeWidth="1"
          />
          <line x1="8" y1="12" x2="30" y2="12" stroke="#A0AEA7" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="20" x2="55" y2="20" stroke="#E3EDE5" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="28" x2="48" y2="28" stroke="#E3EDE5" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Front Browser / Document Window */}
        <g transform="translate(130, 52)">
          <rect
            width="75"
            height="56"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#087A3D"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 14px rgba(8,122,61,0.2))"
          />
          {/* Browser Header Bar */}
          <rect x="0" y="0" width="75" height="14" rx="8" fill="#E8F5E9" />
          <circle cx="8" cy="7" r="2" fill="#EF4444" />
          <circle cx="15" cy="7" r="2" fill="#F59E0B" />
          <circle cx="22" cy="7" r="2" fill="#10B981" />

          {/* Search Input Bar */}
          <rect x="28" y="3" width="40" height="8" rx="3" fill="#FFFFFF" stroke="#C4D9C8" strokeWidth="0.6" />

          {/* Document Content Lines */}
          <line x1="8" y1="22" x2="40" y2="22" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="8" y1="29" x2="62" y2="29" stroke="#A0AEA7" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="36" x2="55" y2="36" stroke="#C4D9C8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="43" x2="45" y2="43" stroke="#C4D9C8" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Floating Circular Green Question Mark Badge `?` */}
        <g transform="translate(185, 40)">
          <circle
            cx="18"
            cy="18"
            r="18"
            fill="url(#sqaBadge)"
            stroke="#FFFFFF"
            strokeWidth="2"
            filter="drop-shadow(0 4px 10px rgba(8,122,61,0.4))"
          />
          {/* Stylized Question Mark */}
          <path
            d="M14 13 C14 10.5 16 9 18.5 9 C21 9 23 10.5 23 13 C23 15 21 16.5 19 17.5 L19 19"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="19" cy="23" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Floating Green Glass Particles */}
        <circle cx="85" cy="80" r="4.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="225" cy="130" r="3.5" fill="#10B981" fillOpacity="0.7" />
        <circle cx="115" cy="40" r="2.5" fill="#6EE7B7" fillOpacity="0.9" />
      </svg>
    </div>
  );
}
