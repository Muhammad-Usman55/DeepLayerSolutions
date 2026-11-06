import React from "react";

export function Central3DVisual() {
  return (
    <div className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[480px] lg:max-w-[580px] mx-auto aspect-[5/4] flex items-center justify-center select-none overflow-visible">
      {/* Green Ambient Lighting & Radial Glows (Static cached layers) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] h-[260px] sm:h-[360px] bg-gradient-to-tr from-[#087A3D]/20 via-[#34D399]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[#34D399]/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Main 3D Composition SVG */}
      <svg
        viewBox="0 0 640 500"
        className="w-full h-full relative z-10 drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="codeGlowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#087A3D" />
          </linearGradient>

          <linearGradient id="glassFaceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
            <stop offset="40%" stopColor="#F4FAF6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#DDF5E9" stopOpacity="0.82" />
          </linearGradient>

          <linearGradient id="glassBorder" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#34D399" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#087A3D" stopOpacity="0.4" />
          </linearGradient>

          {/* Platform Gradients */}
          <linearGradient id="basePlatformTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#E8F5E9" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D2E8DA" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="tierPlatformTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8F5E9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8E6D3" stopOpacity="0.7" />
          </linearGradient>

          {/* Cube Gradients */}
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DDF5E9" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#087A3D" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#087A3D" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#075C32" stopOpacity="0.9" />
          </linearGradient>

          {/* Database Gradients */}
          <linearGradient id="dbDiskTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E3EDE5" />
          </linearGradient>
          <linearGradient id="dbDiskSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#087A3D" />
            <stop offset="50%" stopColor="#159B50" />
            <stop offset="100%" stopColor="#075C32" />
          </linearGradient>

          {/* Cloud Gradients */}
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#DDF5E9" />
            <stop offset="100%" stopColor="#89D6A8" />
          </linearGradient>
        </defs>

        {/* 8. Soft Ambient Ground Shadows */}
        <ellipse cx="320" cy="445" rx="190" ry="38" fill="#075C32" fillOpacity="0.12" />
        <ellipse cx="320" cy="445" rx="120" ry="22" fill="#087A3D" fillOpacity="0.15" />

        {/* 5. Elegant Orbital Rings (Back Segments) */}
        <g stroke="url(#codeGlowGrad)" strokeWidth="1.6" opacity="0.45">
          <ellipse
            cx="320"
            cy="270"
            rx="230"
            ry="75"
            strokeDasharray="8 6"
            transform="rotate(-16 320 270)"
          />
          <ellipse
            cx="320"
            cy="270"
            rx="180"
            ry="55"
            strokeDasharray="4 4"
            transform="rotate(12 320 270)"
          />
        </g>

        {/* 3. Layered Transparent Platforms Underneath */}
        {/* Tier 1: Large Base Isometric Diamond */}
        <g>
          <polygon
            points="320,340 490,405 320,470 150,405"
            fill="url(#basePlatformTop)"
            stroke="url(#glassBorder)"
            strokeWidth="1.5"
          />
          <polygon
            points="150,405 320,470 320,482 150,417"
            fill="#087A3D"
            fillOpacity="0.35"
          />
          <polygon
            points="490,405 320,470 320,482 490,417"
            fill="#075C32"
            fillOpacity="0.5"
          />
          <g stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.3">
            <line x1="235" y1="372" x2="405" y2="437" />
            <line x1="405" y1="372" x2="235" y2="437" />
          </g>
        </g>

        {/* Tier 2: Stepped Upper Platform */}
        <g>
          <polygon
            points="320,315 445,362 320,410 195,362"
            fill="url(#tierPlatformTop)"
            stroke="#34D399"
            strokeWidth="1.2"
          />
          <polygon
            points="195,362 320,410 320,419 195,371"
            fill="#087A3D"
            fillOpacity="0.5"
          />
          <polygon
            points="445,362 320,410 320,419 445,371"
            fill="#075C32"
            fillOpacity="0.65"
          />
        </g>

        {/* 7. Subtle Database Visualization (Compositor Thread Float) */}
        <g className="animate-float-subtle">
          <ellipse cx="140" cy="330" rx="34" ry="14" fill="url(#dbDiskTop)" stroke="#087A3D" strokeWidth="1" />
          <path d="M106 330V342C106 350 121 356 140 356C159 356 174 350 174 342V330" fill="url(#dbDiskSide)" />

          <ellipse cx="140" cy="315" rx="34" ry="14" fill="url(#dbDiskTop)" stroke="#087A3D" strokeWidth="1" />
          <path d="M106 315V325C106 333 121 339 140 339C159 339 174 333 174 325V315" fill="url(#dbDiskSide)" />

          <ellipse cx="140" cy="300" rx="34" ry="14" fill="url(#dbDiskTop)" stroke="#34D399" strokeWidth="1.2" />
          <path d="M106 300V310C106 318 121 324 140 324C159 324 174 318 174 310V300" fill="url(#dbDiskSide)" />

          {/* Database Glowing Indicator LEDs */}
          <circle cx="125" cy="308" r="2.5" fill="#34D399" />
          <circle cx="135" cy="308" r="2.5" fill="#6EE7B7" />
          <circle cx="125" cy="323" r="2.5" fill="#34D399" />
          <circle cx="135" cy="323" r="2.5" fill="#6EE7B7" />
          <circle cx="125" cy="340" r="2.5" fill="#34D399" />
          <circle cx="135" cy="340" r="2.5" fill="#6EE7B7" />
        </g>

        {/* 6. Green Cloud-Computing Object (Compositor Thread Float) */}
        <g className="animate-float-reverse">
          <ellipse cx="505" cy="195" rx="38" ry="12" fill="#34D399" fillOpacity="0.25" />

          {/* 3D Glassmorphic Cloud Cluster */}
          <path
            d="M480 185C470 185 462 177 462 167C462 158 468 150 477 149C481 138 493 130 506 130C522 130 534 140 537 154C543 154 549 160 549 167C549 175 543 181 535 182C533 184 530 185 526 185L480 185Z"
            fill="url(#cloudGrad)"
            stroke="#087A3D"
            strokeWidth="1.8"
          />
          {/* Cloud Specular Sheen */}
          <path
            d="M482 152C487 141 497 134 507 134C516 134 524 139 528 147"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Pulse Rays from Cloud */}
          <g stroke="#34D399" strokeWidth="1.4" strokeDasharray="3 3">
            <line x1="488" y1="188" x2="488" y2="225" />
            <line x1="518" y1="188" x2="518" y2="235" stroke="#087A3D" />
          </g>
        </g>

        {/* 1 & 2. CENTRAL FLOATING GLASS TECHNOLOGY PANEL WITH LUMINOUS CODE SYMBOL (Compositor Thread Float) */}
        <g className="animate-float-gentle">
          {/* Drop shadow of floating panel */}
          <polygon
            points="230,300 410,240 410,380 230,440"
            fill="#075C32"
            fillOpacity="0.12"
            transform="translate(15, 20)"
          />

          {/* Isometric Glass Panel Body */}
          <polygon
            points="210,135 430,75 430,320 210,380"
            fill="url(#glassFaceGrad)"
            stroke="url(#glassBorder)"
            strokeWidth="2"
          />

          {/* Glass Specular Reflection Highlight Across Panel */}
          <polygon
            points="210,135 340,100 240,372 210,380"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />

          {/* Panel Header Chrome Bar */}
          <polygon
            points="210,135 430,75 430,115 210,175"
            fill="#E8F5E9"
            fillOpacity="0.65"
            stroke="url(#glassBorder)"
            strokeWidth="1"
          />

          {/* Window Control Dots */}
          <circle cx="230" cy="158" r="4.5" fill="#34D399" />
          <circle cx="244" cy="154" r="4.5" fill="#087A3D" />
          <circle cx="258" cy="150" r="4.5" fill="#DDF5E9" stroke="#087A3D" strokeWidth="0.8" />

          {/* Header Code Title in Monospace */}
          <text
            x="280"
            y="143"
            fill="#087A3D"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
            transform="skewY(-15)"
          >
            deeplayer.core.ts
          </text>

          {/* Background Syntax Silhouette Lines */}
          <g stroke="#34D399" strokeWidth="2" strokeOpacity="0.2" strokeLinecap="round" transform="skewY(-15)">
            <line x1="230" y1="210" x2="270" y2="210" />
            <line x1="230" y1="225" x2="310" y2="225" />
            <line x1="245" y1="240" x2="350" y2="240" />
            <line x1="245" y1="255" x2="320" y2="255" />
            <line x1="230" y1="270" x2="260" y2="270" />
          </g>

          {/* 2. THE LUMINOUS GREEN CODE SYMBOL ( < / > ) */}
          <g>
            {/* Left Chevron < */}
            <path
              d="M272 238L240 256L272 274"
              stroke="url(#codeGlowGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M272 238L240 256L272 274"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.85"
            />

            {/* Slash / */}
            <path
              d="M330 220L290 292"
              stroke="url(#codeGlowGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M330 220L290 292"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />

            {/* Right Chevron > */}
            <path
              d="M348 238L380 256L348 274"
              stroke="url(#codeGlowGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M348 238L380 256L348 274"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.85"
            />
          </g>

          {/* Luminous Core Star Highlight at Intersection */}
          <circle cx="310" cy="256" r="4" fill="#FFFFFF" />
          <circle cx="310" cy="256" r="7" fill="#34D399" fillOpacity="0.4" />
        </g>

        {/* 4. Floating Glass Cubes (Compositor Thread) */}
        {/* Cube 1 (Upper Left, Large) */}
        <g className="animate-float-reverse" transform="translate(110, 120)">
          <polygon points="25,0 50,14 25,28 0,14" fill="url(#cubeTop)" stroke="#34D399" strokeWidth="0.8" />
          <polygon points="0,14 25,28 25,56 0,42" fill="url(#cubeLeft)" />
          <polygon points="50,14 25,28 25,56 50,42" fill="url(#cubeRight)" />
          <line x1="25" y1="28" x2="25" y2="56" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
        </g>

        {/* Cube 2 (Lower Right, Medium) */}
        <g className="animate-float-gentle" transform="translate(480, 270)">
          <polygon points="20,0 40,11 20,22 0,11" fill="url(#cubeTop)" stroke="#34D399" strokeWidth="0.8" />
          <polygon points="0,11 20,22 20,44 0,33" fill="url(#cubeLeft)" />
          <polygon points="40,11 20,22 20,44 40,33" fill="url(#cubeRight)" />
          <line x1="20" y1="22" x2="20" y2="44" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.5" />
        </g>

        {/* Cube 3 (Upper Right, Small) */}
        <g className="animate-float-subtle" transform="translate(430, 80)">
          <polygon points="12,0 24,7 12,14 0,7" fill="url(#cubeTop)" stroke="#34D399" strokeWidth="0.6" />
          <polygon points="0,7 12,14 12,28 0,21" fill="url(#cubeLeft)" />
          <polygon points="24,7 12,14 12,28 24,21" fill="url(#cubeRight)" />
        </g>

        {/* 5. Orbital Ring Front Segment with Satellite Node */}
        <g stroke="url(#codeGlowGrad)" strokeWidth="1.8" opacity="0.75">
          <path
            d="M95 240 C140 330 380 370 545 285"
            strokeDasharray="6 4"
          />
        </g>

        {/* Orbiting Satellite Node (Compositor Thread) */}
        <g className="animate-float-reverse">
          <circle cx="545" cy="285" r="7" fill="#087A3D" stroke="#34D399" strokeWidth="2" />
          <circle cx="545" cy="285" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

