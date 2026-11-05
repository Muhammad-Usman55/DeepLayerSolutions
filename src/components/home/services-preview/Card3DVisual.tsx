"use client";

import React from "react";
import { motion } from "framer-motion";

interface Card3DVisualProps {
  type: "ai" | "software" | "web" | "cloud";
}

export function Card3DVisual({ type }: Card3DVisualProps) {

  switch (type) {
    case "ai":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none" />

          <motion.svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-md"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="aiCoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#087A3D" />
                <stop offset="100%" stopColor="#075C32" />
              </linearGradient>
              <linearGradient id="aiGlassRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
              </linearGradient>
              <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="115" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Neural Orbital Ring 1 */}
            <ellipse
              cx="80"
              cy="65"
              rx="56"
              ry="22"
              stroke="url(#aiGlassRing)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              transform="rotate(-15 80 65)"
            />

            {/* Synaptic Interconnections */}
            <g stroke="#34D399" strokeWidth="1.2" strokeOpacity="0.7">
              <line x1="80" y1="65" x2="52" y2="42" />
              <line x1="80" y1="65" x2="108" y2="42" />
              <line x1="80" y1="65" x2="44" y2="78" />
              <line x1="80" y1="65" x2="116" y2="78" />
              <line x1="80" y1="65" x2="80" y2="28" />
              <line x1="80" y1="65" x2="80" y2="100" />
              <line x1="52" y1="42" x2="80" y2="28" />
              <line x1="108" y1="42" x2="80" y2="28" />
              <line x1="44" y1="78" x2="80" y2="100" />
              <line x1="116" y1="78" x2="80" y2="100" />
            </g>

            {/* Central 3D Synaptic Nucleus */}
            <circle cx="80" cy="65" r="18" fill="url(#aiCoreGrad)" filter="url(#aiGlow)" />
            <circle cx="75" cy="60" r="15" fill="#34D399" fillOpacity="0.3" />
            <circle cx="73" cy="58" r="5" fill="#FFFFFF" fillOpacity="0.8" />

            {/* Synaptic Nodes */}
            <g filter="url(#aiGlow)">
              <circle cx="80" cy="28" r="5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="52" cy="42" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="108" cy="42" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="44" cy="78" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="116" cy="78" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="80" cy="100" r="4.5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
            </g>
          </motion.svg>
        </div>
      );

    case "software":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#087A3D]/15 rounded-full blur-xl pointer-events-none" />

          <motion.svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-md"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="laptopChassis" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E3EDE5" />
              </linearGradient>
              <linearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B231A" />
                <stop offset="100%" stopColor="#103828" />
              </linearGradient>
              <linearGradient id="screenAccent" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="46" ry="10" fill="#075C32" fillOpacity="0.12" />

            {/* Isometric Laptop Base Deck */}
            <polygon
              points="80,78 132,97 80,116 28,97"
              fill="url(#laptopChassis)"
              stroke="#C4D9C8"
              strokeWidth="1.2"
            />
            {/* Base Deck Thickness */}
            <polygon
              points="28,97 80,116 80,120 28,101"
              fill="#A8C7B0"
            />
            <polygon
              points="132,97 80,116 80,120 132,101"
              fill="#8FB399"
            />

            {/* Keyboard Deck Detail & Trackpad */}
            <polygon
              points="80,82 118,96 80,107 42,96"
              fill="#D2E3D6"
              fillOpacity="0.6"
            />
            <polygon
              points="80,108 94,113 80,115 66,113"
              fill="#FFFFFF"
              stroke="#B4CEBC"
              strokeWidth="0.8"
            />

            {/* Laptop Screen Display (Tilted Isometric Back) */}
            <polygon
              points="40,32 120,32 120,86 40,86"
              fill="url(#laptopScreen)"
              stroke="#087A3D"
              strokeWidth="1.5"
              rx="4"
            />
            {/* Glass Display Shine */}
            <polygon
              points="42,34 90,34 42,75"
              fill="#FFFFFF"
              fillOpacity="0.08"
            />

            {/* Screen Syntax Lines */}
            <g stroke="#34D399" strokeWidth="2" strokeLinecap="round">
              <line x1="50" y1="44" x2="72" y2="44" />
              <line x1="76" y1="44" x2="90" y2="44" stroke="#FFFFFF" strokeOpacity="0.7" />
              <line x1="56" y1="52" x2="105" y2="52" />
              <line x1="56" y1="60" x2="88" y2="60" stroke="#087A3D" />
              <line x1="50" y1="68" x2="68" y2="68" />
              <line x1="72" y1="68" x2="102" y2="68" stroke="#34D399" />
            </g>

            {/* Glowing Code Node Floating out of Screen */}
            <g filter="url(#aiGlow)">
              <circle cx="118" cy="38" r="8" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <text x="114" y="42" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">&lt;&gt;</text>
            </g>
          </motion.svg>
        </div>
      );

    case "web":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none" />

          <motion.svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-md"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="globeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8F5E9" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#C4E8D1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#087A3D" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="globeRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Glass Globe Sphere */}
            <circle cx="80" cy="62" r="38" fill="url(#globeGrad)" stroke="#34D399" strokeWidth="1.5" />

            {/* Latitude Wireframe Curves */}
            <ellipse cx="80" cy="62" rx="38" ry="14" stroke="#087A3D" strokeWidth="1.2" strokeOpacity="0.5" />
            <ellipse cx="80" cy="48" rx="32" ry="9" stroke="#087A3D" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 2" />
            <ellipse cx="80" cy="76" rx="32" ry="9" stroke="#087A3D" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 2" />

            {/* Longitude Wireframe Meridians */}
            <ellipse cx="80" cy="62" rx="15" ry="38" stroke="#087A3D" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="80" y1="24" x2="80" y2="100" stroke="#087A3D" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Digital Orbit Ring */}
            <ellipse
              cx="80"
              cy="62"
              rx="54"
              ry="20"
              stroke="url(#globeRing)"
              strokeWidth="1.8"
              transform="rotate(-25 80 62)"
            />

            {/* Floating Web Server Nodes */}
            <circle cx="122" cy="44" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
            <circle cx="38" cy="80" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="92" cy="62" r="3.5" fill="#FFFFFF" stroke="#087A3D" strokeWidth="1.2" />

            {/* Subtle Sphere Reflection Highlight */}
            <ellipse cx="68" cy="46" rx="14" ry="7" fill="#FFFFFF" fillOpacity="0.5" transform="rotate(-30 68 46)" />
          </motion.svg>
        </div>
      );

    case "cloud":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#087A3D]/20 rounded-full blur-xl pointer-events-none" />

          <motion.svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-md"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cloudBodyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E0F2E9" />
                <stop offset="100%" stopColor="#A7DEC0" />
              </linearGradient>
              <linearGradient id="cloudIsoBase" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="44" ry="10" fill="#075C32" fillOpacity="0.12" />

            {/* Isometric Base Server Platform */}
            <polygon
              points="80,92 120,105 80,118 40,105"
              fill="#E8F5E9"
              stroke="#087A3D"
              strokeWidth="1.2"
            />
            <polygon
              points="40,105 80,118 80,121 40,108"
              fill="#A8C7B0"
            />
            <polygon
              points="120,105 80,118 80,121 120,108"
              fill="#8FB399"
            />

            {/* Uplink / Downlink Glowing Laser Columns */}
            <line x1="68" y1="78" x2="68" y2="102" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="92" y1="78" x2="92" y2="102" stroke="#087A3D" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* 3D Glassmorphic Cloud Cluster */}
            <path
              d="M52 75C44 75 38 69 38 61C38 54 43 48 50 47C53 38 62 32 72 32C84 32 94 40 96 51C101 51 106 55 106 61C106 67 101 72 95 73C93 74 91 75 88 75L52 75Z"
              fill="url(#cloudBodyGrad)"
              stroke="#087A3D"
              strokeWidth="1.8"
            />

            {/* Cloud Highlight Sheen */}
            <path
              d="M54 48C57 40 65 35 73 35C80 35 87 39 90 46"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Floating DevOps Microservice Cube */}
            <g transform="translate(100, 36)">
              <polygon points="12,0 22,5 12,10 2,5" fill="#34D399" stroke="#087A3D" strokeWidth="0.8" />
              <polygon points="2,5 12,10 12,18 2,13" fill="#087A3D" />
              <polygon points="22,5 12,10 12,18 22,13" fill="#075C32" />
            </g>

            {/* Sync Arrows Emblem inside Cloud */}
            <circle cx="70" cy="58" r="8" fill="#087A3D" fillOpacity="0.15" />
            <path
              d="M67 56L70 53L73 56M73 60L70 63L67 60"
              stroke="#087A3D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      );

    default:
      return null;
  }
}

