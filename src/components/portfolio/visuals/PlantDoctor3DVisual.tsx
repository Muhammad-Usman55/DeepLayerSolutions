"use client";

import React from "react";

export function PlantDoctor3DVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#F4FAF6] via-[#EEF8F1] to-[#E3F2E8]">
      {/* Soft Radial Mint Glow */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.28) 0%, rgba(21, 155, 80, 0.08) 60%, transparent 80%)",
        }}
      />

      {/* SVG 3D Isometric Stepped Glass Pedestal & Potted Plant */}
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-[190px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pdGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D8F3E2" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A8E4BE" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="pdGlassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#159B50" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#087A3D" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="pdStem" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#159B50" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="pdLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="pdPot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FAF3" />
            <stop offset="100%" stopColor="#D2EBD9" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="155" rx="85" ry="24" fill="#0E4528" fillOpacity="0.12" />

        {/* Stepped Glass Pedestal: Base Layer */}
        <g transform="translate(0, 10)">
          {/* Base Platform - Isometric Hexagon/Octagon */}
          <path
            d="M80 135 L160 168 L240 135 L240 144 L160 177 L80 144 Z"
            fill="url(#pdGlassSide)"
            stroke="#159B50"
            strokeWidth="0.8"
          />
          <path
            d="M80 135 L160 102 L240 135 L160 168 Z"
            fill="url(#pdGlassTop)"
            stroke="#86D4A0"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Middle Layer */}
        <g transform="translate(0, 0)">
          <path
            d="M100 130 L160 154 L220 130 L220 138 L160 162 L100 138 Z"
            fill="url(#pdGlassSide)"
            stroke="#159B50"
            strokeWidth="0.8"
          />
          <path
            d="M100 130 L160 106 L220 130 L160 154 Z"
            fill="url(#pdGlassTop)"
            stroke="#A3E5B9"
            strokeWidth="1.2"
          />
        </g>

        {/* Stepped Glass Pedestal: Top Small Pedestal */}
        <g transform="translate(0, -8)">
          <ellipse cx="160" cy="132" rx="42" ry="16" fill="url(#pdGlassTop)" stroke="#22C55E" strokeWidth="1" />
        </g>

        {/* Floating Glass Background Health Card */}
        <g transform="translate(195, 55)">
          <rect
            width="55"
            height="38"
            rx="6"
            fill="#FFFFFF"
            fillOpacity="0.75"
            stroke="#86D4A0"
            strokeWidth="1"
          />
          <path d="M8 24 L18 15 L28 22 L38 12 L48 18" stroke="#159B50" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="38" cy="12" r="2" fill="#22C55E" />
          <line x1="8" y1="30" x2="32" y2="30" stroke="#C4D9C8" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Sprout Icon Badge Left */}
        <g transform="translate(70, 75)">
          <circle cx="14" cy="14" r="14" fill="#FFFFFF" fillOpacity="0.8" stroke="#A3E5B9" strokeWidth="1" />
          <path
            d="M14 20 C14 15 11 11 8 11 C8 15 11 19 14 20 Z"
            fill="#159B50"
          />
          <path
            d="M14 20 C14 13 18 9 21 10 C20 14 16 19 14 20 Z"
            fill="#22C55E"
          />
        </g>

        {/* Potted Sprout: Ceramic White/Mint Cylinder Pot */}
        <g id="potGroup">
          {/* Pot body */}
          <path
            d="M142 110 L146 132 C146 137 174 137 174 132 L178 110 Z"
            fill="url(#pdPot)"
            stroke="#A3E5B9"
            strokeWidth="1"
          />
          {/* Pot Rim */}
          <ellipse cx="160" cy="110" rx="18" ry="6" fill="#FFFFFF" stroke="#86D4A0" strokeWidth="1.2" />
          {/* Soil */}
          <ellipse cx="160" cy="111" rx="15" ry="4.5" fill="#0C4A28" fillOpacity="0.8" />
        </g>

        {/* 3D Sprouting Green Plant */}
        <g id="sproutGroup">
          {/* Central Stem */}
          <path
            d="M160 110 C160 92 158 75 160 62"
            stroke="url(#pdStem)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Leaf */}
          <path
            d="M159 86 C140 82 132 68 136 62 C146 62 156 74 159 86 Z"
            fill="url(#pdLeaf)"
            stroke="#159B50"
            strokeWidth="0.8"
          />

          {/* Right Leaf */}
          <path
            d="M160 78 C178 72 186 58 182 52 C172 52 163 65 160 78 Z"
            fill="url(#pdLeaf)"
            stroke="#159B50"
            strokeWidth="0.8"
          />

          {/* Top Tender Leaf Bud */}
          <path
            d="M160 63 C153 50 157 40 160 38 C163 40 167 50 160 63 Z"
            fill="#86EFAC"
            stroke="#159B50"
            strokeWidth="0.8"
          />

          {/* Specular Leaf Highlights */}
          <path d="M140 67 C144 68 150 74 153 80" stroke="#DCFCE7" strokeWidth="1" strokeLinecap="round" />
          <path d="M176 58 C173 60 168 67 166 73" stroke="#DCFCE7" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Floating Green Glass Particles */}
        <circle cx="115" cy="85" r="4" fill="#34D399" fillOpacity="0.8" />
        <circle cx="215" cy="120" r="3.5" fill="#10B981" fillOpacity="0.7" />
        <circle cx="130" cy="50" r="2.5" fill="#86EFAC" fillOpacity="0.9" />
      </svg>
    </div>
  );
}
