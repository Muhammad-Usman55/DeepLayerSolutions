import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles, Cpu, Zap, ShieldCheck } from "lucide-react";
import { Button } from "../common/Button";
import { Container } from "../common/Container";

// Desktop-only dynamic import: zero synchronous bundle overhead
const TechLayerVisual = dynamic(
  () => import("../common/TechLayerVisual").then((mod) => mod.TechLayerVisual)
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 hero-section-wrapper">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF3] to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center w-full">
          {/* Left Hero Content (Cols 1-7 on lg/xl) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left hero-content-col">
            {/* Bespoke Studio Eyebrow Pill */}
            <div className="max-w-full">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 pr-3 sm:pr-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#DFEDE5] hover:border-[#00B86B] shadow-[0_2px_10px_-2px_rgba(0,184,107,0.08)] hover:shadow-md transition-all duration-300 mb-6 cursor-pointer max-w-full"
              >
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E9FFF2] text-[#008F53] font-mono text-[10px] font-bold tracking-wide">
                  <Sparkles className="w-3 h-3 text-[#00B86B]" />
                  DEEPLAYER SOLUTIONS
                </span>
                <span className="text-xs font-semibold text-[#142A27] tracking-tight hidden sm:inline truncate">
                  Engineering What&apos;s Next
                </span>
                <span className="w-1 h-1 rounded-full bg-[#BCE8CF] hidden sm:inline" />
                <span className="text-xs font-mono font-semibold text-[#008F53] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {/* Main Headline with Highlight Reveal */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight text-[#142A27] leading-[1.12] sm:leading-[1.08] hero-headline">
              We Build{" "}
              <span className="text-[#008F53] relative inline-block">
                Intelligent
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-[#34D399]/40 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>{" "}
              Digital Experiences.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-[#64736F] leading-relaxed max-w-2xl font-normal hero-subtext">
              Cutting-edge software engineering, AI, and digital products to help your business innovate, grow, and stay ahead in the age of intelligence.
            </p>

            {/* CTAs with hover lift */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto hero-cta-group">
              <Button
                href="/services"
                variant="primary"
                size="lg"
                withArrow
                className="w-full sm:w-auto justify-center font-semibold shadow-md shadow-[#087A3D]/15 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Services
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center font-medium hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Consultation
              </Button>
            </div>

            {/* Engineering Pillars & Architecture Spec Strip (Responsive 3-Column on mobile & desktop) */}
            <div className="mt-6 sm:mt-10 pt-4 sm:pt-7 border-t border-[#DFEDE5] w-full">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-[#DFEDE5] text-center sm:text-left">
                {/* 01: Capability */}
                <div className="flex flex-col items-center sm:block px-1 sm:px-4">
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                    <Cpu className="w-4 h-4 text-[#008F53] shrink-0" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] hidden sm:inline-block" />
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold hidden sm:inline-block">
                      01 · Capability
                    </span>
                  </div>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm font-semibold text-[#142A27] tracking-tight leading-tight">
                    Custom AI &amp; LLMs
                  </p>
                </div>

                {/* 02: Speed */}
                <div className="flex flex-col items-center sm:block px-1 sm:px-4">
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                    <Zap className="w-4 h-4 text-[#008F53] shrink-0" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] hidden sm:inline-block" />
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold hidden sm:inline-block">
                      02 · Speed
                    </span>
                  </div>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm font-semibold text-[#142A27] tracking-tight leading-tight">
                    Sub-450ms Latency
                  </p>
                </div>

                {/* 03: Standard */}
                <div className="flex flex-col items-center sm:block px-1 sm:px-4">
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#008F53] shrink-0" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] hidden sm:inline-block" />
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold hidden sm:inline-block">
                      03 · Standard
                    </span>
                  </div>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm font-semibold text-[#142A27] tracking-tight leading-tight">
                    Production Verified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Cols 8-12 on lg/xl) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 items-center justify-center lg:justify-end w-full hero-tech-visual-container">
            <div className="w-full flex items-center justify-center">
              <TechLayerVisual />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
