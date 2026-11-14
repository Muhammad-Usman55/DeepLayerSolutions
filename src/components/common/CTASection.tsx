"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "./Container";
import { CTATechVisual } from "./CTATechVisual";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  badge?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTASection({
  badge = "START YOUR DIGITAL TRANSFORMATION",
  title,
  highlight,
  subtitle = "Let's turn your next big idea into a powerful digital solution. Our senior engineers and AI architects are ready to collaborate.",
  buttonText = "Let's Discuss Your Project",
  buttonHref = "/contact",
  secondaryText = "View Capabilities",
  secondaryHref = "/services",
  className,
}: CTASectionProps) {
  const displayTitle = title ?? "Ready to Build Something";
  const displayHighlight = highlight !== undefined ? highlight : (title ? "" : "Intelligent?");
  const cleanTitle = displayHighlight && displayTitle.endsWith(displayHighlight)
    ? displayTitle.slice(0, -displayHighlight.length).trim()
    : displayTitle;
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} aria-label="Call to Action">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] lg:rounded-[40px] bg-gradient-to-r from-[#008F53] to-[#007343] lg:bg-gradient-to-br lg:from-[#FFFFFF] lg:via-[#F0FAF4] lg:to-[#D5F9E6]/80 p-6 sm:p-12 lg:p-16 border border-[#00B86B]/40 lg:border-[#BCE8CF] shadow-[0_16px_48px_-12px_rgba(0,143,83,0.2)] lg:shadow-[0_16px_48px_-12px_rgba(0,143,83,0.12)] cta-box-container">
          {/* Subtle Ambient Background Gradients & Soft Waves */}
          <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-gradient-to-br from-[#34D399]/20 via-[#00B86B]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#86EFAC]/25 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Background Decorative Soft Fluid Curves */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 -z-10"
            viewBox="0 0 1200 500"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250 C 350 150, 750 450, 1200 300"
              stroke="#A7F3D0"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 380 C 450 300, 850 500, 1200 400"
              stroke="#6EE7B7"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>

          {/* Two-Column Grid: Text on Left, 3D Laptop Visual on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            {/* Left Content Area (Cols 1-7 on desktop) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow Badge Pill (Desktop Only) */}
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-white/20 lg:bg-white/90 border border-white/30 lg:border-[#00B86B]/35 text-white lg:text-[#008F53] mb-5 shadow-2xs select-none max-w-full flex-wrap sm:flex-nowrap">
                <span className="w-2 h-2 rounded-full bg-white lg:bg-[#00B86B] shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.8)] lg:shadow-[0_0_6px_rgba(0,184,107,0.8)]" />
                <span>{badge}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white lg:text-[#00B86B] shrink-0" />
              </div>

              {/* Main Headline */}
              <h2 className="text-xl sm:text-3xl lg:text-[54px] font-extrabold tracking-tight text-white lg:text-[#142A27] leading-[1.15]">
                <span className="lg:hidden mr-1.5" aria-hidden="true">🚀</span>
                {cleanTitle}
                {displayHighlight && (
                  <>
                    {" "}
                    <span className="text-[#A7F3D0] lg:text-[#00B86B] relative inline-block mt-0.5 sm:mt-1">
                      {displayHighlight}
                      {/* Curved Accent Underline (Desktop Only) */}
                      <svg
                        className="hidden lg:block absolute -bottom-2 left-0 w-full h-3 text-white/50 lg:text-[#34D399] -z-10"
                        viewBox="0 0 160 16"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M4 11 C 45 4, 115 4, 156 12"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </h2>

              {/* Supporting Copy */}
              <p className="mt-1.5 sm:mt-5 text-xs sm:text-lg text-white/90 lg:text-[#64736F] leading-relaxed max-w-xl font-normal">
                <span className="lg:hidden">Let&apos;s turn your ideas into reality.</span>
                <span className="hidden lg:inline">{subtitle}</span>
              </p>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                {/* Primary Button */}
                <Link
                  href={buttonHref}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-[#008F53] hover:bg-[#E9FFF2] lg:bg-gradient-to-r lg:from-[#00B86B] lg:to-[#009455] lg:hover:from-[#00A862] lg:hover:to-[#00804A] lg:text-white font-semibold text-xs sm:text-base shadow-[0_8px_20px_rgba(0,0,0,0.15)] lg:shadow-[0_8px_20px_rgba(0,184,107,0.32)] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto select-none"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Secondary Button (Desktop & Tablet) */}
                <Link
                  href={secondaryHref}
                  className="hidden sm:inline-flex group items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white/80 hover:bg-white border border-[#00B86B]/35 hover:border-[#00B86B] text-[#142A27] hover:text-[#008F53] font-semibold text-sm sm:text-base shadow-2xs transition-all duration-300 w-full sm:w-auto select-none"
                >
                  <span className="w-5 h-5 rounded-full border border-[#00B86B] text-[#00B86B] flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 fill-[#00B86B] ml-0.5" />
                  </span>
                  <span>{secondaryText}</span>
                </Link>
              </div>
            </div>

            {/* Right Side: 3D Laptop Visualization (Desktop Only) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative mt-4 lg:mt-0">
              <CTATechVisual />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
