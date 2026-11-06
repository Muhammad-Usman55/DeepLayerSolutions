"use client";

import React from "react";
import { motion } from "framer-motion";

export function CTATechVisual() {
  // Floating animations for technology cards
  const floatAnim = (yOffset: number, duration: number, delay: number) => ({
    animate: {
      y: [0, yOffset, 0],
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  });

  return (
    <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/3] sm:aspect-[1.15] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Background Volumetric Green Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#00B86B]/30 via-[#34D399]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-8 w-44 h-44 bg-[#A7F3D0]/30 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating 3D Laptop & Layered Glass Platform SVG */}
      <motion.div
        {...floatAnim(-8, 5, 0)}
        className="w-full h-full relative flex items-center justify-center"
      >
        <svg
          viewBox="0 0 540 440"
          className="w-full h-full overflow-visible drop-shadow-[0_16px_36px_rgba(0,184,107,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Platform Gradients */}
            <linearGradient id="ctaPlatTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#E9FFF2" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="ctaPlatSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9FFF2" />
              <stop offset="100%" stopColor="#BCE8CF" />
            </linearGradient>

            <linearGradient id="ctaNeonRim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00B86B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#008F53" stopOpacity="0.8" />
            </linearGradient>

            {/* Laptop Gradients */}
            <linearGradient id="laptopLid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            <linearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06281B" />
              <stop offset="60%" stopColor="#0B3828" />
              <stop offset="100%" stopColor="#051C13" />
            </linearGradient>

            <linearGradient id="codeGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="40%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#00B86B" />
            </linearGradient>

            {/* Orbit Gradient */}
            <linearGradient id="ctaOrbitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00B86B" stopOpacity="0.2" />
            </linearGradient>

            {/* Glass Card Gradient */}
            <linearGradient id="glassCardGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* 1. Ground Ambient Shadow */}
          <ellipse
            cx="270"
            cy="390"
            rx="190"
            ry="36"
            fill="#00B86B"
            fillOpacity="0.15"
            filter="blur(16px)"
          />

          {/* 2. Layered Glass Platform */}
          {/* Base Platform (Bottom Slab) */}
          <g transform="translate(100, 310)">
            <path
              d="M0 24 L160 52 L340 24 L180 -4 Z"
              fill="url(#ctaPlatTop)"
              stroke="#BCE8CF"
              strokeWidth="2"
            />
            <path
              d="M0 24 L160 52 L160 68 L0 40 Z"
              fill="url(#ctaPlatSide)"
              stroke="#BCE8CF"
              strokeWidth="1.5"
            />
            <path
              d="M160 52 L340 24 L340 40 L160 68 Z"
              fill="#A8DCC0"
              stroke="#BCE8CF"
              strokeWidth="1.5"
            />
          </g>

          {/* Middle Neon Luminous Layer (Emits vibrant green edge) */}
          <g transform="translate(115, 290)">
            <path
              d="M0 20 L145 46 L310 20 L165 -6 Z"
              fill="url(#ctaNeonRim)"
              filter="drop-shadow(0 0 10px rgba(52,211,153,0.8))"
              opacity="0.9"
            />
          </g>

          {/* Top Glass Slab (Pedestal for Laptop) */}
          <g transform="translate(125, 274)">
            <path
              d="M0 18 L135 42 L290 18 L155 -6 Z"
              fill="url(#ctaPlatTop)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path
              d="M0 18 L135 42 L135 52 L0 28 Z"
              fill="url(#ctaPlatSide)"
              stroke="#BCE8CF"
              strokeWidth="1.5"
            />
            <path
              d="M135 42 L290 18 L290 28 L135 52 Z"
              fill="#BCE8CF"
              stroke="#BCE8CF"
              strokeWidth="1.5"
            />
          </g>

          {/* 3. Luminous Orbital Ring (Back Half) */}
          <path
            d="M70 295 C 70 240, 200 210, 360 225 C 450 234, 490 260, 480 295"
            stroke="url(#ctaOrbitGrad)"
            strokeWidth="3"
            strokeDasharray="14 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* 4. Central 3D Modern Laptop */}
          <g transform="translate(160, 75)">
            {/* Laptop Base (Keyboard Deck) */}
            {/* Keyboard Deck Top */}
            <path
              d="M20 180 L150 255 L245 198 L115 125 Z"
              fill="url(#laptopLid)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Keyboard Deck Edge Thickness */}
            <path
              d="M20 180 L150 255 L150 263 L20 188 Z"
              fill="#94A3B8"
            />
            <path
              d="M150 255 L245 198 L245 206 L150 263 Z"
              fill="#64748B"
            />

            {/* Keyboard Grid Inset */}
            <path
              d="M48 175 L140 228 L215 183 L123 130 Z"
              fill="#0F172A"
              opacity="0.85"
            />
            {/* Individual Keys Rows Simulation */}
            <path
              d="M52 173 L138 222 M58 165 L144 214 M64 157 L150 206 M70 149 L156 198"
              stroke="#334155"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Trackpad */}
            <path
              d="M125 233 L152 248 L175 234 L148 219 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1"
            />

            {/* Laptop Screen / Display Lid (Vertical angle tilt) */}
            <g transform="translate(105, -5)">
              {/* Back Aluminum Casing */}
              <path
                d="M10 130 L10 15 L140 -20 L140 95 Z"
                fill="url(#laptopLid)"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              {/* Screen Bezel */}
              <path
                d="M14 126 L14 19 L136 -16 L136 91 Z"
                fill="#020617"
              />
              {/* Inner Glowing Screen Display */}
              <path
                d="M18 122 L18 24 L132 -11 L132 87 Z"
                fill="url(#laptopScreen)"
              />

              {/* Screen Ambient Radiant Glow */}
              <ellipse
                cx="75"
                cy="56"
                rx="40"
                ry="35"
                fill="#00B86B"
                fillOpacity="0.25"
                filter="blur(12px)"
              />

              {/* Glowing Code Symbol </> on Screen */}
              <g
                transform="translate(48, 30) scale(1.15)"
                filter="drop-shadow(0 0 8px rgba(52,211,153,0.95))"
              >
                {/* Left Bracket < */}
                <path
                  d="M16 12 L4 25 L16 38"
                  stroke="url(#codeGlow)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Slash / */}
                <path
                  d="M28 6 L20 44"
                  stroke="#A7F3D0"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Right Bracket > */}
                <path
                  d="M32 12 L44 25 L32 38"
                  stroke="url(#codeGlow)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Screen Specular Corner Gloss Streak */}
              <path
                d="M20 28 L90 -8 L110 -2 L20 44 Z"
                fill="#FFFFFF"
                opacity="0.12"
              />
            </g>
          </g>

          {/* 5. Luminous Orbital Ring (Front Half) */}
          <path
            d="M480 295 C 470 335, 340 370, 180 355 C 90 345, 60 320, 70 295"
            stroke="url(#ctaOrbitGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            filter="drop-shadow(0 0 6px rgba(52,211,153,0.7))"
          />

          {/* 6. Floating Glossy Green Sphere / Marble on Base */}
          <g transform="translate(56, 276)">
            <ellipse cx="14" cy="22" rx="12" ry="5" fill="#00B86B" fillOpacity="0.2" filter="blur(4px)" />
            <circle cx="14" cy="14" r="14" fill="url(#codeGlow)" />
            <ellipse cx="10" cy="8" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.75" />
          </g>
        </svg>
      </motion.div>

      {/* 7. Floating Glassmorphism Cards with Icons */}

      {/* Card 1: AI Chip (Top Left of laptop) */}
      <motion.div
        {...floatAnim(-10, 4.2, 0.2)}
        className="absolute top-2 sm:top-6 left-2 sm:left-6 z-20"
      >
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/85 backdrop-blur-md border border-[#00B86B]/40 shadow-[0_8px_20px_rgba(0,184,107,0.18)]">
          <svg className="w-8 h-8 text-[#00B86B]" viewBox="0 0 32 32" fill="none">
            {/* CPU Chip */}
            <rect x="6" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="#E9FFF2" />
            <rect x="10" y="10" width="12" height="12" rx="2.5" fill="#00B86B" />
            <text x="16" y="19" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              AI
            </text>
            {/* Pins */}
            <path d="M11 2v4M16 2v4M21 2v4M11 26v4M16 26v4M21 26v4M2 11h4M2 16h4M2 21h4M26 11h4M26 16h4M26 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Card 2: Cloud Computing (Top Right of laptop) */}
      <motion.div
        {...floatAnim(-8, 4.8, 0.5)}
        className="absolute top-4 sm:top-8 right-2 sm:right-6 z-20"
      >
        <div className="flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white/85 backdrop-blur-md border border-[#00B86B]/40 shadow-[0_8px_20px_rgba(0,184,107,0.18)]">
          <svg className="w-7 h-7 text-[#00B86B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#E9FFF2" />
          </svg>
        </div>
      </motion.div>

      {/* Card 3: Analytics / Growth Graph (Bottom Left of laptop) */}
      <motion.div
        {...floatAnim(-7, 4.4, 0.8)}
        className="absolute bottom-10 sm:bottom-14 left-4 sm:left-10 z-20"
      >
        <div className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/85 backdrop-blur-md border border-[#00B86B]/40 shadow-[0_8px_20px_rgba(0,184,107,0.18)]">
          <svg className="w-6 h-6 text-[#00B86B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
      </motion.div>

      {/* Card 4: Automation & Settings Gear (Bottom Right of laptop) */}
      <motion.div
        {...floatAnim(-9, 5.2, 1.1)}
        className="absolute bottom-12 sm:bottom-16 right-4 sm:right-8 z-20"
      >
        <div className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/85 backdrop-blur-md border border-[#00B86B]/40 shadow-[0_8px_20px_rgba(0,184,107,0.18)]">
          <svg className="w-6 h-6 text-[#00B86B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" fill="#E9FFF2" />
            <circle cx="12" cy="12" r="3" fill="#00B86B" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
