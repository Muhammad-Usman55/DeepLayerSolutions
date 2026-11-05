"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { Central3DVisual } from "./services-preview/Central3DVisual";
import { ServiceCard } from "./services-preview/ServiceCard";
import { previewServices } from "./services-preview/types";

export function ServicesPreview() {

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAFCF9] via-[#F4FAF6] to-[#FAFCF9] border-t border-[#E3EDE5]"
      aria-label="Our Services Preview"
    >
      {/* Background Ambient Lighting & Subtle Grid Lines */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9]/60 via-[#F4FAF6] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Orbital Background Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#087A3D 0.75px, transparent 0.75px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <Container size="wide">
        {/* Upper Zone: Left Content Block & Right 3D Central Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content Area (Cols 1-5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Small Label Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-6 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
              <span>Our Services</span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#101C19] leading-[1.12]"
            >
              Technology That Moves Your{" "}
              <span className="text-[#087A3D] relative inline-block">
                Business
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#34D399]/40 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>{" "}
              Forward.
            </motion.h2>

            {/* Single CTA Pill Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 sm:mt-10"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#F4FAF6] border border-[#087A3D]/30 hover:border-[#087A3D] text-[#101C19] hover:text-[#087A3D] font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-300 w-fit"
              >
                <span>Explore Services</span>
                <span
                  className="w-7 h-7 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/60 text-[#087A3D] group-hover:bg-[#087A3D] group-hover:text-white group-hover:border-[#087A3D] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right 3D Visualization Area (Cols 6-12 on desktop) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <Central3DVisual />
          </div>
        </div>

        {/* Lower Zone: Four Floating Glassmorphism Service Cards */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

