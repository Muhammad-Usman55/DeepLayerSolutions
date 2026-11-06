"use client";

import React from "react";

export function GrowthVisual() {
  return (
    <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[680px] mx-auto aspect-[4/3] flex items-center justify-center select-none overflow-visible">
      {/* 1. Volumetric Mint & Emerald Ambient Glows (Cached GPU Texture Quads) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#087A3D]/20 via-[#34D399]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-52 sm:w-72 h-52 sm:h-72 bg-[#34D399]/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* 2. Main 3D Composition SVG */}
      <svg
        viewBox="0 0 700 520"
        className="w-full h-full relative z-10 drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brand Gradients */}
          <linearGradient id="emeraldGlassFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="45%" stopColor="#EAF7EF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C9EED8" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="glassBorderGleam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#087A3D" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="slabEdgeBevel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#087A3D" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#054A25" />
          </linearGradient>

          <linearGradient id="chartBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#087A3D" />
          </linearGradient>

          <linearGradient id="chartBarSideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#087A3D" />
            <stop offset="100%" stopColor="#054A25" />
          </linearGradient>

          <linearGradient id="growthArrowGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#087A3D" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>

          {/* Marble Sphere Gradients */}
          <radialGradient id="emeraldMarble1" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#6EE7B7" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#087A3D" />
            <stop offset="100%" stopColor="#044320" />
          </radialGradient>

          <radialGradient id="emeraldMarble2" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#34D399" />
            <stop offset="70%" stopColor="#075C32" />
            <stop offset="100%" stopColor="#022B14" />
          </radialGradient>

          {/* Ribbon Wave Gradient */}
          <linearGradient id="ribbonGlassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#34D399" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#087A3D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.05" />
          </linearGradient>

          {/* Chip Circuit Gradient */}
          <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#DDF5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A8E4C1" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 3. Soft Ambient Ground Shadows */}
        <ellipse cx="440" cy="445" rx="210" ry="48" fill="#075C32" fillOpacity="0.12" />
        <ellipse cx="440" cy="445" rx="140" ry="28" fill="#087A3D" fillOpacity="0.16" />

        {/* 4. Organic Translucent Ribbon & Connecting Light Wave */}
        <path
          d="M100 460 C 220 420, 310 480, 440 450 C 580 420, 640 460, 680 430"
          stroke="url(#ribbonGlassGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M120 460 C 230 425, 315 480, 440 452 C 570 425, 630 460, 670 432"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
          fill="none"
        />

        {/* 5. Orbital Glass Ring Encircling the Platform */}
        <g stroke="url(#glassBorderGleam)" strokeWidth="1.8" opacity="0.65">
          {/* Back segment of orbit */}
          <ellipse
            cx="440"
            cy="270"
            rx="240"
            ry="95"
            strokeDasharray="8 6"
            transform="rotate(-14 440 270)"
          />
        </g>

        {/* 6. CENTRAL INTELLIGENT GROWTH PLATFORM (Gentle Float) */}
        <g className="animate-float-gentle">
          {/* ================= TIER 1: BASE ISOMETRIC GLASS SLAB ================= */}
          <g>
            {/* Base Slab Left Thickness */}
            <polygon
              points="310,375 440,435 440,453 310,393"
              fill="url(#slabEdgeBevel)"
              fillOpacity="0.85"
            />
            {/* Base Slab Right Thickness */}
            <polygon
              points="570,375 440,435 440,453 570,393"
              fill="#054A25"
              fillOpacity="0.9"
            />
            {/* Base Slab Top Face */}
            <polygon
              points="440,315 570,375 440,435 310,375"
              fill="url(#emeraldGlassFace)"
              stroke="url(#glassBorderGleam)"
              strokeWidth="2"
            />
            {/* Top Surface Grid Accent Lines */}
            <g stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4">
              <line x1="375" y1="345" x2="505" y2="405" />
              <line x1="505" y1="345" x2="375" y2="405" />
            </g>
          </g>

          {/* ================= TIER 2: MIDDLE ISOMETRIC GLASS SLAB ================= */}
          <g>
            {/* Middle Slab Left Thickness */}
            <polygon
              points="335,348 440,398 440,412 335,362"
              fill="url(#slabEdgeBevel)"
              fillOpacity="0.9"
            />
            {/* Middle Slab Right Thickness */}
            <polygon
              points="545,348 440,398 440,412 545,362"
              fill="#06542B"
              fillOpacity="0.9"
            />
            {/* Middle Slab Top Face */}
            <polygon
              points="440,298 545,348 440,398 335,348"
              fill="url(#emeraldGlassFace)"
              stroke="url(#glassBorderGleam)"
              strokeWidth="1.8"
            />
            {/* Edge Specular Highlight */}
            <line x1="335" y1="348" x2="440" y2="398" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" />
          </g>

          {/* ================= TIER 3: TOP ISOMETRIC GLASS SLAB ================= */}
          <g>
            {/* Top Slab Left Thickness */}
            <polygon
              points="360,324 440,364 440,376 360,336"
              fill="url(#slabEdgeBevel)"
            />
            {/* Top Slab Right Thickness */}
            <polygon
              points="520,324 440,364 440,376 520,336"
              fill="#075C32"
            />
            {/* Top Slab Top Face */}
            <polygon
              points="440,284 520,324 440,364 360,324"
              fill="url(#emeraldGlassFace)"
              stroke="url(#glassBorderGleam)"
              strokeWidth="1.5"
            />
            {/* Top Slab Specular Edge */}
            <line x1="360" y1="324" x2="440" y2="364" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" />
          </g>

          {/* ================= 3D ANGLED VERTICAL GLASS SCREEN MONOLITH ================= */}
          <g>
            {/* Back Ambient Glow of the Screen */}
            <polygon
              points="375,105 525,65 525,285 375,325"
              fill="#34D399"
              fillOpacity="0.12"
            />

            {/* Screen Top Bevel Thickness */}
            <polygon
              points="375,105 385,96 535,56 525,65"
              fill="#FFFFFF"
              fillOpacity="0.75"
              stroke="url(#glassBorderGleam)"
              strokeWidth="1"
            />
            {/* Screen Right Bevel Thickness */}
            <polygon
              points="525,65 535,56 535,276 525,285"
              fill="#087A3D"
              fillOpacity="0.65"
              stroke="url(#glassBorderGleam)"
              strokeWidth="1"
            />

            {/* Main Glass Screen Front Face with Rounded Top Bevels */}
            <path
              d="M375 125 C375 110, 385 102, 400 98 L510 68 C522 65, 525 72, 525 85 L525 285 L375 325 Z"
              fill="url(#emeraldGlassFace)"
              stroke="url(#glassBorderGleam)"
              strokeWidth="2.5"
            />

            {/* Glass Reflection Highlight Slant */}
            <path
              d="M375 125 L450 100 L400 318 L375 325 Z"
              fill="#FFFFFF"
              fillOpacity="0.32"
            />

            {/* Inner Glass Glow Perimeter */}
            <path
              d="M385 130 L515 95 L515 275 L385 310 Z"
              stroke="#34D399"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="none"
            />

            {/* ================= 3D ANALYTICS GROWTH BARS & UPWARD ARROW ================= */}
            {/* Chart Grid Datum Lines on Glass Panel */}
            <g stroke="#087A3D" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3">
              <line x1="395" y1="290" x2="505" y2="260" />
              <line x1="395" y1="260" x2="505" y2="230" />
              <line x1="395" y1="230" x2="505" y2="200" />
            </g>

            {/* --- 3D BAR 1 (Smallest) --- */}
            <g>
              {/* Bar 1 Front */}
              <polygon points="405,270 417,267 417,290 405,293" fill="url(#chartBarGrad)" />
              {/* Bar 1 Right Side */}
              <polygon points="417,267 423,264 423,287 417,290" fill="url(#chartBarSideGrad)" />
              {/* Bar 1 Top */}
              <polygon points="405,270 411,267 423,264 417,267" fill="#6EE7B7" />
            </g>

            {/* --- 3D BAR 2 (Medium) --- */}
            <g>
              {/* Bar 2 Front */}
              <polygon points="432,245 444,242 444,282 432,285" fill="url(#chartBarGrad)" />
              {/* Bar 2 Right Side */}
              <polygon points="444,242 450,239 450,279 444,282" fill="url(#chartBarSideGrad)" />
              {/* Bar 2 Top */}
              <polygon points="432,245 438,242 450,239 444,242" fill="#6EE7B7" />
            </g>

            {/* --- 3D BAR 3 (Tall) --- */}
            <g>
              {/* Bar 3 Front */}
              <polygon points="460,215 472,212 472,274 460,277" fill="url(#chartBarGrad)" />
              {/* Bar 3 Right Side */}
              <polygon points="472,212 478,209 478,271 472,274" fill="url(#chartBarSideGrad)" />
              {/* Bar 3 Top */}
              <polygon points="460,215 466,212 478,209 472,212" fill="#6EE7B7" />
            </g>

            {/* --- 3D BAR 4 (Tallest) --- */}
            <g>
              {/* Bar 4 Front */}
              <polygon points="488,185 500,182 500,266 488,269" fill="url(#chartBarGrad)" />
              {/* Bar 4 Right Side */}
              <polygon points="500,182 506,179 506,263 500,266" fill="url(#chartBarSideGrad)" />
              {/* Bar 4 Top */}
              <polygon points="488,185 494,182 506,179 500,182" fill="#A7F3D0" />
            </g>

            {/* --- 3D RISING GROWTH ARROW SURGE --- */}
            <g>
              {/* Arrow Shaft Shadow / Extrusion */}
              <path
                d="M400 270 L430 240 L448 248 L496 160"
                stroke="#044320"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
                transform="translate(2, 4)"
              />
              {/* Arrow Shaft Luminous Body */}
              <path
                d="M400 270 L430 240 L448 248 L496 160"
                stroke="url(#growthArrowGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow Shaft Specular White Inset Core */}
              <path
                d="M400 270 L430 240 L448 248 L496 160"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.9"
              />

              {/* 3D Dynamic Arrowhead */}
              {/* Arrowhead Bottom / Extrusion */}
              <polygon
                points="478,162 516,145 506,182"
                fill="#054A25"
                transform="translate(2, 3)"
                opacity="0.5"
              />
              {/* Arrowhead Face */}
              <polygon
                points="478,162 516,145 506,182"
                fill="url(#growthArrowGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Arrowhead Specular Spark */}
              <polygon
                points="488,160 514,146 504,170"
                fill="#FFFFFF"
                fillOpacity="0.85"
              />
            </g>
          </g>
        </g>

        {/* 7. FOUR FLOATING SATELLITE TECHNOLOGY OBJECTS */}

        {/* OBJECT 1: FLOATING GLASS CODE PANEL (Upper Left) */}
        <g className="animate-float-reverse" transform="translate(260, 100)">
          {/* Glass Tablet Shadow */}
          <rect x="0" y="0" width="76" height="54" rx="14" fill="#075C32" fillOpacity="0.1" transform="translate(6, 12)" />
          {/* Glass Tablet Body */}
          <rect
            x="0"
            y="0"
            width="76"
            height="54"
            rx="14"
            fill="url(#emeraldGlassFace)"
            stroke="url(#glassBorderGleam)"
            strokeWidth="2"
          />
          {/* Glass Tablet Top Shine */}
          <path d="M4 14 C4 8, 10 4, 16 4 L60 4 C66 4, 72 8, 72 14 L4 28 Z" fill="#FFFFFF" fillOpacity="0.45" />

          {/* Glowing Green Code Symbol (</>) */}
          {/* Chevron < */}
          <path d="M26 22 L18 28 L26 34" stroke="#087A3D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 22 L18 28 L26 34" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slash / */}
          <path d="M42 18 L34 38" stroke="#087A3D" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 18 L34 38" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />
          {/* Chevron > */}
          <path d="M50 22 L58 28 L50 34" stroke="#087A3D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 22 L58 28 L50 34" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* OBJECT 2: FLOATING GLASS AI CHIP (Upper Right) */}
        <g className="animate-float-gentle" transform="translate(565, 125)">
          {/* Chip Shadow */}
          <rect x="0" y="0" width="58" height="58" rx="12" fill="#075C32" fillOpacity="0.1" transform="translate(6, 10)" />
          {/* Circuit Pins */}
          {/* Top Pins */}
          <line x1="16" y1="-5" x2="16" y2="3" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="-5" x2="29" y2="3" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="-5" x2="42" y2="3" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bottom Pins */}
          <line x1="16" y1="55" x2="16" y2="63" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="55" x2="29" y2="63" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="55" x2="42" y2="63" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Pins */}
          <line x1="-5" y1="16" x2="3" y2="16" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-5" y1="29" x2="3" y2="29" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-5" y1="42" x2="3" y2="42" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right Pins */}
          <line x1="55" y1="16" x2="63" y2="16" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="55" y1="29" x2="63" y2="29" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="55" y1="42" x2="63" y2="42" stroke="#087A3D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Chip Glass Body */}
          <rect
            x="0"
            y="0"
            width="58"
            height="58"
            rx="12"
            fill="url(#chipGrad)"
            stroke="url(#glassBorderGleam)"
            strokeWidth="1.8"
          />
          {/* Chip Specular Glare */}
          <path d="M4 14 C4 8, 8 4, 14 4 L44 4 C50 4, 54 8, 54 14 L4 34 Z" fill="#FFFFFF" fillOpacity="0.5" />

          {/* Inner Glowing AI Core Silicon Die */}
          <rect x="15" y="15" width="28" height="28" rx="6" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
          <rect x="20" y="20" width="18" height="18" rx="4" fill="#34D399" fillOpacity="0.4" />
          <circle cx="29" cy="29" r="4.5" fill="#FFFFFF" />
        </g>

        {/* OBJECT 3: FLOATING ANALYTICS MINI WIDGET (Mid-Right) */}
        <g className="animate-float-subtle" transform="translate(605, 235)">
          {/* Glass Card Shadow */}
          <rect x="0" y="0" width="48" height="42" rx="10" fill="#075C32" fillOpacity="0.1" transform="translate(4, 6)" />
          {/* Glass Card Body */}
          <rect
            x="0"
            y="0"
            width="48"
            height="42"
            rx="10"
            fill="url(#emeraldGlassFace)"
            stroke="url(#glassBorderGleam)"
            strokeWidth="1.5"
          />
          {/* Mini Columns */}
          <rect x="10" y="22" width="6" height="12" rx="2" fill="#087A3D" />
          <rect x="21" y="15" width="6" height="19" rx="2" fill="#159B50" />
          <rect x="32" y="9" width="6" height="25" rx="2" fill="#34D399" />
          {/* Trend Dot */}
          <circle cx="35" cy="8" r="2.5" fill="#FFFFFF" />
        </g>

        {/* OBJECT 4: ORBITING TRANSLUCENT EMERALD GLASS SPHERES (CRYSTAL MARBLES) */}

        {/* Marble 1 (Top-Right High Orbit) */}
        <g className="animate-float-gentle">
          <circle cx="625" cy="85" r="14" fill="url(#emeraldMarble1)" />
          {/* Specular White Highlight */}
          <circle cx="620" cy="80" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="619" cy="79" r="2" fill="#FFFFFF" />
        </g>

        {/* Marble 2 (Lower-Right Orbit Floor) */}
        <g className="animate-float-reverse">
          <ellipse cx="648" cy="330" rx="12" ry="4" fill="#075C32" fillOpacity="0.15" />
          <circle cx="645" cy="318" r="15" fill="url(#emeraldMarble2)" />
          {/* Specular Highlight */}
          <circle cx="640" cy="312" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="639" cy="311" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Marble 3 (Background Left Orbit Floating) */}
        <g className="animate-float-subtle">
          <circle cx="270" cy="180" r="9" fill="url(#emeraldMarble1)" opacity="0.85" />
          <circle cx="267" cy="177" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
