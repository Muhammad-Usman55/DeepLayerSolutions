"use client";

import React from "react";
import { Brain, Code2, Cloud, ShoppingCart } from "lucide-react";

export function ServicesHeroVisual() {
  return (
    <div className="relative w-full max-w-[480px] select-none">
      {/* Background Volumetric Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-[#008F53]/25 via-[#00B86B]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-4 w-48 h-48 bg-[#34D399]/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Main Glassmorphic Display Pedestal Card */}
      <div className="relative rounded-[28px] sm:rounded-[32px] bg-white/85 backdrop-blur-md border border-[#DFEDE5] shadow-xl shadow-[#008F53]/8 p-5 sm:p-7 overflow-hidden group">
        {/* Soft Decorative Corner Ambient Aura */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#E9FFF2] via-[#D5F9E6]/30 to-transparent rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-[#E9FFF2]/60 to-transparent rounded-full blur-xl -z-10" />

        {/* 3D Isometric Service Architecture Vector */}
        <div className="w-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
          <svg
            viewBox="0 0 460 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[300px] overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.1)]"
          >
            <defs>
              {/* Radial Shadows */}
              <radialGradient id="srvBaseShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#008F53" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
              </radialGradient>

              {/* Glass Platform Gradients */}
              <linearGradient id="srvGlassTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#F4FAF6" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="srvGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="srvGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.7" />
              </linearGradient>

              {/* Core Emerald Gradients */}
              <linearGradient id="srvCoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="45%" stopColor="#00B86B" />
                <stop offset="100%" stopColor="#008F53" />
              </linearGradient>

              <linearGradient id="srvCubeTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#DDF5E9" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="srvCubeL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B86B" />
                <stop offset="100%" stopColor="#008F53" />
              </linearGradient>

              <linearGradient id="srvCubeR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008F53" />
                <stop offset="100%" stopColor="#075B3E" />
              </linearGradient>

              {/* Cloud Gradients */}
              <linearGradient id="srvCloudGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E8F5E9" />
                <stop offset="100%" stopColor="#81C8A4" />
              </linearGradient>

              {/* DB Gradients */}
              <linearGradient id="srvDbTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E3EDE5" />
              </linearGradient>
              <linearGradient id="srvDbSide" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#008F53" />
                <stop offset="50%" stopColor="#00B86B" />
                <stop offset="100%" stopColor="#075B3E" />
              </linearGradient>
            </defs>

            {/* Ground Ambient Pedestal Shadow */}
            <ellipse cx="230" cy="285" rx="150" ry="32" fill="url(#srvBaseShadow)" />

            {/* Base Tiered Isometric Glass Platform */}
            <g>
              <path d="M100 230 L230 275 L230 286 L100 241 Z" fill="url(#srvGlassEdgeL)" />
              <path d="M230 275 L360 230 L360 241 L230 286 Z" fill="url(#srvGlassEdgeR)" />
              <path d="M100 230 L230 185 L360 230 L230 275 Z" fill="url(#srvGlassTop)" stroke="#FFFFFF" strokeWidth="1.8" />
              <path d="M115 230 L230 190 L345 230" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
            </g>

            {/* Orbiting Telemetry Rings */}
            <g stroke="#00B86B" strokeWidth="1.4" opacity="0.45" strokeDasharray="6 5">
              <ellipse cx="230" cy="180" rx="160" ry="50" transform="rotate(-15 230 180)" />
              <ellipse cx="230" cy="180" rx="125" ry="38" transform="rotate(25 230 180)" stroke="#008F53" />
            </g>

            {/* Satellite Telemetry Indicator Nodes */}
            <circle cx="95" cy="140" r="5" fill="#00B86B" stroke="#008F53" strokeWidth="1.5" />
            <circle cx="365" cy="210" r="4.5" fill="#008F53" stroke="#00B86B" strokeWidth="1.5" />

            {/* Left Microservice: Database Cylinders */}
            <g transform="translate(145, 175)">
              <ellipse cx="0" cy="24" rx="22" ry="9" fill="url(#srvDbTop)" stroke="#008F53" strokeWidth="1" />
              <path d="M-22 24 V32 C-22 38 -10 42 0 42 C10 42 22 38 22 32 V24 Z" fill="url(#srvDbSide)" />

              <ellipse cx="0" cy="12" rx="22" ry="9" fill="url(#srvDbTop)" stroke="#008F53" strokeWidth="1" />
              <path d="M-22 12 V20 C-22 26 -10 30 0 30 C10 30 22 26 22 20 V12 Z" fill="url(#srvDbSide)" />

              <ellipse cx="0" cy="0" rx="22" ry="9" fill="url(#srvDbTop)" stroke="#00B86B" strokeWidth="1.2" />
              <path d="M-22 0 V8 C-22 14 -10 18 0 18 C10 18 22 14 22 8 V0 Z" fill="url(#srvDbSide)" />

              {/* Glowing LED Indicators */}
              <circle cx="-10" cy="5" r="1.8" fill="#34D399" />
              <circle cx="-3" cy="5" r="1.8" fill="#6EE7B7" />
              <circle cx="-10" cy="17" r="1.8" fill="#34D399" />
              <circle cx="-3" cy="17" r="1.8" fill="#6EE7B7" />
              <circle cx="-10" cy="29" r="1.8" fill="#34D399" />
              <circle cx="-3" cy="29" r="1.8" fill="#6EE7B7" />
            </g>

            {/* Right Microservice: Cloud Node Cluster */}
            <g transform="translate(305, 170)">
              <ellipse cx="0" cy="30" rx="26" ry="8" fill="#008F53" fillOpacity="0.18" />
              <path
                d="M-20 22 C-26 22 -30 17 -30 11 C-30 6 -26 1 -20 0 C-18 -7 -10 -12 -2 -12 C9 -12 17 -5 19 4 C23 4 27 8 27 13 C27 18 23 22 18 22 Z"
                fill="url(#srvCloudGrad)"
                stroke="#008F53"
                strokeWidth="1.4"
              />
              <path d="M-18 2 C-15 -5 -8 -9 -2 -9 C5 -9 11 -6 13 0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

              {/* Data streaming pulses */}
              <line x1="-10" y1="24" x2="-10" y2="44" stroke="#00B86B" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="8" y1="24" x2="8" y2="48" stroke="#008F53" strokeWidth="1.2" strokeDasharray="3 3" />
            </g>

            {/* Central High-Performance Architecture Core (3D Cube + Neural Synapse) */}
            <g transform="translate(230, 140)">
              {/* Central Cube */}
              <path d="M0 -34 L32 -18 L0 -2 L-32 -18 Z" fill="url(#srvCubeTop)" stroke="#FFFFFF" strokeWidth="1" />
              <path d="M-32 -18 L0 -2 L0 32 L-32 16 Z" fill="url(#srvCubeL)" />
              <path d="M0 -2 L32 -18 L32 16 L0 32 Z" fill="url(#srvCubeR)" />

              {/* Glowing Circuit Lines on Cube */}
              <path d="M-18 6 L-8 11 L-8 23" stroke="#6EE7B7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M18 6 L8 11 L8 23" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <circle cx="-8" cy="23" r="2" fill="#6EE7B7" />
              <circle cx="8" cy="23" r="2" fill="#A7F3D0" />

              {/* Neural Synapse Branching Lines */}
              <line x1="-32" y1="-18" x2="-62" y2="-40" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="32" y1="-18" x2="62" y2="-40" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="0" y1="-34" x2="0" y2="-64" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Neural Satellite Nodes */}
              <g transform="translate(-62, -40)">
                <circle cx="0" cy="0" r="10" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.6" />
                <circle cx="0" cy="0" r="5" fill="#008F53" />
              </g>

              <g transform="translate(62, -40)">
                <circle cx="0" cy="0" r="10" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1.6" />
                <circle cx="0" cy="0" r="5" fill="#008F53" />
              </g>

              <g transform="translate(0, -64)">
                <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#008F53" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="url(#srvCoreGrad)" />
              </g>

              {/* Floating Concentric Halo */}
              <ellipse cx="0" cy="-2" rx="46" ry="16" fill="none" stroke="#00B86B" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            </g>

            {/* Glowing Code Matrix Hologram Ribbon */}
            <g transform="translate(185, 45)">
              <rect x="0" y="0" width="90" height="26" rx="13" fill="#FFFFFF" fillOpacity="0.9" stroke="#BCE8CF" strokeWidth="1" />
              <circle cx="14" cy="13" r="4" fill="#008F53" />
              <text x="24" y="17" fill="#142A27" fontSize="10" fontFamily="monospace" fontWeight="bold">
                API: 200 OK
              </text>
            </g>
          </svg>
        </div>

        {/* Orbiting Capability Chips Grid Below Visual */}
        <div className="mt-5 pt-4 border-t border-[#DFEDE5]/80 grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27]">
            <div className="w-6 h-6 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold leading-tight">AI & Machine Learning</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27]">
            <div className="w-6 h-6 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold leading-tight">Custom Software</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27]">
            <div className="w-6 h-6 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
              <Cloud className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold leading-tight">Cloud & DevOps</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27]">
            <div className="w-6 h-6 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold leading-tight">Commerce & POS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

