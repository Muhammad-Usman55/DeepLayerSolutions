"use client";

import React from "react";
import { Code2, TrendingUp, Cpu, Sparkles, Layers, Box } from "lucide-react";

export function PortfolioHeroVisual() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto flex items-center justify-center select-none perspective-[1200px]">
      {/* Ambient Radial Mint Glow (CSS gradient, zero SVG blur filters) */}
      <div
        className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(21, 155, 80, 0.22) 0%, rgba(8, 122, 61, 0.08) 50%, transparent 75%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Orbital Glowing Ellipse Ring 1 */}
      <div
        className="absolute w-[360px] h-[190px] sm:w-[440px] sm:h-[220px] rounded-[50%] border border-[#159B50]/30 pointer-events-none"
        style={{
          transform: "rotateX(68deg) rotateZ(-22deg) translate3d(0, 0, 0)",
          boxShadow: "0 0 25px rgba(21, 155, 80, 0.15)",
        }}
      />

      {/* Orbital Ring 2 (Inner faint) */}
      <div
        className="absolute w-[280px] h-[140px] sm:w-[330px] sm:h-[160px] rounded-[50%] border border-dashed border-[#159B50]/20 pointer-events-none"
        style={{
          transform: "rotateX(68deg) rotateZ(35deg) translate3d(0, 0, 0)",
        }}
      />

      {/* Base Glass Platform Layer 1 (Bottom pedestal) */}
      <div
        className="absolute w-64 sm:w-80 h-28 sm:h-32 rounded-3xl bg-gradient-to-tr from-[#E8F5E9]/90 via-[#FAFCF9]/80 to-[#E8F5E9]/60 border-2 border-[#159B50]/30 shadow-2xl backdrop-blur-md"
        style={{
          transform: "rotateX(58deg) rotateZ(-18deg) translateY(40px) translate3d(0, 0, 0)",
        }}
      />

      {/* Base Glass Platform Layer 2 (Middle stepped glass) */}
      <div
        className="absolute w-56 sm:w-68 h-24 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#159B50]/20 via-[#FAFCF9]/90 to-[#E8F5E9]/70 border border-[#159B50]/40 shadow-lg backdrop-blur-md"
        style={{
          transform: "rotateX(58deg) rotateZ(-18deg) translateY(18px) translate3d(0, 0, 0)",
        }}
      />

      {/* Floating Center Glass Plaque: Growth Graph & Code */}
      <div
        className="relative z-20 w-48 sm:w-56 p-4 rounded-2xl bg-white/85 border border-[#159B50]/40 shadow-[0_20px_50px_rgba(4,127,91,0.18)] backdrop-blur-md"
        style={{
          animation: "floatSlow 6s ease-in-out infinite alternate",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {/* Top Header of Plaque */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3EDE5]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#075C32] uppercase">
              SYSTEM ONLINE
            </span>
          </div>
          <span className="text-[9px] font-mono font-semibold text-[#159B50] px-1.5 py-0.5 rounded bg-[#E8F5E9]">
            AI ENGINE
          </span>
        </div>

        {/* Central Metric Graphic: Rising Bar Charts with Arrow */}
        <div className="py-1">
          <div className="flex items-end justify-between h-14 px-2 pt-2 bg-[#F4FAF3] rounded-xl border border-[#E3EDE5]">
            <div className="w-3 bg-[#C4D9C8] rounded-t-sm h-5" />
            <div className="w-3 bg-[#A3E5B9] rounded-t-sm h-8" />
            <div className="w-3 bg-[#159B50]/70 rounded-t-sm h-11" />
            <div className="w-3 bg-[#087A3D] rounded-t-sm h-14 shadow-sm" />
            <div className="flex items-center justify-center p-1 rounded-full bg-[#087A3D] text-white shadow-md -translate-y-2">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Mini Label */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#65736D]">
          <span>VERIFIED DEPLOYMENTS</span>
          <span className="font-bold text-[#075C32]">99.8% SLA</span>
        </div>
      </div>

      {/* Floating Card 1: Top-Left Code Panel */}
      <div
        className="absolute top-6 sm:top-8 left-2 sm:left-4 z-30 p-3 rounded-xl bg-white/90 border border-[#159B50]/30 shadow-lg backdrop-blur-md flex items-center gap-2.5"
        style={{
          animation: "floatLeft 5s ease-in-out infinite alternate",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] border border-[#C4D9C8] flex items-center justify-center text-[#087A3D]">
          <Code2 className="w-4 h-4" />
        </div>
        <div className="font-mono text-[10px]">
          <div className="font-bold text-[#101C19]">&lt;Autonomous /&gt;</div>
          <div className="text-[#65736D] text-[9px]">LangGraph Multi-Agent</div>
        </div>
      </div>

      {/* Floating Card 2: Right AI Hardware Chip */}
      <div
        className="absolute top-16 sm:top-20 -right-2 sm:right-2 z-30 p-2.5 rounded-xl bg-white/90 border border-[#159B50]/30 shadow-lg backdrop-blur-md flex items-center gap-2"
        style={{
          animation: "floatRight 5.5s ease-in-out infinite alternate",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] border border-[#C4D9C8] flex items-center justify-center text-[#159B50]">
          <Cpu className="w-4 h-4" />
        </div>
        <div className="font-mono text-[10px]">
          <div className="font-bold text-[#101C19]">Sub-450ms</div>
          <div className="text-[#65736D] text-[9px]">Edge Neural Pipeline</div>
        </div>
      </div>

      {/* Floating Glass Cube 1 (Accent) */}
      <div
        className="absolute bottom-6 left-8 sm:left-14 z-25 w-9 h-9 rounded-lg bg-gradient-to-tr from-[#159B50]/40 to-[#E8F5E9]/80 border border-[#159B50]/50 shadow-md backdrop-blur-sm flex items-center justify-center text-[#075C32]"
        style={{
          animation: "floatCube 4.8s ease-in-out infinite alternate",
          transform: "rotate(15deg) translate3d(0, 0, 0)",
        }}
      >
        <Box className="w-4 h-4" />
      </div>

      {/* Floating Glowing Sphere (Accent) */}
      <div
        className="absolute bottom-10 right-10 sm:right-16 z-25 w-7 h-7 rounded-full bg-gradient-to-br from-[#34D399] to-[#087A3D] shadow-[0_0_15px_rgba(21,155,80,0.6)]"
        style={{
          animation: "floatSphere 4.2s ease-in-out infinite alternate",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Pure GPU compositor animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0% {
            transform: translateY(0px) rotate(-1deg);
          }
          100% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
        @keyframes floatLeft {
          0% {
            transform: translateY(0px) rotate(2deg);
          }
          100% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        @keyframes floatRight {
          0% {
            transform: translateY(0px) rotate(-2deg);
          }
          100% {
            transform: translateY(-9px) rotate(1.5deg);
          }
        }
        @keyframes floatCube {
          0% {
            transform: translateY(0px) rotate(15deg);
          }
          100% {
            transform: translateY(-12px) rotate(25deg);
          }
        }
        @keyframes floatSphere {
          0% {
            transform: translateY(0px) scale(0.95);
          }
          100% {
            transform: translateY(-14px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
