"use client";

import React from "react";
import { motion } from "framer-motion";

export function FooterDatabaseVisual() {
  return (
    <div className="relative w-[180px] sm:w-[220px] lg:w-[240px] aspect-square flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Radial Green Light Behind Database */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#00B86B]/25 via-[#34D399]/20 to-transparent rounded-full blur-2xl -z-10" />

      {/* Floating 3D Database Container */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        <svg
          viewBox="0 0 280 280"
          className="w-full h-full overflow-visible drop-shadow-[0_12px_24px_rgba(0,184,107,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Base Pedestal Gradients */}
            <linearGradient id="pedestalTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#E9FFF2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D5F5E3" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="pedestalSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9FFF2" />
              <stop offset="100%" stopColor="#C4EBD0" />
            </linearGradient>

            {/* Database Disks Gradients */}
            <linearGradient id="dbDiskCap" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="35%" stopColor="#34D399" />
              <stop offset="75%" stopColor="#00B86B" />
              <stop offset="100%" stopColor="#008F53" />
            </linearGradient>

            <linearGradient id="dbDiskBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#008F53" />
              <stop offset="25%" stopColor="#00B86B" />
              <stop offset="70%" stopColor="#10B981" />
              <stop offset="90%" stopColor="#00B86B" />
              <stop offset="100%" stopColor="#007A46" />
            </linearGradient>

            {/* Specular Highlight Sheen */}
            <linearGradient id="specularGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Orbit Ring Gradient */}
            <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00B86B" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Ambient Ground Shadow */}
          <ellipse
            cx="140"
            cy="242"
            rx="92"
            ry="24"
            fill="#00B86B"
            fillOpacity="0.14"
            filter="blur(8px)"
          />

          {/* 1. Base Pedestal Platform */}
          <g transform="translate(0, 16)">
            {/* Pedestal Side */}
            <path
              d="M38 206 C38 206 38 218 38 218 C38 234 83 246 140 246 C197 246 242 234 242 218 L242 206 Z"
              fill="url(#pedestalSide)"
              stroke="#DFEDE5"
              strokeWidth="1.5"
            />
            {/* Pedestal Top Face */}
            <ellipse
              cx="140"
              cy="206"
              rx="102"
              ry="26"
              fill="url(#pedestalTop)"
              stroke="#DFEDE5"
              strokeWidth="1.5"
            />
          </g>

          {/* 2. Floating Luminous Green Orbit Ring (Back Half) */}
          <path
            d="M24 165 C24 135 75 110 140 110 C205 110 256 135 256 165"
            stroke="url(#orbitGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* 3. Three Stacked Glossy Database Cylinders */}
          <g transform="translate(74, 52)">
            {/* Cylinder 3 (Bottom Disk) */}
            <g transform="translate(0, 94)">
              {/* Body */}
              <path
                d="M0 24 C0 24 0 54 0 54 C0 69 29.5 80 66 80 C102.5 80 132 69 132 54 L132 24 Z"
                fill="url(#dbDiskBody)"
              />
              {/* Specular Highlight Streak */}
              <path
                d="M50 24 L50 80 L76 80 L76 24 Z"
                fill="url(#specularGlow)"
                opacity="0.35"
              />
              {/* Cap Rim */}
              <ellipse cx="66" cy="24" rx="66" ry="19" fill="url(#dbDiskCap)" />
              {/* Inner Gloss Rim */}
              <ellipse
                cx="66"
                cy="23"
                rx="63"
                ry="17"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
            </g>

            {/* Cylinder 2 (Middle Disk) */}
            <g transform="translate(0, 48)">
              {/* Body */}
              <path
                d="M0 24 C0 24 0 54 0 54 C0 69 29.5 80 66 80 C102.5 80 132 69 132 54 L132 24 Z"
                fill="url(#dbDiskBody)"
              />
              {/* Specular Highlight Streak */}
              <path
                d="M50 24 L50 80 L76 80 L76 24 Z"
                fill="url(#specularGlow)"
                opacity="0.35"
              />
              {/* Cap Rim */}
              <ellipse cx="66" cy="24" rx="66" ry="19" fill="url(#dbDiskCap)" />
              {/* Inner Gloss Rim */}
              <ellipse
                cx="66"
                cy="23"
                rx="63"
                ry="17"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
            </g>

            {/* Cylinder 1 (Top Disk) */}
            <g transform="translate(0, 2)">
              {/* Body */}
              <path
                d="M0 24 C0 24 0 54 0 54 C0 69 29.5 80 66 80 C102.5 80 132 69 132 54 L132 24 Z"
                fill="url(#dbDiskBody)"
              />
              {/* Specular Highlight Streak */}
              <path
                d="M50 24 L50 80 L76 80 L76 24 Z"
                fill="url(#specularGlow)"
                opacity="0.4"
              />
              {/* Cap Rim */}
              <ellipse cx="66" cy="24" rx="66" ry="19" fill="url(#dbDiskCap)" />
              {/* Top Surface Specular Crescent */}
              <ellipse
                cx="66"
                cy="22"
                rx="62"
                ry="16"
                fill="none"
                stroke="#A7F3D0"
                strokeOpacity="0.75"
                strokeWidth="2"
              />
            </g>
          </g>

          {/* 4. Floating Luminous Green Orbit Ring (Front Half) */}
          <path
            d="M24 165 C24 195 75 220 140 220 C205 220 256 195 256 165"
            stroke="url(#orbitGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            filter="drop-shadow(0 0 6px rgba(52,211,153,0.6))"
          />

          {/* Small Floating Luminous Sparkles on Orbit */}
          <circle cx="48" cy="180" r="3" fill="#86EFAC" filter="drop-shadow(0 0 4px #86EFAC)" />
          <circle cx="230" cy="184" r="2.5" fill="#34D399" filter="drop-shadow(0 0 4px #34D399)" />
        </svg>
      </motion.div>
    </div>
  );
}

