"use client";

import React from "react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Terminal, Cpu, Database, Cloud, Layers, Box, Code2 } from "lucide-react";

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
    <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-3 rounded-full sm:rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-2xs hover:shadow-md transition-all duration-300 group select-none shrink-0">
      <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full sm:rounded-xl bg-[#E9FFF2] border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:bg-[#008F53] group-hover:text-white transition-all duration-200 shrink-0">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
      <div className="text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-semibold hidden sm:block leading-tight">
          {item.category}
        </span>
        <span className="text-xs sm:text-sm font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors block leading-tight">
          {item.name}
        </span>
      </div>
    </div>
  );
}

export function TechEcosystem() {
  return (
    <section className="py-20 md:py-24 bg-[#FAFCF9] overflow-hidden" aria-label="Technology Ecosystem">
      {/* Self-contained CSS for 100% guaranteed hardware-accelerated animation */}
      <style>{`
        @keyframes dl-marquee-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes dl-marquee-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .dl-marquee-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
          overflow: hidden;
        }
        .dl-marquee-row {
          display: flex;
          width: 100%;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .dl-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .dl-marquee-track.dl-left {
          animation: dl-marquee-left 28s linear infinite !important;
        }
        .dl-marquee-track.dl-right {
          animation: dl-marquee-right 25s linear infinite !important;
        }
        .dl-marquee-row:hover .dl-marquee-track {
          animation-play-state: paused !important;
        }
        .dl-marquee-list {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-right: 1.25rem;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .dl-marquee-row {
            mask-image: none !important;
            -webkit-mask-image: none !important;
          }
          .dl-marquee-track.dl-left {
            animation-duration: 34s !important;
          }
          .dl-marquee-track.dl-right {
            animation-duration: 30s !important;
          }
        }
      `}</style>

      <Container size="wide">
        {/* Mobile Header Matching Mockup (< sm) */}
        <div className="text-center mb-6 sm:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Engineering <span className="text-[#008F53]">Stack</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
            Modern technologies for powerful solutions.
          </p>
        </div>

        {/* Desktop Header Unchanged (hidden sm:block) */}
        <div className="hidden sm:block">
          <SectionHeading
            badge="Engineering Stack"
            title="Battle-Tested Technology Ecosystem."
            highlight="Battle-Tested"
            subtitle="We select technologies based on performance, type safety, ecosystem maturity, and enterprise maintainability."
          />
        </div>
      </Container>

      {/* Opposite Direction Horizontal Scrolling Logo Marquee */}
      <div className="relative w-full mt-12 overflow-hidden select-none [touch-action:pan-y]">
        {/* Supporting gradient fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-r from-[#FAFCF9] via-[#FAFCF9]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-l from-[#FAFCF9] via-[#FAFCF9]/80 to-transparent z-10 pointer-events-none" />

        <div className="dl-marquee-container">
          {/* Row 1: Scrolling Left (Right to Left) */}
          <div className="dl-marquee-row" role="region" aria-label="Technologies Row 1">
            <div className="dl-marquee-track dl-left">
              {/* Group 1 */}
              <div className="dl-marquee-list">
                {track1.map((item, idx) => (
                  <TechBadge key={`t1-g1-${idx}`} item={item} />
                ))}
              </div>
              {/* Group 2 (Exact duplicate for seamless infinite loop) */}
              <div className="dl-marquee-list" aria-hidden="true">
                {track1.map((item, idx) => (
                  <TechBadge key={`t1-g2-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Scrolling Right (Opposite Direction: Left to Right) */}
          <div className="dl-marquee-row" role="region" aria-label="Technologies Row 2">
            <div className="dl-marquee-track dl-right">
              {/* Group 1 */}
              <div className="dl-marquee-list">
                {track2.map((item, idx) => (
                  <TechBadge key={`t2-g1-${idx}`} item={item} />
                ))}
              </div>
              {/* Group 2 (Exact duplicate for seamless infinite loop) */}
              <div className="dl-marquee-list" aria-hidden="true">
                {track2.map((item, idx) => (
                  <TechBadge key={`t2-g2-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
