import React from "react";
import { VisualType } from "./types";

interface Card3DVisualProps {
  type: VisualType;
}

export function Card3DVisual({ type }: Card3DVisualProps) {
  switch (type) {
    case "ai":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
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
            <circle cx="80" cy="65" r="18" fill="url(#aiCoreGrad)" />
            <circle cx="75" cy="60" r="15" fill="#34D399" fillOpacity="0.3" />
            <circle cx="73" cy="58" r="5" fill="#FFFFFF" fillOpacity="0.8" />

            {/* Synaptic Nodes */}
            <g>
              <circle cx="80" cy="28" r="5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="52" cy="42" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="108" cy="42" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="44" cy="78" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="116" cy="78" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="80" cy="100" r="4.5" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      );

    case "genai":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="genaiCore" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="50%" stopColor="#00B86B" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
              <linearGradient id="genaiHalo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="115" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Neural Token Orbital Rings */}
            <ellipse
              cx="80"
              cy="62"
              rx="52"
              ry="20"
              stroke="url(#genaiHalo)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              transform="rotate(-20 80 62)"
            />
            <ellipse
              cx="80"
              cy="62"
              rx="52"
              ry="20"
              stroke="#087A3D"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="2 3"
              transform="rotate(25 80 62)"
            />

            {/* Central Generative Spark Octahedron */}
            <polygon points="80,36 100,62 80,88 60,62" fill="url(#genaiCore)" stroke="#34D399" strokeWidth="1.5" />
            <polygon points="80,36 100,62 80,62" fill="#FFFFFF" fillOpacity="0.4" />
            <polygon points="60,62 80,62 80,88" fill="#075C32" fillOpacity="0.4" />

            {/* Floating Sparkles & Reasoning Nodes */}
            <g>
              {/* Star Sparkle Top Right */}
              <path
                d="M116 38 Q116 46 124 46 Q116 46 116 54 Q116 46 108 46 Q116 46 116 38 Z"
                fill="#34D399"
              />
              {/* Star Sparkle Bottom Left */}
              <path
                d="M44 72 Q44 78 50 78 Q44 78 44 84 Q44 78 38 78 Q44 78 44 72 Z"
                fill="#00B86B"
              />
              {/* Floating Token Chips */}
              <rect x="104" y="70" width="28" height="13" rx="4" fill="#E8F5E9" stroke="#34D399" strokeWidth="1" />
              <text x="109" y="80" fill="#087A3D" fontSize="7" fontWeight="bold" fontFamily="monospace">RAG</text>

              <rect x="28" y="44" width="30" height="13" rx="4" fill="#E8F5E9" stroke="#087A3D" strokeWidth="1" />
              <text x="32" y="54" fill="#087A3D" fontSize="7" fontWeight="bold" fontFamily="monospace">LLM</text>
            </g>

            {/* Center Core Flash */}
            <circle cx="80" cy="62" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case "ecommerce":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ecomCart" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#DDF5E9" />
              </linearGradient>
              <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="44" ry="10" fill="#075C32" fillOpacity="0.12" />

            {/* Isometric Store Platform Base */}
            <polygon points="80,88 126,104 80,118 34,104" fill="#E8F5E9" stroke="#34D399" strokeWidth="1.2" />
            <polygon points="34,104 80,118 80,121 34,107" fill="#A8C7B0" />
            <polygon points="126,104 80,118 80,121 126,107" fill="#8FB399" />

            {/* Isometric Shopping Cart / Wireframe Basket */}
            <path
              d="M48 62 L60 62 L74 88 L108 88 L120 68 L66 68"
              stroke="#087A3D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Cart Grid Lines */}
            <line x1="78" y1="68" x2="82" y2="88" stroke="#34D399" strokeWidth="1.5" />
            <line x1="92" y1="68" x2="94" y2="88" stroke="#34D399" strokeWidth="1.5" />
            <line x1="106" y1="68" x2="104" y2="88" stroke="#34D399" strokeWidth="1.5" />

            {/* Cart Wheels */}
            <circle cx="76" cy="94" r="4.5" fill="#087A3D" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="104" cy="94" r="4.5" fill="#087A3D" stroke="#FFFFFF" strokeWidth="1.2" />

            {/* Floating Shopping Bag / Package in Cart */}
            <g transform="translate(76, 42)">
              <rect x="0" y="8" width="22" height="20" rx="3" fill="url(#ecomCart)" stroke="#087A3D" strokeWidth="1.2" />
              <path d="M5 8 C5 2 17 2 17 8" stroke="#087A3D" strokeWidth="1.5" fill="none" />
              <line x1="11" y1="12" x2="11" y2="22" stroke="#34D399" strokeWidth="1.5" strokeDasharray="2 2" />
            </g>

            {/* Floating Currency Coin Token */}
            <g transform="translate(50, 32)">
              <circle cx="12" cy="12" r="12" fill="url(#coinGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="8" y="16" fill="#FFFFFF" fontSize="13" fontWeight="bold">$</text>
            </g>

            {/* Conversion Sparkle */}
            <circle cx="124" cy="46" r="3" fill="#34D399" />
            <line x1="124" y1="40" x2="124" y2="52" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="118" y1="46" x2="130" y2="46" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case "erp":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#087A3D]/15 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="posScreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B231A" />
                <stop offset="100%" stopColor="#144D34" />
              </linearGradient>
              <linearGradient id="erpTier" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0F2E9" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="46" ry="10" fill="#075C32" fillOpacity="0.12" />

            {/* Bottom Tier: Stacked Modular ERP Ledger Base */}
            <polygon points="80,94 128,106 80,118 32,106" fill="url(#erpTier)" stroke="#C4D9C8" strokeWidth="1.2" />
            <polygon points="32,106 80,118 80,121 32,109" fill="#A8C7B0" />
            <polygon points="128,106 80,118 80,121 128,109" fill="#8FB399" />

            {/* Middle POS Terminal Base */}
            <polygon points="80,82 116,92 80,102 44,92" fill="#D2E3D6" stroke="#087A3D" strokeWidth="1" />

            {/* Terminal Monitor Stand */}
            <rect x="76" y="68" width="8" height="18" rx="2" fill="#8FB399" />

            {/* Tilted POS Display Monitor */}
            <polygon points="42,30 118,30 118,72 42,72" fill="url(#posScreen)" stroke="#087A3D" strokeWidth="1.5" />
            {/* Monitor Gloss */}
            <polygon points="44,32 88,32 44,66" fill="#FFFFFF" fillOpacity="0.08" />

            {/* POS Screen Metrics & Barcode UI */}
            <rect x="48" y="36" width="38" height="6" rx="1.5" fill="#34D399" fillOpacity="0.8" />
            <rect x="48" y="46" width="22" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="48" y="53" width="28" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.3" />

            {/* Green Laser Scan Line */}
            <line x1="86" y1="42" x2="112" y2="42" stroke="#34D399" strokeWidth="1.8" />

            {/* Receipt Slip Floating Right */}
            <g transform="translate(108, 48)">
              <rect x="0" y="0" width="18" height="24" rx="1" fill="#FFFFFF" stroke="#087A3D" strokeWidth="0.8" />
              <line x1="3" y1="5" x2="15" y2="5" stroke="#34D399" strokeWidth="1.2" />
              <line x1="3" y1="9" x2="12" y2="9" stroke="#64736F" strokeWidth="0.8" />
              <line x1="3" y1="13" x2="14" y2="13" stroke="#64736F" strokeWidth="0.8" />
              <line x1="3" y1="17" x2="9" y2="17" stroke="#087A3D" strokeWidth="1" />
            </g>

            {/* Live Status Check Badge */}
            <circle cx="118" cy="30" r="7" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
            <path d="M115 30 L117 32 L122 27" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );

    case "automation":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gearGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
              <linearGradient id="gearGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#087A3D" />
                <stop offset="100%" stopColor="#075C32" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Automated Data Flow Pipeline Wire */}
            <path
              d="M36 84 C48 84 56 64 80 64 C104 64 112 44 126 44"
              stroke="#34D399"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Flow Trigger Node */}
            <circle cx="36" cy="84" r="7" fill="#E8F5E9" stroke="#087A3D" strokeWidth="1.5" />
            <circle cx="36" cy="84" r="3" fill="#087A3D" />

            {/* Primary Large Automation Cogwheel */}
            <g transform="translate(68, 48)">
              <circle cx="16" cy="16" r="14" fill="url(#gearGrad1)" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Cog Teeth */}
              <rect x="14" y="-2" width="4" height="6" rx="1" fill="#34D399" />
              <rect x="14" y="28" width="4" height="6" rx="1" fill="#087A3D" />
              <rect x="-2" y="14" width="6" height="4" rx="1" fill="#34D399" />
              <rect x="28" y="14" width="6" height="4" rx="1" fill="#087A3D" />
              <circle cx="16" cy="16" r="6" fill="#FFFFFF" stroke="#087A3D" strokeWidth="1.5" />
            </g>

            {/* Secondary Interlocking Gear */}
            <g transform="translate(94, 30)">
              <circle cx="12" cy="12" r="11" fill="url(#gearGrad2)" stroke="#34D399" strokeWidth="1.2" />
              <rect x="10.5" y="-1.5" width="3" height="4.5" rx="0.8" fill="#34D399" />
              <rect x="10.5" y="21" width="3" height="4.5" rx="0.8" fill="#075C32" />
              <rect x="-1.5" y="10.5" width="4.5" height="3" rx="0.8" fill="#34D399" />
              <rect x="21" y="10.5" width="4.5" height="3" rx="0.8" fill="#075C32" />
              <circle cx="12" cy="12" r="4.5" fill="#E8F5E9" />
            </g>

            {/* Floating Action Trigger Badge */}
            <g transform="translate(118, 64)">
              <rect x="0" y="0" width="22" height="22" rx="6" fill="#087A3D" stroke="#34D399" strokeWidth="1.2" />
              {/* Lightning Bolt */}
              <path d="M12 4 L7 12 L12 12 L10 18 L16 10 L11 10 Z" fill="#34D399" />
            </g>

            {/* Sync Pulse Node */}
            <circle cx="80" cy="64" r="4" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        </div>
      );

    case "software":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#087A3D]/15 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
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
            <g>
              <circle cx="118" cy="38" r="8" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <text x="114" y="42" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">&lt;&gt;</text>
            </g>
          </svg>
        </div>
      );

    case "web":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
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
          </svg>
        </div>
      );

    case "cloud":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          {/* Ambient Glow */}
          <div className="absolute w-24 h-24 bg-[#087A3D]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cloudBodyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E0F2E9" />
                <stop offset="100%" stopColor="#A7DEC0" />
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
          </svg>
        </div>
      );

    case "data":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="diskGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E8F5E9" />
                <stop offset="100%" stopColor="#C4E8D1" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* 3D Database Cylinder Disc 1 (Bottom) */}
            <g transform="translate(0, 18)">
              <path d="M50 82 C50 74 110 74 110 82 L110 94 C110 102 50 102 50 94 Z" fill="#8FB399" />
              <ellipse cx="80" cy="82" rx="30" ry="10" fill="url(#diskGrad)" stroke="#087A3D" strokeWidth="1.2" />
              <ellipse cx="80" cy="94" rx="30" ry="10" fill="none" stroke="#087A3D" strokeWidth="1.2" />
            </g>

            {/* 3D Database Cylinder Disc 2 (Middle) */}
            <g transform="translate(0, 4)">
              <path d="M50 72 C50 64 110 64 110 72 L110 84 C110 92 50 92 50 84 Z" fill="#A8C7B0" />
              <ellipse cx="80" cy="72" rx="30" ry="10" fill="url(#diskGrad)" stroke="#087A3D" strokeWidth="1.2" />
              <ellipse cx="80" cy="84" rx="30" ry="10" fill="none" stroke="#087A3D" strokeWidth="1.2" />
            </g>

            {/* 3D Database Cylinder Disc 3 (Top) */}
            <g transform="translate(0, -10)">
              <path d="M50 62 C50 54 110 54 110 62 L110 74 C110 82 50 82 50 74 Z" fill="#D2E3D6" />
              <ellipse cx="80" cy="62" rx="30" ry="10" fill="url(#diskGrad)" stroke="#34D399" strokeWidth="1.5" />
              <ellipse cx="80" cy="74" rx="30" ry="10" fill="none" stroke="#087A3D" strokeWidth="1.2" />
              {/* Disc light indicator */}
              <circle cx="102" cy="62" r="2.5" fill="#34D399" />
            </g>

            {/* Streaming ETL Pipeline Wave */}
            <path
              d="M32 46 C48 34 54 62 80 50 C106 38 114 60 128 46"
              stroke="#34D399"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />

            {/* Floating Metric Growth Node */}
            <g transform="translate(106, 26)">
              <rect x="0" y="0" width="26" height="20" rx="4" fill="#087A3D" stroke="#34D399" strokeWidth="1.2" />
              <line x1="4" y1="14" x2="8" y2="10" stroke="#34D399" strokeWidth="1.5" />
              <line x1="9" y1="12" x2="14" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="15" y1="8" x2="21" y2="3" stroke="#34D399" strokeWidth="1.5" />
            </g>

            {/* Source Node */}
            <circle cx="32" cy="46" r="4.5" fill="#087A3D" stroke="#34D399" strokeWidth="1.2" />
          </svg>
        </div>
      );

    case "mobile":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#087A3D]/15 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B231A" />
                <stop offset="100%" stopColor="#144D34" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.12" />

            {/* Isometric Smartphone Body Stand */}
            <polygon points="56,22 104,22 104,106 56,106" fill="#FFFFFF" stroke="#C4D9C8" strokeWidth="1.5" rx="10" />
            <rect x="58" y="24" width="44" height="80" rx="7" fill="url(#phoneScreen)" stroke="#087A3D" strokeWidth="1.2" />

            {/* Screen Notch & Home Bar */}
            <rect x="74" y="27" width="12" height="2.5" rx="1" fill="#34D399" />
            <rect x="72" y="99" width="16" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.6" />

            {/* Mobile App Glass Cards Floating */}
            <rect x="63" y="36" width="34" height="16" rx="3" fill="#E8F5E9" fillOpacity="0.25" stroke="#34D399" strokeWidth="0.8" />
            <circle cx="70" cy="44" r="3.5" fill="#34D399" />
            <line x1="77" y1="42" x2="92" y2="42" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <line x1="77" y1="46" x2="88" y2="46" stroke="#34D399" strokeWidth="1" strokeLinecap="round" />

            {/* Secondary Floating App Pane (Extruding in 3D) */}
            <g transform="translate(86, 56)">
              <rect x="0" y="0" width="36" height="26" rx="5" fill="#FFFFFF" stroke="#087A3D" strokeWidth="1.2" />
              <rect x="4" y="4" width="28" height="6" rx="2" fill="#E8F5E9" />
              <line x1="4" y1="14" x2="22" y2="14" stroke="#087A3D" strokeWidth="1.2" />
              <line x1="4" y1="19" x2="16" y2="19" stroke="#34D399" strokeWidth="1.2" />
            </g>

            {/* Interactive Touch Ring Ripple */}
            <circle cx="80" cy="74" r="8" stroke="#34D399" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="80" cy="74" r="3" fill="#34D399" />
          </svg>
        </div>
      );

    case "consulting":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="compassRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#087A3D" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Architectural Blueprint Isometric Grid */}
            <polygon points="80,82 126,98 80,114 34,98" fill="#E8F5E9" stroke="#087A3D" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="57" y1="90" x2="103" y2="106" stroke="#34D399" strokeWidth="0.8" />
            <line x1="103" y1="90" x2="57" y2="106" stroke="#34D399" strokeWidth="0.8" />

            {/* 3D Strategic Compass Outer Ring */}
            <circle cx="80" cy="58" r="32" stroke="url(#compassRing)" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="80" cy="58" r="26" stroke="#087A3D" strokeWidth="0.8" strokeOpacity="0.4" />

            {/* Compass Strategic Arrow Pointer */}
            <polygon points="80,32 87,58 80,54 73,58" fill="#34D399" stroke="#087A3D" strokeWidth="1" />
            <polygon points="80,84 87,58 80,62 73,58" fill="#087A3D" stroke="#075C32" strokeWidth="1" />
            <circle cx="80" cy="58" r="5" fill="#FFFFFF" stroke="#087A3D" strokeWidth="1.5" />

            {/* Strategic Milestone Hubs */}
            <circle cx="114" cy="42" r="5" fill="#087A3D" stroke="#34D399" strokeWidth="1.2" />
            <circle cx="46" cy="74" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        </div>
      );

    case "seo":
      return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
          <div className="absolute w-24 h-24 bg-[#34D399]/20 rounded-full blur-xl pointer-events-none -z-10" />

          <svg
            viewBox="0 0 160 130"
            className="w-36 h-28 drop-shadow-xs animate-float-subtle"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#DDF5E9" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="116" rx="42" ry="10" fill="#075C32" fillOpacity="0.1" />

            {/* Search Engine SERP Wireframe Card */}
            <polygon points="40,54 100,54 90,88 30,88" fill="#FFFFFF" stroke="#C4D9C8" strokeWidth="1" />
            <line x1="42" y1="62" x2="72" y2="62" stroke="#087A3D" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="70" x2="84" y2="70" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="40" y1="78" x2="76" y2="78" stroke="#64736F" strokeWidth="1" strokeLinecap="round" />

            {/* Upward Growth Surge Trajectory Arrow */}
            <path
              d="M48 94 C64 90 74 68 114 42"
              stroke="#087A3D"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <polygon points="114,36 122,46 110,48" fill="#087A3D" />

            {/* 3D Magnifying Radar Lens */}
            <circle cx="76" cy="52" r="22" fill="url(#lensGrad)" stroke="#34D399" strokeWidth="2" />
            <line x1="92" y1="68" x2="114" y2="90" stroke="#087A3D" strokeWidth="5" strokeLinecap="round" />
            {/* Lens Reflection */}
            <ellipse cx="70" cy="44" rx="9" ry="4" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(-30 70 44)" />

            {/* #1 Ranking Star Badge */}
            <g transform="translate(112, 24)">
              <circle cx="10" cy="10" r="10" fill="#087A3D" stroke="#34D399" strokeWidth="1.5" />
              <text x="5" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold">#1</text>
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
