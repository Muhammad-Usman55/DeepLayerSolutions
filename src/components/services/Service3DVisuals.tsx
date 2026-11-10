"use client";

import React from "react";

// ==========================================
// 1. AI & Machine Learning 3D Visual
// Neural Core, Synaptic Network & Prediction Tensor Matrix
// ==========================================
export function AIMachineLearning3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="aiShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aiGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F0FDF4" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="aiCoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="aiCubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9FFF2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#BCE8CF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="aiCubeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="aiCubeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#075B3E" />
          </linearGradient>
        </defs>

        {/* Ground ambient shadow */}
        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#aiShadow)" />

        {/* Glass Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#aiGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M85 150 L170 119 L255 150" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" fill="none" />
        </g>

        {/* Central 3D Tensor Cube */}
        <g transform="translate(170, 115)">
          {/* Main Core Cube */}
          <path d="M0 -38 L32 -20 L0 -2 L-32 -20 Z" fill="url(#aiCubeTop)" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M-32 -20 L0 -2 L0 36 L-32 18 Z" fill="url(#aiCubeL)" />
          <path d="M0 -2 L32 -20 L32 18 L0 36 Z" fill="url(#aiCubeR)" />

          {/* Neural Synapse lines connecting to satellite nodes */}
          <line x1="-32" y1="-20" x2="-68" y2="-45" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="32" y1="-20" x2="68" y2="-45" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="0" y1="-38" x2="0" y2="-72" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="0" y1="36" x2="-45" y2="52" stroke="#008F53" strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="0" y1="36" x2="45" y2="52" stroke="#008F53" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Satellite Neural Nodes */}
          <g transform="translate(-68, -45)">
            <circle cx="0" cy="0" r="12" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="6" fill="#008F53" />
          </g>
          <g transform="translate(68, -45)">
            <circle cx="0" cy="0" r="12" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="6" fill="#008F53" />
          </g>
          <g transform="translate(0, -72)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#008F53" strokeWidth="2" />
            <circle cx="0" cy="0" r="7" fill="url(#aiCoreGrad)" />
          </g>
          <g transform="translate(-45, 52)">
            <circle cx="0" cy="0" r="8" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="3.5" fill="#008F53" />
          </g>
          <g transform="translate(45, 52)">
            <circle cx="0" cy="0" r="8" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="3.5" fill="#008F53" />
          </g>

          {/* Floating Data Wave Rings */}
          <ellipse cx="0" cy="-2" rx="54" ry="20" fill="none" stroke="#00B86B" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="125" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">99.4% Precision</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 2. Generative AI & LLM Solutions 3D Visual
// Multi-Agent Vector Cube, Semantic Rings & Prompt Stream
// ==========================================
export function GenerativeAILLM3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="llmShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="llmGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="llmCoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#075B3E" />
          </linearGradient>
          <linearGradient id="llmTokenGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#00B86B" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#llmShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#llmGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Floating LLM Vector Prism & Sparkles */}
        <g transform="translate(170, 110)">
          {/* Outer Holographic Semantic Ring */}
          <ellipse cx="0" cy="0" rx="68" ry="26" fill="none" stroke="#00B86B" strokeWidth="1.8" strokeDasharray="6 4" transform="rotate(-15)" />
          <ellipse cx="0" cy="0" rx="55" ry="20" fill="none" stroke="#008F53" strokeWidth="1.2" strokeDasharray="4 4" transform="rotate(25)" />

          {/* Central AI Knowledge Prism */}
          <path d="M0 -42 L34 -20 L0 2 L-34 -20 Z" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.5" fillOpacity="0.95" />
          <path d="M-34 -20 L0 2 L0 42 L-34 20 Z" fill="url(#llmCoreGrad)" />
          <path d="M0 2 L34 -20 L34 20 L0 42 Z" fill="#008F53" />

          {/* Central Embedded Sparkle Symbol */}
          <path d="M0 -15 Q0 -6 8 -6 Q0 -6 0 3 Q0 -6 -8 -6 Q0 -6 0 -15 Z" fill="#FFFFFF" />

          {/* Floating Context Tokens */}
          <g transform="translate(-62, -25)">
            <rect x="0" y="0" width="34" height="18" rx="5" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.06))" />
            <text x="7" y="13" fill="#008F53" fontSize="9" fontFamily="monospace" fontWeight="bold">RAG</text>
          </g>
          <g transform="translate(38, -32)">
            <rect x="0" y="0" width="46" height="18" rx="5" fill="#FFFFFF" stroke="#008F53" strokeWidth="1" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.06))" />
            <text x="6" y="13" fill="#008F53" fontSize="9" fontFamily="monospace" fontWeight="bold">vLLM</text>
          </g>
          <g transform="translate(-48, 28)">
            <rect x="0" y="0" width="44" height="18" rx="5" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1" />
            <text x="6" y="13" fill="#008F53" fontSize="9" fontFamily="monospace" fontWeight="bold">Agent</text>
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="125" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">&lt;350ms RAG</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 3. Custom Software Development 3D Visual
// Modular Microservices Cube & API Gateway Event Bus
// ==========================================
export function CustomSoftware3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="csShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="csGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="csMod1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="csMod2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#075B3E" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#csShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#csGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Modular Microservice Hexagon Stack */}
        <g transform="translate(170, 105)">
          {/* Lower Tier Service Block */}
          <path d="M-40 -10 L0 -28 L40 -10 L0 8 Z" fill="#D5F9E6" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M-40 -10 L0 8 L0 26 L-40 8 Z" fill="url(#csMod1)" />
          <path d="M0 8 L40 -10 L40 8 L0 26 Z" fill="url(#csMod2)" />

          {/* Elevated Upper Tier Service Block (Separated Architecture) */}
          <g transform="translate(0, -38)">
            <path d="M-28 -8 L0 -22 L28 -8 L0 6 Z" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" />
            <path d="M-28 -8 L0 6 L0 20 L-28 6 Z" fill="#34D399" />
            <path d="M0 6 L28 -8 L28 6 L0 20 Z" fill="#008F53" />
            {/* Code symbol on top face */}
            <path d="M-8 -7 L-4 -12 L-4 -10" stroke="#008F53" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 -7 L4 -12 L4 -10" stroke="#008F53" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Side satellite services */}
          <g transform="translate(-56, -10)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#008F53" strokeWidth="1.5" />
            <path d="M-6 -2 L-2 -5 L-2 1 M6 -2 L2 -5 L2 1" stroke="#008F53" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="14" y1="0" x2="26" y2="0" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
          <g transform="translate(56, -10)">
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#008F53" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#00B86B" />
            <line x1="-14" y1="0" x2="-26" y2="0" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">Zero Downtime</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 4. Web Development 3D Visual
// Glass Browser Frame & SSR Edge Hydration Stack
// ==========================================
export function WebDevelopment3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="webShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="webGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="webWindow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#webShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#webGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 3D Browser Window with Edge UI Stack */}
        <g transform="translate(170, 110)">
          {/* Main 3D Browser Viewport */}
          <g transform="rotate(-6)">
            <rect x="-65" y="-60" width="130" height="85" rx="8" fill="url(#webWindow)" stroke="#00B86B" strokeWidth="1.8" filter="drop-shadow(0 10px 20px rgba(0,143,83,0.12))" />
            
            {/* Browser Header Bar */}
            <path d="M-65 -52 L65 -52" stroke="#DFEDE5" strokeWidth="1" />
            <circle cx="-53" cy="-56" r="3" fill="#EF4444" />
            <circle cx="-44" cy="-56" r="3" fill="#F59E0B" />
            <circle cx="-35" cy="-56" r="3" fill="#10B981" />

            {/* URL Search Bar */}
            <rect x="-24" y="-58" width="80" height="5" rx="2.5" fill="#E9FFF2" />

            {/* Content Wireframe Blocks */}
            <rect x="-53" y="-42" width="50" height="24" rx="4" fill="#008F53" fillOpacity="0.12" />
            <rect x="5" y="-42" width="48" height="10" rx="3" fill="#00B86B" fillOpacity="0.2" />
            <rect x="5" y="-28" width="34" height="6" rx="2" fill="#64736F" fillOpacity="0.2" />

            {/* Bottom Row Blocks */}
            <rect x="-53" y="-10" width="30" height="22" rx="3" fill="#008F53" fillOpacity="0.15" />
            <rect x="-17" y="-10" width="30" height="22" rx="3" fill="#00B86B" fillOpacity="0.15" />
            <rect x="19" y="-10" width="34" height="22" rx="3" fill="#34D399" fillOpacity="0.2" />
          </g>

          {/* Floating Next.js / Edge Pill */}
          <g transform="translate(42, 12)">
            <rect x="0" y="0" width="55" height="22" rx="6" fill="#FFFFFF" stroke="#008F53" strokeWidth="1.2" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))" />
            <text x="7" y="15" fill="#008F53" fontSize="10" fontFamily="monospace" fontWeight="bold">Next.js</text>
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">100 Lighthouse</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 5. Data Engineering & Analytics 3D Visual
// Lakehouse Data Tower & Real-Time Pipeline Stream
// ==========================================
export function DataEngineering3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="deShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="deGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="deCylGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="50%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#075B3E" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#deShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#deGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 3D Lakehouse Multi-Tier Cylinders */}
        <g transform="translate(170, 105)">
          {/* Bottom Tier Cylinder */}
          <g transform="translate(0, 16)">
            <ellipse cx="0" cy="18" rx="42" ry="12" fill="url(#deCylGrad)" />
            <path d="M-42 0 L-42 18 C-42 24.6 42 24.6 42 18 L42 0 Z" fill="url(#deCylGrad)" />
            <ellipse cx="0" cy="0" rx="42" ry="12" fill="#D5F9E6" stroke="#FFFFFF" strokeWidth="1" />
          </g>

          {/* Middle Tier Cylinder */}
          <g transform="translate(0, -10)">
            <ellipse cx="0" cy="18" rx="34" ry="10" fill="url(#deCylGrad)" />
            <path d="M-34 0 L-34 18 C-34 23.5 34 23.5 34 18 L34 0 Z" fill="url(#deCylGrad)" />
            <ellipse cx="0" cy="0" rx="34" ry="10" fill="#E9FFF2" stroke="#FFFFFF" strokeWidth="1" />
          </g>

          {/* Top Tier Cylinder */}
          <g transform="translate(0, -36)">
            <ellipse cx="0" cy="18" rx="26" ry="8" fill="url(#deCylGrad)" />
            <path d="M-26 0 L-26 18 C-26 22.4 26 22.4 26 18 L26 0 Z" fill="url(#deCylGrad)" />
            <ellipse cx="0" cy="0" rx="26" ry="8" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" />
          </g>

          {/* Flowing Data Stream Ring */}
          <ellipse cx="0" cy="0" rx="65" ry="24" fill="none" stroke="#00B86B" strokeWidth="1.8" strokeDasharray="5 5" transform="rotate(-18)" />
          <circle cx="58" cy="-18" r="4.5" fill="#00B86B" />
          <circle cx="-58" cy="18" r="3.5" fill="#008F53" />
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">10M+ Events/s</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 6. Cloud Solutions & DevOps 3D Visual
// Multi-Cloud Kubernetes Pod Cluster & CI/CD Mesh
// ==========================================
export function CloudDevOps3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="cdShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cdGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="cdCloudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#cdShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#cdGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 3D Cloud Node Cluster */}
        <g transform="translate(170, 110)">
          {/* Central Cloud Badge */}
          <path
            d="M-30 0 C-36 -12 -22 -28 -5 -24 C3 -36 28 -34 32 -18 C44 -16 46 4 34 12 C32 18 10 20 -4 16 C-18 20 -30 12 -30 0 Z"
            fill="url(#cdCloudGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            filter="drop-shadow(0 8px 16px rgba(0,143,83,0.18))"
          />

          {/* Surrounding Kubernetes Pod Nodes */}
          <g transform="translate(-55, -28)">
            <rect x="0" y="0" width="22" height="22" rx="6" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" />
            <circle cx="11" cy="11" r="4" fill="#008F53" />
            <line x1="22" y1="16" x2="38" y2="22" stroke="#00B86B" strokeWidth="1.2" strokeDasharray="2 2" />
          </g>
          <g transform="translate(42, -28)">
            <rect x="0" y="0" width="22" height="22" rx="6" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" />
            <circle cx="11" cy="11" r="4" fill="#008F53" />
            <line x1="0" y1="16" x2="-14" y2="22" stroke="#00B86B" strokeWidth="1.2" strokeDasharray="2 2" />
          </g>
          <g transform="translate(0, 32)">
            <rect x="-14" y="0" width="28" height="18" rx="5" fill="#E9FFF2" stroke="#008F53" strokeWidth="1.2" />
            <text x="-9" y="13" fill="#008F53" fontSize="9" fontFamily="monospace" fontWeight="bold">K8s</text>
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">99.99% Multi-Cloud</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 7. Mobile App Development 3D Visual
// Dual Smartphone Stage (iOS & Android Mockup)
// ==========================================
export function MobileApp3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="mbShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mbGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="mbScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9FFF2" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#mbShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#mbGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Dual Phone Frames */}
        <g transform="translate(170, 110)">
          {/* Secondary Android Phone (Back) */}
          <g transform="translate(14, -14) rotate(10)">
            <rect x="-24" y="-45" width="48" height="85" rx="8" fill="#D5F9E6" stroke="#008F53" strokeWidth="1.5" />
            <rect x="-20" y="-41" width="40" height="77" rx="5" fill="#FFFFFF" />
            <circle cx="0" cy="-35" r="2" fill="#008F53" />
          </g>

          {/* Primary iOS Phone (Front) */}
          <g transform="translate(-16, 0) rotate(-6)">
            <rect x="-26" y="-50" width="52" height="94" rx="10" fill="#FFFFFF" stroke="#00B86B" strokeWidth="2" filter="drop-shadow(0 12px 24px rgba(0,143,83,0.18))" />
            <rect x="-22" y="-46" width="44" height="86" rx="7" fill="url(#mbScreen)" />
            {/* Dynamic Island pill */}
            <rect x="-8" y="-42" width="16" height="4" rx="2" fill="#142A27" />
            {/* Screen UI Wireframe */}
            <circle cx="0" cy="-22" r="10" fill="#008F53" fillOpacity="0.2" />
            <rect x="-14" y="-6" width="28" height="5" rx="2.5" fill="#008F53" />
            <rect x="-10" y="4" width="20" height="4" rx="2" fill="#64736F" fillOpacity="0.4" />
            <rect x="-16" y="16" width="32" height="14" rx="4" fill="#00B86B" fillOpacity="0.15" />
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">Native 60 FPS</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 8. IT Consulting & Advisory 3D Visual
// Enterprise Radar & Strategic Compass Pedestal
// ==========================================
export function ITConsulting3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="itShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="itGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="itNeedle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#itShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#itGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 3D Strategic Compass & Radar Rings */}
        <g transform="translate(170, 110)">
          {/* Compass Base Rim */}
          <ellipse cx="0" cy="0" rx="60" ry="26" fill="#FFFFFF" stroke="#00B86B" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(0,143,83,0.15))" />
          <ellipse cx="0" cy="0" rx="46" ry="19" fill="#E9FFF2" stroke="#008F53" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="0" cy="0" rx="30" ry="12" fill="#D5F9E6" />

          {/* Compass Directional Lines */}
          <line x1="-54" y1="0" x2="54" y2="0" stroke="#008F53" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#008F53" strokeWidth="1" strokeDasharray="2 2" />

          {/* 3D Elevated Compass Needle pointing forward */}
          <g transform="rotate(-30)">
            <polygon points="0,-36 8,-2 0,4 -8,-2" fill="url(#itNeedle)" stroke="#FFFFFF" strokeWidth="1" filter="drop-shadow(0 4px 8px rgba(0,143,83,0.3))" />
            <polygon points="0,4 8,-2 0,16 -8,-2" fill="#075B3E" />
            <circle cx="0" cy="-2" r="4.5" fill="#FFFFFF" stroke="#008F53" strokeWidth="1.5" />
          </g>

          {/* Milestone Waypoint Pins */}
          <g transform="translate(38, -14)">
            <circle cx="0" cy="0" r="5" fill="#00B86B" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
          <g transform="translate(-40, 10)">
            <circle cx="0" cy="0" r="4" fill="#008F53" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">-40% TCO Costs</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 9. SEO & Search Engine Optimization 3D Visual
// 3D SERP Pedestal, Organic Growth Graph & Search Radar
// ==========================================
export function SEO3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="seoShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="seoGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#D5F9E6" />
          </linearGradient>
          <linearGradient id="seoBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#075B3E" />
          </linearGradient>
        </defs>

        <ellipse cx="170" cy="195" rx="110" ry="26" fill="url(#seoShadow)" />

        {/* Base Pedestal */}
        <g>
          <path d="M75 150 L170 185 L170 194 L75 159 Z" fill="#9BD8B6" fillOpacity="0.85" />
          <path d="M170 185 L265 150 L265 159 L170 194 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M75 150 L170 115 L265 150 L170 185 Z" fill="url(#seoGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 3D SERP Architecture & Upward Growth Vectors */}
        <g transform="translate(170, 110)">
          {/* Ascending Metric Bars */}
          <g transform="translate(-40, 20)">
            <rect x="0" y="-18" width="14" height="18" rx="3" fill="#D5F9E6" stroke="#00B86B" strokeWidth="1" />
          </g>
          <g transform="translate(-20, 20)">
            <rect x="0" y="-32" width="14" height="32" rx="3" fill="#A7F3D0" stroke="#00B86B" strokeWidth="1" />
          </g>
          <g transform="translate(0, 20)">
            <rect x="0" y="-48" width="14" height="48" rx="3" fill="#34D399" stroke="#008F53" strokeWidth="1" />
          </g>
          <g transform="translate(20, 20)">
            <rect x="0" y="-68" width="14" height="68" rx="3" fill="url(#seoBarGrad)" stroke="#FFFFFF" strokeWidth="1.2" filter="drop-shadow(0 4px 10px rgba(0,143,83,0.3))" />
            {/* Rank 1 Star Badge */}
            <circle cx="7" cy="-76" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
            <text x="5" y="-73" fill="#FFFFFF" fontSize="8" fontWeight="bold">1</text>
          </g>

          {/* Upward Growth Trendline */}
          <path
            d="M-45 8 Q-10 -20 28 -66"
            fill="none"
            stroke="#008F53"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Search Radar Magnifier Glass */}
          <g transform="translate(-25, -28) rotate(-15)">
            <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#00B86B" strokeWidth="2.5" fillOpacity="0.9" filter="drop-shadow(0 6px 14px rgba(0,143,83,0.18))" />
            <line x1="12" y1="12" x2="24" y2="24" stroke="#008F53" strokeWidth="4" strokeLinecap="round" />
            {/* Inner check inside search glass */}
            <path d="M-6 0 L-2 4 L6 -4" fill="none" stroke="#008F53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* SERP Search Query Pill */}
          <g transform="translate(-50, 32)">
            <rect x="0" y="0" width="100" height="20" rx="10" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
            <circle cx="10" cy="10" r="4" fill="#00B86B" />
            <text x="20" y="14" fill="#142A27" fontSize="9" fontFamily="monospace" fontWeight="bold">google rank #1</text>
          </g>
        </g>

        {/* Telemetry Pill Badge */}
        <g transform="translate(195, 42)">
          <rect x="0" y="0" width="130" height="30" rx="15" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="15" cy="15" r="4" fill="#00B86B" />
          <text x="26" y="19" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">Top 3 SERP Rank</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 10. E-Commerce Solutions 3D Visual
// Isometric Headless Storefront, Payment Gateway & Conversion Mesh
// ==========================================
export function Ecommerce3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="ecomShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ecomGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F0FDF4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D2F6E3" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ecomCoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
          <linearGradient id="ecomBoxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9FFF2" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="170" cy="195" rx="115" ry="26" fill="url(#ecomShadow)" />

        {/* Glass Base Platform */}
        <g>
          <path d="M70 150 L170 186 L170 196 L70 160 Z" fill="#9CD8B6" fillOpacity="0.85" />
          <path d="M170 186 L270 150 L270 160 L170 196 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M70 150 L170 114 L270 150 L170 186 Z" fill="url(#ecomGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M80 150 L170 118 L260 150" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" fill="none" />
        </g>

        {/* Central 3D Shopping Cart / Digital Storefront Core */}
        <g transform="translate(170, 112)">
          {/* Main Checkout Terminal / Isometric Cart Platform */}
          <path d="M-36 -16 L0 -34 L36 -16 L0 2 Z" fill="#008F53" />
          <path d="M-36 -16 L0 2 L0 36 L-36 18 Z" fill="#007343" />
          <path d="M0 2 L36 -16 L36 18 L0 36 Z" fill="#005B35" />

          {/* Front Grid Mesh on Cart Box */}
          <line x1="-24" y1="-7" x2="-24" y2="24" stroke="#00B86B" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="-12" y1="-2" x2="-12" y2="30" stroke="#00B86B" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="12" y1="-2" x2="12" y2="30" stroke="#00B86B" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="24" y1="-7" x2="24" y2="24" stroke="#00B86B" strokeWidth="1.2" strokeOpacity="0.7" />

          {/* Floating Product Package Cubes */}
          <g transform="translate(-18, -48)">
            <path d="M0 -14 L12 -7 L0 0 L-12 -7 Z" fill="#34D399" />
            <path d="M-12 -7 L0 0 L0 14 L-12 7 Z" fill="#00B86B" />
            <path d="M0 0 L12 -7 L12 7 L0 14 Z" fill="#008F53" />
          </g>

          <g transform="translate(18, -42)">
            <path d="M0 -14 L12 -7 L0 0 L-12 -7 Z" fill="#E9FFF2" stroke="#BCE8CF" strokeWidth="0.8" />
            <path d="M-12 -7 L0 0 L0 14 L-12 7 Z" fill="#9CD8B6" />
            <path d="M0 0 L12 -7 L12 7 L0 14 Z" fill="#81C8A4" />
          </g>

          {/* Golden Currency Token */}
          <g transform="translate(0, -64)">
            <ellipse cx="0" cy="0" rx="14" ry="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M-14 0 L-14 5 A14 7 0 0 0 14 5 L14 0 Z" fill="#D97706" />
            <text x="0" y="2.5" fill="#78350F" fontSize="8" fontWeight="bold" textAnchor="middle">$</text>
          </g>
        </g>

        {/* Left Side: Omni-Channel Payment Node */}
        <g transform="translate(42, 68)">
          <rect x="0" y="0" width="86" height="42" rx="10" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.06))" />
          <circle cx="16" cy="21" r="7" fill="#E9FFF2" />
          <path d="M12 21 L15 24 L20 18" stroke="#008F53" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="29" y="18" fill="#142A27" fontSize="10" fontWeight="bold">1-Click Buy</text>
          <text x="29" y="30" fill="#64736F" fontSize="8" fontFamily="monospace">&lt;250ms SLA</text>
        </g>

        {/* Right Side: Conversion Telemetry Pill */}
        <g transform="translate(202, 48)">
          <rect x="0" y="0" width="124" height="34" rx="17" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.06))" />
          <circle cx="17" cy="17" r="4.5" fill="#00B86B" />
          <text x="30" y="21" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">+45% Conversion</text>
        </g>

        {/* Bottom Cart Badge */}
        <g transform="translate(208, 155)">
          <rect x="0" y="0" width="102" height="28" rx="8" fill="#142A27" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.12))" />
          <text x="12" y="18" fill="#E9FFF2" fontSize="9" fontFamily="monospace" fontWeight="bold">1M+ SKUs Sync</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 11. ERP & POS Solutions 3D Visual
// Multi-Store Terminal, Central Ledger Hub & Real-Time Sync
// ==========================================
export function ERPPOS3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="erpShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="erpGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F0FDF4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D0F4DF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="erpScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#142A27" />
            <stop offset="100%" stopColor="#0A1816" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="170" cy="195" rx="115" ry="26" fill="url(#erpShadow)" />

        {/* Base Platform */}
        <g>
          <path d="M70 150 L170 186 L170 196 L70 160 Z" fill="#9CD8B6" fillOpacity="0.85" />
          <path d="M170 186 L270 150 L270 160 L170 196 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M70 150 L170 114 L270 150 L170 186 Z" fill="url(#erpGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M80 150 L170 118 L260 150" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" fill="none" />
        </g>

        {/* Central 3D POS Terminal Screen & Stand */}
        <g transform="translate(170, 105)">
          {/* Terminal Stand Pedestal */}
          <path d="M-12 12 L0 6 L12 12 L0 18 Z" fill="#81C8A4" />
          <path d="M-12 12 L0 18 L0 30 L-12 24 Z" fill="#008F53" />
          <path d="M0 18 L12 12 L12 24 L0 30 Z" fill="#075B3E" />

          {/* POS Terminal Screen Shell (Isometric Angled Display) */}
          <path d="M-36 -32 L20 -54 L44 -38 L-12 -16 Z" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" />
          <path d="M-36 -32 L-12 -16 L-12 -6 L-36 -22 Z" fill="#008F53" />
          <path d="M-12 -16 L44 -38 L44 -28 L-12 -6 Z" fill="#075B3E" />

          {/* Screen Display Face */}
          <path d="M-32 -30 L16 -49 L38 -35 L-10 -16 Z" fill="url(#erpScreenGrad)" />
          {/* POS Interface lines on screen */}
          <line x1="-24" y1="-27" x2="-6" y2="-34" stroke="#00B86B" strokeWidth="1.5" />
          <line x1="-22" y1="-21" x2="10" y2="-33" stroke="#34D399" strokeWidth="1.2" />
          <line x1="-16" y1="-17" x2="20" y2="-31" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="28" cy="-39" r="2.5" fill="#00B86B" />

          {/* Receipt Tape Emerging */}
          <path d="M-28 -42 L-16 -47 L-14 -35 L-26 -30 Z" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="0.8" />
          <line x1="-25" y1="-39" x2="-18" y2="-42" stroke="#64736F" strokeWidth="0.7" />
          <line x1="-24" y1="-35" x2="-17" y2="-38" stroke="#64736F" strokeWidth="0.7" />

          {/* Red Laser Barcode Scanner Beam */}
          <line x1="-42" y1="-12" x2="-78" y2="4" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="-78" cy="4" r="3" fill="#EF4444" />
        </g>

        {/* Multi-Branch Inventory Cubes (Warehouse satellite node) */}
        <g transform="translate(62, 132)">
          <rect x="0" y="0" width="82" height="38" rx="8" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <text x="10" y="16" fill="#142A27" fontSize="9" fontWeight="bold">500+ Stores</text>
          <text x="10" y="28" fill="#008F53" fontSize="8" fontFamily="monospace">99.98% Sync</text>
        </g>

        {/* Right Telemetry Badge */}
        <g transform="translate(196, 42)">
          <rect x="0" y="0" width="130" height="32" rx="16" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.06))" />
          <circle cx="16" cy="16" r="4.5" fill="#00B86B" />
          <text x="28" y="20" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">Real-Time POS Sync</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 12. Business Automation 3D Visual
// Autonomous Workflow Pipeline, Decision Tree & Robotic Triggers
// ==========================================
export function BusinessAutomation3DVisual({ className = "w-full h-64 sm:h-72" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-72 overflow-visible drop-shadow-[0_16px_32px_rgba(0,143,83,0.14)]"
      >
        <defs>
          <radialGradient id="autoShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="autoGlassPed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F0FDF4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CEF2DC" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="autoPillar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="170" cy="195" rx="115" ry="26" fill="url(#autoShadow)" />

        {/* Base Platform */}
        <g>
          <path d="M70 150 L170 186 L170 196 L70 160 Z" fill="#9CD8B6" fillOpacity="0.85" />
          <path d="M170 186 L270 150 L270 160 L170 196 Z" fill="#81C8A4" fillOpacity="0.8" />
          <path d="M70 150 L170 114 L270 150 L170 186 Z" fill="url(#autoGlassPed)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M80 150 L170 118 L260 150" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" fill="none" />
        </g>

        {/* Central Workflow Automation Hub (Tiered Branching Nodes) */}
        <g transform="translate(170, 110)">
          {/* Main Central Automation Core Cylinder / Cube */}
          <path d="M0 -34 L32 -18 L0 -2 L-32 -18 Z" fill="#E9FFF2" stroke="#BCE8CF" strokeWidth="1" />
          <path d="M-32 -18 L0 -2 L0 34 L-32 18 Z" fill="url(#autoPillar)" />
          <path d="M0 -2 L32 -18 L32 18 L0 34 Z" fill="#075B3E" />

          {/* Workflow Gear Icon inside top face */}
          <circle cx="0" cy="-18" r="8" fill="#008F53" />
          <circle cx="0" cy="-18" r="4" fill="#FFFFFF" />

          {/* Branching Logic Pipeline Left (Trigger Ingress) */}
          <line x1="-32" y1="-18" x2="-75" y2="-40" stroke="#00B86B" strokeWidth="2" strokeDasharray="3 3" />
          <g transform="translate(-75, -40)">
            <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#FFFFFF" stroke="#00B86B" strokeWidth="1.2" />
            <text x="0" y="3" fill="#142A27" fontSize="8" fontWeight="bold" textAnchor="middle">Trigger</text>
          </g>

          {/* Branching Logic Pipeline Right (Automated Action / Dispatch) */}
          <line x1="32" y1="-18" x2="75" y2="-40" stroke="#00B86B" strokeWidth="2" strokeDasharray="3 3" />
          <g transform="translate(75, -40)">
            <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#142A27" />
            <text x="0" y="3" fill="#34D399" fontSize="8" fontWeight="bold" textAnchor="middle">Action</text>
          </g>

          {/* Top Automated AI Reasoning Node */}
          <line x1="0" y1="-34" x2="0" y2="-66" stroke="#008F53" strokeWidth="2" />
          <g transform="translate(0, -66)">
            <circle cx="0" cy="0" r="14" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M-5 0 L-1 4 L6 -3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* Top Telemetry Pill */}
        <g transform="translate(194, 40)">
          <rect x="0" y="0" width="134" height="32" rx="16" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 14px rgba(0,0,0,0.06))" />
          <circle cx="16" cy="16" r="4.5" fill="#00B86B" />
          <text x="28" y="20" fill="#142A27" fontSize="11" fontFamily="monospace" fontWeight="bold">80% Manual Effort Cut</text>
        </g>

        {/* Bottom Efficiency Badge */}
        <g transform="translate(42, 60)">
          <rect x="0" y="0" width="94" height="34" rx="8" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <text x="10" y="15" fill="#142A27" fontSize="9" fontWeight="bold">Self-Healing</text>
          <text x="10" y="27" fill="#008F53" fontSize="8" fontFamily="monospace">0.01% Defect</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// Main Dispatcher: ServiceHero3DVisual
// Returns the correct bespoke visual for any slug
// ==========================================
export function ServiceHero3DVisual({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case "ai-machine-learning":
      return <AIMachineLearning3DVisual className={className} />;
    case "generative-ai-llms":
      return <GenerativeAILLM3DVisual className={className} />;
    case "custom-software-development":
      return <CustomSoftware3DVisual className={className} />;
    case "web-development":
      return <WebDevelopment3DVisual className={className} />;
    case "data-engineering":
      return <DataEngineering3DVisual className={className} />;
    case "cloud-solutions-devops":
      return <CloudDevOps3DVisual className={className} />;
    case "mobile-app-development":
      return <MobileApp3DVisual className={className} />;
    case "it-consulting":
      return <ITConsulting3DVisual className={className} />;
    case "seo":
      return <SEO3DVisual className={className} />;
    case "ecommerce-solutions":
      return <Ecommerce3DVisual className={className} />;
    case "erp-pos-solutions":
      return <ERPPOS3DVisual className={className} />;
    case "business-automation":
      return <BusinessAutomation3DVisual className={className} />;
    default:
      return <AIMachineLearning3DVisual className={className} />;
  }
}

