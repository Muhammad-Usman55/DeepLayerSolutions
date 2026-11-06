"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { GrowthVisual } from "./why-choose-us/GrowthVisual";
import { ValueCard } from "./why-choose-us/ValueCard";
import { valueCardsData } from "./why-choose-us/types";

export function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAFCF9] via-[#F4FAF6] to-[#FAFCF9] border-t border-[#E3EDE5] select-none"
      aria-label="Why Choose Us"
    >
      {/* Background Volumetric Ambient Lighting & Subtle Grid Lines */}
      <div className="absolute top-1/4 right-1/4 -z-10 w-[550px] h-[480px] bg-gradient-to-br from-[#E8F5E9]/70 via-[#F4FAF6] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-10 -z-10 w-[420px] h-[420px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none -z-10" />

      <Container size="wide">
        {/* Upper Zone: Left Content Block & Right 3D Intelligent Growth Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content Area (Cols 1-5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Small Label Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow variant="chip" className="mb-6">
                Why Choose Us
              </Eyebrow>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#142A27] leading-[1.12]"
            >
              Your Growth, <br />
              <span className="text-[#008F53] relative inline-block mt-1">
                Our Mission.
                {/* Curved Green Underline Accent Matching Reference Design */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 text-[#34D399] -z-10"
                  viewBox="0 0 160 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 11 C 45 4, 115 4, 156 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Single Short Supporting Sentence */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#64736F] font-normal leading-relaxed max-w-md"
            >
              We turn bold ideas into intelligent digital solutions.
            </motion.p>
          </div>

          {/* Right 3D Visualization Area (Cols 6-12 on desktop) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <GrowthVisual />
          </div>
        </div>

        {/* Lower Zone: Four Compact Floating Glass Value Cards */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {valueCardsData.map((card, index) => (
              <ValueCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
