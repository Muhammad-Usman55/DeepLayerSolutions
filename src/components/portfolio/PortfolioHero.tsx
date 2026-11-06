"use client";

import React from "react";
import { Container } from "../common/Container";
import { Breadcrumb } from "../common/Breadcrumb";
import { PortfolioHeroVisual } from "./PortfolioHeroVisual";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function PortfolioHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-white border-b border-[#E3EDE5]">
      {/* Subtle Ambient Background Mesh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#159B50 0.75px, transparent 0.75px), radial-gradient(#087A3D 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      <Container size="wide" className="relative z-10">
        <Breadcrumb
          items={[{ label: "Portfolio", href: "/portfolio" }]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] w-fit mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
              <span>OUR PRODUCTS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-[1.12]">
              Ideas We&apos;ve Built. <br />
              <span className="text-[#087A3D]">Solutions We&apos;ve Delivered.</span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-5 text-base sm:text-lg text-[#65736D] leading-relaxed max-w-2xl font-normal">
              Explore selected software and AI engineering projects demonstrating our technical capabilities across intelligent applications, automation, and digital solutions.
            </p>

            {/* Feature Guarantees */}
            <div className="mt-8 pt-6 border-t border-[#E3EDE5] flex flex-wrap gap-4 sm:gap-6 text-xs text-[#101C19] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159B50]" />
                <span>100% Authentic Implementations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159B50]" />
                <span>Production Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159B50]" />
                <span>Verified Benchmarks</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <PortfolioHeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
