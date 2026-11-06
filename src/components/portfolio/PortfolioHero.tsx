"use client";

import React from "react";
import { Container } from "../common/Container";
import { Breadcrumb } from "../common/Breadcrumb";
import { PortfolioHeroVisual } from "./PortfolioHeroVisual";

export function PortfolioHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FAFCF9]">
      {/* Background Soft Fluid Mint Curves & Waves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C400 120 700 380 1440 220"
          stroke="#C4E7D0"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 260 C500 260 850 480 1440 340"
          stroke="#D8F3E2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M400 0 C700 250 1100 200 1440 500"
          stroke="#C4E7D0"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Floating Accent Glass Spheres in Background */}
      <div
        className="absolute top-12 left-10 w-4 h-4 rounded-full bg-gradient-to-tr from-[#159B50] to-[#86EFAC] opacity-60 shadow-md pointer-events-none"
        style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.4))" }}
      />
      <div
        className="absolute top-36 right-16 w-5 h-5 rounded-full bg-gradient-to-tr from-[#087A3D] to-[#34D399] opacity-70 shadow-md pointer-events-none"
        style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.5))" }}
      />

      <Container size="wide" className="relative z-10">
        <Breadcrumb
          items={[{ label: "Portfolio", href: "/portfolio" }]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] w-fit mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
              <span>OUR PRODUCTS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#101C19] leading-[1.12]">
              Ideas We&apos;ve Built. <br />
              <span className="text-[#087A3D]">Solutions We&apos;ve Delivered.</span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-5 text-base sm:text-lg text-[#65736D] leading-relaxed max-w-2xl font-normal">
              Explore selected software and AI engineering projects demonstrating our technical capabilities across computer vision, agentic reasoning, and high-concurrency web applications.
            </p>
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
