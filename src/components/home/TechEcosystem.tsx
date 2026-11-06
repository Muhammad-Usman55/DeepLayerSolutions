"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Terminal, Cpu, Database, Cloud, Layers, ShieldCheck, Box, Code2 } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const track1: TechItem[] = [
  { name: "Python", category: "Core AI", icon: Terminal },
  { name: "PyTorch", category: "Deep Learning", icon: Cpu },
  { name: "TensorFlow", category: "ML Engine", icon: Cpu },
  { name: "OpenCV", category: "Computer Vision", icon: Layers },
  { name: "Next.js", category: "React Framework", icon: Code2 },
  { name: "TypeScript", category: "Type Safety", icon: Code2 },
  { name: "LangGraph", category: "Multi-Agent AI", icon: Cpu },
  { name: "Google Gemini", category: "Foundation LLM", icon: Box },
];

const track2: TechItem[] = [
  { name: "FastAPI", category: "Async API", icon: Terminal },
  { name: "Django", category: "Backend Web", icon: Terminal },
  { name: "Docker", category: "Containerization", icon: Box },
  { name: "Kubernetes", category: "Orchestration", icon: Cloud },
  { name: "PostgreSQL", category: "Relational DB", icon: Database },
  { name: "Redis", category: "In-Memory Cache", icon: Database },
  { name: "Qdrant", category: "Vector Database", icon: Database },
  { name: "AWS Cloud", category: "Infrastructure", icon: Cloud },
];

function TechBadge({ item }: { item: TechItem }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md transition-all duration-300 group select-none shrink-0">
      <div className="w-9 h-9 rounded-xl bg-[#E9FFF2] border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white transition-all duration-200">
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-semibold block leading-tight">
          {item.category}
        </span>
        <span className="text-sm font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors block leading-tight">
          {item.name}
        </span>
      </div>
    </div>
  );
}

export function TechEcosystem() {
  const track1Loop = [...track1, ...track1, ...track1];
  const track2Loop = [...track2, ...track2, ...track2];

  return (
    <section className="py-20 md:py-24 bg-[#FAFCF9] border-t border-[#DFEDE5] overflow-hidden">
      <Container size="wide">
        <SectionHeading
          badge="Engineering Stack"
          title="Battle-Tested Technology Ecosystem."
          highlight="Battle-Tested"
          subtitle="We select technologies based on performance, type safety, ecosystem maturity, and enterprise maintainability."
        />
      </Container>

      {/* Infinite Dual Marquee Rails with Edge Fades */}
      <div className="relative w-full mt-12 overflow-hidden select-none">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 lg:w-48 bg-gradient-to-r from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 lg:w-48 bg-gradient-to-l from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

        <div className="space-y-4">
          {/* Track 1 (Left to Right / standard loop) */}
          <div className="flex items-center gap-4 animate-marquee-ribbon hover:[animation-play-state:paused]">
              {track1Loop.map((item, idx) => {
                const isDuplicate = idx >= track1.length;
                return (
                  <div
                    key={`t1-${idx}`}
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <TechBadge item={item} />
                  </div>
                );
              })}
            </div>

            {/* Track 2 (Opposite direction / staggered reverse feel) */}
            <div
              className="flex items-center gap-4 animate-marquee-reverse hover:[animation-play-state:paused]"
              style={{ animationDirection: "reverse" }}
            >
              {track2Loop.map((item, idx) => {
                const isDuplicate = idx >= track2.length;
                return (
                  <div
                    key={`t2-${idx}`}
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <TechBadge item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
}
