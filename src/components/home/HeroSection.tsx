"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../common/Button";
import { Container } from "../common/Container";
import { TechLayerVisual } from "../common/TechLayerVisual";
import { FloatingElement } from "../animations/FloatingElement";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Staggered motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.65,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF3] to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content (Cols 1-7 on lg, Cols 1-6 on xl) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left"
          >
            {/* Bespoke Studio Eyebrow Pill */}
            <motion.div variants={itemVariants}>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#DFEDE5] hover:border-[#00B86B] shadow-[0_2px_10px_-2px_rgba(0,184,107,0.08)] hover:shadow-md transition-all duration-300 mb-6 cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E9FFF2] text-[#008F53] font-mono text-[10px] font-bold tracking-wide">
                  <Sparkles className="w-3 h-3 text-[#00B86B]" />
                  DEEPLAYER
                </span>
                <span className="text-xs font-semibold text-[#142A27] tracking-tight">
                  Engineering What&apos;s Next
                </span>
                <span className="w-1 h-1 rounded-full bg-[#BCE8CF]" />
                <span className="text-xs font-mono font-semibold text-[#008F53] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>

            {/* Main Headline with Highlight Reveal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight text-[#142A27] leading-[1.08]"
            >
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
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-[#64736F] leading-relaxed max-w-2xl font-normal"
            >
              Cutting-edge software engineering, AI, and digital products to help your business innovate, grow, and stay ahead in the age of intelligence.
            </motion.p>

            {/* CTAs with hover lift */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Button
                href="/services"
                variant="primary"
                size="lg"
                withArrow
                className="w-full sm:w-auto font-semibold shadow-md shadow-[#087A3D]/15 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Services
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-medium hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Consultation
              </Button>
            </motion.div>

            {/* Engineering Pillars & Architecture Spec Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-7 border-t border-[#DFEDE5] w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DFEDE5]">
                <div className="sm:pr-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold">
                      01 · Capability
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#142A27] tracking-tight">
                    Custom AI &amp; LLMs
                  </p>
                </div>

                <div className="sm:px-4 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold">
                      02 · Speed
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#142A27] tracking-tight">
                    Sub-450ms Latency
                  </p>
                </div>

                <div className="sm:pl-4 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F53]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#008F53] font-semibold">
                      03 · Standard
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#142A27] tracking-tight">
                    Production Verified
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Visual (Cols 8-12 on lg, Cols 7-12 on xl) with subtle floating motion */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end w-full">
            <FloatingElement duration={6.5} distance={10} rotation={1.2} className="w-full flex items-center justify-center">
              <TechLayerVisual />
            </FloatingElement>
          </div>
        </div>
      </Container>
    </section>
  );
}
