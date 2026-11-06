"use client";

import React from "react";

export function AutoLabeler3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(21, 155, 80, 0.28) 0%, rgba(8, 122, 61, 0.08) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="alGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D5F5E3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A3E5B9" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="alGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#159B50" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#087A3D" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="alGear" x1="0%" y1="0%" x2="100%" y2="100%">
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
            fill="url(#alGlassSide)"
            stroke="#159B50"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#alGlassTop)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#alGlassSide)"
            stroke="#087A3D"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#alGlassTop)"
            stroke="#A7F3D0"
            strokeWidth="1.2"
          />
        </g>

        {/* 3D Glass Laptop / Annotation Workspace Screen */}
        <g transform="translate(100, 50)">
          {/* Laptop Screen */}
          <rect
            width="78"
            height="54"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#159B50"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 12px rgba(21,155,80,0.2))"
          />
          {/* Inner Canvas Display */}
          <rect x="5" y="5" width="68" height="44" rx="5" fill="#042F1A" fillOpacity="0.9" />

          {/* Polygon Segmentation Bounding Box on Screen */}
          <polygon
            points="14,14 42,12 56,26 48,40 22,38 12,28"
            fill="#10B981"
            fillOpacity="0.35"
            stroke="#34D399"
            strokeWidth="1.5"
            strokeDasharray="3 1.5"
          />
          {/* Active Anchor Points */}
          <circle cx="14" cy="14" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />
          <circle cx="42" cy="12" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />
          <circle cx="56" cy="26" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />
          <circle cx="48" cy="40" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />
          <circle cx="22" cy="38" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />
          <circle cx="12" cy="28" r="2.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" />

          {/* Laptop Base Pedestal Edge */}
          <path d="M-6 54 L84 54 L76 60 L2 60 Z" fill="#E8F5E9" stroke="#C4D9C8" strokeWidth="1" />
        </g>

        {/* 3D Vibrant Green Cog / Gear Floating on Right */}
        <g transform="translate(200, 50)">
          {/* 3D Gear Body */}
          <circle
            cx="22"
            cy="22"
            r="16"
            fill="url(#alGear)"
            stroke="#6EE7B7"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 12px rgba(16,185,129,0.4))"
          />
          {/* Center Hole */}
          <circle cx="22" cy="22" r="6" fill="#042F1A" />
          {/* Gear Teeth (8 isometric teeth) */}
          <rect x="19" y="2" width="6" height="7" rx="1.5" fill="#34D399" />
          <rect x="19" y="35" width="6" height="7" rx="1.5" fill="#047857" />
          <rect x="2" y="19" width="7" height="6" rx="1.5" fill="#10B981" />
          <rect x="35" y="19" width="7" height="6" rx="1.5" fill="#059669" />
          <rect x="7" y="7" width="6" height="6" rx="1.5" transform="rotate(45, 10, 10)" fill="#34D399" />
          <rect x="31" y="7" width="6" height="6" rx="1.5" transform="rotate(45, 34, 10)" fill="#10B981" />
          <rect x="7" y="31" width="6" height="6" rx="1.5" transform="rotate(45, 10, 34)" fill="#059669" />
          <rect x="31" y="31" width="6" height="6" rx="1.5" transform="rotate(45, 34, 34)" fill="#047857" />
        </g>

        {/* Floating Green Glass Particles */}
        <circle cx="85" cy="80" r="4.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="220" cy="130" r="3.5" fill="#10B981" fillOpacity="0.7" />
        <circle cx="120" cy="40" r="2.5" fill="#6EE7B7" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

