"use client";

import React from "react";

/**
 * 1. Healthcare 3D Visual
 * 3D Isometric Green & Chrome Stethoscope resting on a Translucent Glass Pedestal
 */
export function Healthcare3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          {/* Ambient Platform Shadow */}
          <radialGradient id="hPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          {/* Translucent Frosted Glass Gradients */}
          <linearGradient id="hGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="hGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="hGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          {/* Lower Glass Base */}
          <linearGradient id="hBaseGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.4" />
          </linearGradient>

          {/* Stethoscope Tubing 3D Gradient */}
          <linearGradient id="hTubeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="35%" stopColor="#00B86B" />
            <stop offset="70%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          {/* Chrome Metal Binaural */}
          <linearGradient id="hChromeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Chrome Highlight Streak */}
          <linearGradient id="hChromeShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          {/* Diaphragm Chest Piece */}
          <radialGradient id="hDiaphragmRim" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="85%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          <radialGradient id="hDiaphragmCore" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#064E2B" />
          </radialGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#hPlatShadow)" />

        {/* Lower Glass Pedestal Slab */}
        <g transform="translate(0, 10)">
          {/* Base bottom drop-edge */}
          <path
            d="M80 148 L160 178 L240 148 L160 118 Z"
            fill="url(#hBaseGlass)"
            stroke="#C9EED8"
            strokeWidth="1.2"
          />
        </g>

        {/* Upper Translucent Glass Pedestal Slab (Floating) */}
        <g>
          {/* Left Edge Thickness */}
          <path
            d="M72 136 L160 170 L160 179 L72 145 Z"
            fill="url(#hGlassEdgeL)"
          />
          {/* Right Edge Thickness */}
          <path
            d="M160 170 L248 136 L248 145 L160 179 Z"
            fill="url(#hGlassEdgeR)"
          />
          {/* Top Glass Plate Face */}
          <path
            d="M72 136 L160 102 L248 136 L160 170 Z"
            fill="url(#hGlassTop)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Glass Top Bevel Reflection */}
          <path
            d="M82 135 L160 106 L238 135"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>

        {/* 3D Stethoscope Assembly */}
        <g>
          {/* Stethoscope Shadow on Pedestal */}
          <ellipse cx="204" cy="148" rx="20" ry="10" fill="#008F53" fillOpacity="0.25" />
          <path
            d="M115 135 C125 155 170 175 204 150"
            stroke="#008F53"
            strokeWidth="8"
            strokeOpacity="0.15"
            strokeLinecap="round"
            fill="none"
          />

          {/* Diaphragm Chest Piece (Resting on Right Platform) */}
          <g transform="translate(202, 142)">
            {/* Outer Chrome Bezel Ring */}
            <ellipse cx="0" cy="0" rx="19" ry="11" fill="url(#hDiaphragmRim)" />
            {/* Inner Emerald Center Ring */}
            <ellipse cx="0" cy="0" rx="14" ry="8" fill="url(#hDiaphragmCore)" />
            {/* Specular Glint */}
            <ellipse cx="-4" cy="-2" rx="6" ry="3" fill="#FFFFFF" fillOpacity="0.4" />
            {/* Diaphragm Stem Collar */}
            <path
              d="M-13 -2 C-16 -5 -22 -3 -25 2 C-26 5 -24 8 -20 6"
              fill="url(#hChromeGrad)"
              stroke="#64748B"
              strokeWidth="1"
            />
          </g>

          {/* Flexible Emerald Tubing (Smooth 3D Curves) */}
          {/* Main Loop Background Shadow Stroke */}
          <path
            d="M182 144 C155 158 130 168 115 152 C98 136 108 116 128 112 C146 108 152 98 148 85"
            stroke="#005B34"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Main Loop Emerald Tube Body */}
          <path
            d="M182 144 C155 158 130 168 115 152 C98 136 108 116 128 112 C146 108 152 98 148 85"
            stroke="url(#hTubeGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Tube Specular Highlight Stroke */}
          <path
            d="M180 143 C154 156 132 165 118 151 C102 137 111 118 128 114 C143 111 149 101 147 86"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.75"
            fill="none"
          />

          {/* Chrome Y-Connector at (148, 85) */}
          <ellipse cx="148" cy="85" rx="5" ry="4" fill="url(#hChromeGrad)" />

          {/* Metallic Binaural Arches (Ear Tubes) */}
          {/* Left Binaural Tube */}
          <path
            d="M146 84 C132 76 112 66 114 46"
            stroke="url(#hChromeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M146 84 C132 76 112 66 114 46"
            stroke="url(#hChromeShine)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Binaural Tube */}
          <path
            d="M150 84 C164 74 186 64 184 44"
            stroke="url(#hChromeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M150 84 C164 74 186 64 184 44"
            stroke="url(#hChromeShine)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Binaural Cross-Spring */}
          <path
            d="M126 68 C144 72 156 71 170 66"
            stroke="url(#hChromeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Soft Earpieces */}
          {/* Left Ear Tip */}
          <ellipse cx="114" cy="45" rx="5" ry="4" fill="#E9FFF2" stroke="#008F53" strokeWidth="1.5" />
          {/* Right Ear Tip */}
          <ellipse cx="184" cy="43" rx="5" ry="4" fill="#E9FFF2" stroke="#008F53" strokeWidth="1.5" />
        </g>

        {/* Ambient Subtle Specular Sparkles */}
        <circle cx="218" cy="138" r="2.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="95" cy="115" r="1.8" fill="#34D399" fillOpacity="0.6" />
        <circle cx="188" cy="36" r="2" fill="#00B86B" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * 2. Finance & FinTech 3D Visual
 * 3D Isometric Stacked Emerald Coins with Upward-Curving Growth Arrow on Translucent Glass Pedestal
 */
export function Finance3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          {/* Ambient Ground Shadow */}
          <radialGradient id="fPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          {/* Glass Pedestal Gradients */}
          <linearGradient id="fGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="fGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="fGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="fBaseGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.4" />
          </linearGradient>

          {/* 3D Coin Face Gradients */}
          <radialGradient id="fCoinFace" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="85%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </radialGradient>

          {/* 3D Coin Cylinder Edge Gradients */}
          <linearGradient id="fCoinEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#007242" />
            <stop offset="45%" stopColor="#008F53" />
            <stop offset="80%" stopColor="#005B34" />
            <stop offset="100%" stopColor="#004728" />
          </linearGradient>

          {/* 3D Glowing Growth Arrow Gradient */}
          <linearGradient id="fArrowBody" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="35%" stopColor="#00B86B" />
            <stop offset="80%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>

          <linearGradient id="fArrowBevel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ground Platform Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#fPlatShadow)" />

        {/* Lower Glass Pedestal Slab */}
        <g transform="translate(0, 10)">
          <path
            d="M80 148 L160 178 L240 148 L160 118 Z"
            fill="url(#fBaseGlass)"
            stroke="#C9EED8"
            strokeWidth="1.2"
          />
        </g>

        {/* Upper Translucent Glass Pedestal Slab */}
        <g>
          {/* Left Edge Thickness */}
          <path
            d="M72 136 L160 170 L160 179 L72 145 Z"
            fill="url(#fGlassEdgeL)"
          />
          {/* Right Edge Thickness */}
          <path
            d="M160 170 L248 136 L248 145 L160 179 Z"
            fill="url(#fGlassEdgeR)"
          />
          {/* Top Glass Face */}
          <path
            d="M72 136 L160 102 L248 136 L160 170 Z"
            fill="url(#fGlassTop)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d="M82 135 L160 106 L238 135"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>

        {/* 3-Tier Ascending Coin Stacks */}
        <g>
          {/* --- STACK 1: Left (1 Coin - Base Level) --- */}
          <g transform="translate(112, 138)">
            {/* Coin shadow */}
            <ellipse cx="0" cy="12" rx="18" ry="9" fill="#008F53" fillOpacity="0.3" />
            {/* Coin 1 Side Cylinder */}
            <path
              d="M-17 0 C-17 6 17 6 17 0 L17 8 C17 14 -17 14 -17 8 Z"
              fill="url(#fCoinEdge)"
            />
            {/* Coin 1 Top Face */}
            <ellipse cx="0" cy="0" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Inner Ring */}
            <ellipse cx="0" cy="0" rx="12" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.6" />
          </g>

          {/* --- STACK 2: Middle (2 Coins - Medium Level) --- */}
          <g transform="translate(155, 126)">
            {/* Coin shadow */}
            <ellipse cx="0" cy="20" rx="18" ry="9" fill="#008F53" fillOpacity="0.3" />
            {/* Coin A Side */}
            <path
              d="M-17 8 C-17 14 17 14 17 8 L17 16 C17 22 -17 22 -17 16 Z"
              fill="url(#fCoinEdge)"
            />
            {/* Coin A Top */}
            <ellipse cx="0" cy="8" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Coin B Side */}
            <path
              d="M-17 0 C-17 6 17 6 17 0 L17 8 C17 14 -17 14 -17 8 Z"
              fill="url(#fCoinEdge)"
            />
            {/* Coin B Top */}
            <ellipse cx="0" cy="0" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Inner Ring */}
            <ellipse cx="0" cy="0" rx="12" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.6" />
          </g>

          {/* --- STACK 3: Right (4 Coins - Tallest Level) --- */}
          <g transform="translate(198, 114)">
            {/* Coin shadow */}
            <ellipse cx="0" cy="28" rx="18" ry="9" fill="#008F53" fillOpacity="0.35" />
            {/* Coin 1 */}
            <path
              d="M-17 16 C-17 22 17 22 17 16 L17 24 C17 30 -17 30 -17 24 Z"
              fill="url(#fCoinEdge)"
            />
            <ellipse cx="0" cy="16" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Coin 2 */}
            <path
              d="M-17 8 C-17 14 17 14 17 8 L17 16 C17 22 -17 22 -17 16 Z"
              fill="url(#fCoinEdge)"
            />
            <ellipse cx="0" cy="8" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Coin 3 */}
            <path
              d="M-17 0 C-17 6 17 6 17 0 L17 8 C17 14 -17 14 -17 8 Z"
              fill="url(#fCoinEdge)"
            />
            <ellipse cx="0" cy="0" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            {/* Coin 4 (Top) */}
            <path
              d="M-17 -8 C-17 -2 17 -2 17 -8 L17 0 C17 6 -17 6 -17 0 Z"
              fill="url(#fCoinEdge)"
            />
            <ellipse cx="0" cy="-8" rx="17" ry="8" fill="url(#fCoinFace)" stroke="#86EFAC" strokeWidth="0.8" />
            <ellipse cx="0" cy="-8" rx="12" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.6" />
          </g>

          {/* --- 3D Upward Glowing Growth Arrow --- */}
          <g>
            {/* Arrow Ambient Shadow along arc */}
            <path
              d="M106 142 C125 130 160 105 198 84"
              stroke="#008F53"
              strokeWidth="9"
              strokeOpacity="0.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* 3D Arrow Shaft Curve */}
            <path
              d="M102 136 C124 122 158 98 196 76"
              stroke="#006337"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M102 136 C124 122 158 98 196 76"
              stroke="url(#fArrowBody)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Arrow Specular Highlight */}
            <path
              d="M104 134 C126 120 160 96 195 75"
              stroke="url(#fArrowBevel)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* 3D Arrow Head pointing up-right */}
            <g transform="translate(196, 73)">
              {/* Arrow Head 3D Back/Base */}
              <polygon
                points="-4,8 14,-10 6,-18 -14,-8"
                fill="#005B34"
              />
              {/* Arrow Head Face */}
              <polygon
                points="-2,6 16,-12 4,-18 -12,-8"
                fill="url(#fArrowBody)"
                stroke="#86EFAC"
                strokeWidth="1"
              />
              {/* Arrow Head Specular Streak */}
              <line x1="-8" y1="-7" x2="14" y2="-11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
            </g>
          </g>
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="218" cy="52" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="95" cy="120" r="1.8" fill="#34D399" fillOpacity="0.6" />
        <circle cx="160" cy="78" r="2" fill="#00B86B" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * 3. Education & EdTech 3D Visual
 * 3D Isometric Green Mortarboard Cap resting on Hardcover Book on Translucent Glass Pedestal
 */
export function Education3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          {/* Ambient Ground Shadow */}
          <radialGradient id="ePlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          {/* Glass Pedestal Gradients */}
          <linearGradient id="eGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="eGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="eGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="eBaseGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.4" />
          </linearGradient>

          {/* Book Gradients */}
          <linearGradient id="eBookCover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FCF9" />
            <stop offset="100%" stopColor="#E9FFF2" />
          </linearGradient>

          <linearGradient id="eBookSpine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#007242" />
          </linearGradient>

          <linearGradient id="eBookPages" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Mortarboard Diamond Cap Gradients */}
          <linearGradient id="eCapTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="35%" stopColor="#00B86B" />
            <stop offset="80%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          <linearGradient id="eCapEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007242" />
            <stop offset="100%" stopColor="#004D2B" />
          </linearGradient>

          <linearGradient id="eCapEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          {/* Silk Tassel Gradient */}
          <linearGradient id="eTasselGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Platform Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#ePlatShadow)" />

        {/* Lower Glass Pedestal Slab */}
        <g transform="translate(0, 10)">
          <path
            d="M80 148 L160 178 L240 148 L160 118 Z"
            fill="url(#eBaseGlass)"
            stroke="#C9EED8"
            strokeWidth="1.2"
          />
        </g>

        {/* Upper Translucent Glass Pedestal Slab */}
        <g>
          {/* Left Edge Thickness */}
          <path
            d="M72 136 L160 170 L160 179 L72 145 Z"
            fill="url(#eGlassEdgeL)"
          />
          {/* Right Edge Thickness */}
          <path
            d="M160 170 L248 136 L248 145 L160 179 Z"
            fill="url(#eGlassEdgeR)"
          />
          {/* Top Glass Face */}
          <path
            d="M72 136 L160 102 L248 136 L160 170 Z"
            fill="url(#eGlassTop)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d="M82 135 L160 106 L238 135"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>

        {/* 3D Hardcover Textbook */}
        <g transform="translate(0, 10)">
          {/* Book Shadow */}
          <polygon
            points="114,142 160,158 206,142 160,126"
            fill="#008F53"
            fillOpacity="0.25"
          />

          {/* Book Base / Bottom Cover */}
          <path
            d="M112 136 L160 154 L208 136 L160 118 Z"
            fill="#007242"
          />

          {/* Book Paper Block (Pages Thickness) */}
          {/* Left Pages Edge */}
          <path
            d="M114 135 L160 153 L160 143 L114 125 Z"
            fill="url(#eBookPages)"
            stroke="#CBD5E1"
            strokeWidth="0.5"
          />
          {/* Subtle page lines on left */}
          <line x1="116" y1="128" x2="158" y2="146" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.5" />
          <line x1="116" y1="131" x2="158" y2="149" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.5" />

          {/* Right Pages Edge */}
          <path
            d="M160 153 L206 135 L206 125 L160 143 Z"
            fill="url(#eBookPages)"
            stroke="#CBD5E1"
            strokeWidth="0.5"
          />
          {/* Subtle page lines on right */}
          <line x1="162" y1="146" x2="204" y2="128" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.5" />
          <line x1="162" y1="149" x2="204" y2="131" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.5" />

          {/* Top Hardcover Lid */}
          <path
            d="M112 125 L160 143 L208 125 L160 107 Z"
            fill="url(#eBookCover)"
            stroke="#C4EBD0"
            strokeWidth="1.2"
          />

          {/* Emerald Spine Rim Accent */}
          <path
            d="M112 125 L112 136"
            stroke="url(#eBookSpine)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* 3D Mortarboard Cap (Graduation Cap) */}
        <g>
          {/* Cap Skull Base Cylindrical Underneath */}
          <path
            d="M142 110 C142 118 178 118 178 110 L178 119 C178 127 142 127 142 119 Z"
            fill="#005B34"
          />
          <ellipse cx="160" cy="110" rx="18" ry="8" fill="#007242" />

          {/* Mortarboard Diamond Crown Slab */}
          {/* Left Edge Bevel */}
          <polygon
            points="98,90 160,114 160,121 98,97"
            fill="url(#eCapEdgeL)"
          />
          {/* Right Edge Bevel */}
          <polygon
            points="160,114 222,90 222,97 160,121"
            fill="url(#eCapEdgeR)"
          />

          {/* Top Diamond Face */}
          <polygon
            points="98,90 160,66 222,90 160,114"
            fill="url(#eCapTop)"
            stroke="#86EFAC"
            strokeWidth="1"
          />

          {/* Specular Glint along Top Diamond Ridge */}
          <line x1="102" y1="89" x2="160" y2="67" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.75" />

          {/* Center Crown Button */}
          <ellipse cx="160" cy="90" rx="4.5" ry="3" fill="#86EFAC" stroke="#008F53" strokeWidth="1" />

          {/* Silk Tassel Ribbon & Brush */}
          {/* Cord sweeping from center button to right edge */}
          <path
            d="M160 90 C175 92 195 95 204 97 C208 98 209 104 207 114 C205 125 208 135 209 144"
            stroke="url(#eTasselGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tassel Hanging Ring & Brush at (209, 144) */}
          <circle cx="209" cy="144" r="2.5" fill="#86EFAC" stroke="#008F53" strokeWidth="0.8" />
          <path
            d="M206 146 L212 146 L214 162 L204 162 Z"
            fill="url(#eTasselGrad)"
            stroke="#008F53"
            strokeWidth="0.8"
          />
          {/* Tassel Fringe Lines */}
          <line x1="206" y1="162" x2="206" y2="165" stroke="#34D399" strokeWidth="1" />
          <line x1="209" y1="162" x2="209" y2="166" stroke="#86EFAC" strokeWidth="1" />
          <line x1="212" y1="162" x2="212" y2="165" stroke="#34D399" strokeWidth="1" />
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="225" cy="80" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="95" cy="82" r="2" fill="#34D399" fillOpacity="0.6" />
        <circle cx="160" cy="55" r="2.2" fill="#00B86B" fillOpacity="0.75" />
      </svg>
    </div>
  );
}
