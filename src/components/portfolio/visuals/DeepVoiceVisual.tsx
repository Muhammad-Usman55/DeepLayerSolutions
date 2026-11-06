"use client";

import React from "react";
import { Mic, Radio, Zap, Volume2, ShieldCheck, Activity } from "lucide-react";

interface VisualProps {
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function DeepVoiceVisual({ mode = "card", className = "" }: VisualProps) {
  const isHero = mode === "hero";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#042417] via-[#093522] to-[#02170E] flex flex-col justify-between p-4 sm:p-5 font-mono text-white ${className}`}
      style={{ minHeight: isHero ? "340px" : "200px" }}
    >
      {/* Background Audio Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#10B981 1px, transparent 1px), radial-gradient(#059669 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* Top HUD Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A3E5B9] border-b border-[#10B981]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">FULL-DUPLEX WEBSOCKET // OPUS</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#86D4A0]">
          <span className="px-1.5 py-0.5 rounded bg-[#10B981]/30 text-[#34D399] border border-[#10B981]/50 font-bold">
            LATENCY: 420ms
          </span>
        </div>
      </div>

      {/* Center Waveform & Conversational Turn Indicator */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center gap-3">
        {/* Dynamic Simulated Waveform Bars */}
        <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-[260px] px-2 py-1 rounded-xl bg-[#062418]/60 border border-[#10B981]/30 backdrop-blur-xs">
          {[
            { h: 32, d: "0.1s" },
            { h: 48, d: "0.3s" },
            { h: 24, d: "0.2s" },
            { h: 56, d: "0.4s" },
            { h: 40, d: "0.15s" },
            { h: 64, d: "0.5s" },
            { h: 36, d: "0.25s" },
            { h: 52, d: "0.35s" },
            { h: 28, d: "0.18s" },
            { h: 60, d: "0.45s" },
            { h: 30, d: "0.22s" },
            { h: 44, d: "0.32s" },
          ].map((bar, i) => (
            <div
              key={i}
              className="w-2 rounded-full bg-gradient-to-t from-[#047F5B] via-[#10B981] to-[#6EE7B7]"
              style={{
                height: `${bar.h}px`,
                animation: `pulseBar 1.2s ease-in-out infinite alternate`,
                animationDelay: bar.d,
              }}
            />
          ))}
        </div>

        {/* Live Turn-Taking Transcript Pill */}
        <div className="flex items-center gap-2 text-[10px] bg-[#0A3D28]/80 px-3 py-1.5 rounded-full border border-[#10B981]/40 text-[#D1FAE5] max-w-[280px] truncate">
          <Mic className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
          <span className="truncate">&quot;Understood! Rescheduling flight NH212...&quot;</span>
        </div>
      </div>

      {/* Bottom Barge-in Status */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-[#10B981]/30 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A3E5B9]">
          <Zap className="w-3.5 h-3.5 text-[#34D399]" />
          <span>SILERO VAD · BARGE-IN REACTION: 40ms</span>
        </div>
        <div className="text-[9px] text-[#86D4A0] px-2 py-0.5 rounded bg-[#10B981]/20 font-bold border border-[#10B981]/30">
          SUB-450ms SLA
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseBar {
          0% {
            transform: scaleY(0.4);
            opacity: 0.6;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

