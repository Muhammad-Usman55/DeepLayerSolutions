"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { Central3DVisual } from "./services-preview/Central3DVisual";
import { ServiceCard } from "./services-preview/ServiceCard";
import { previewServices, ServiceFilterCategory } from "./services-preview/types";

const filterCategories: { id: ServiceFilterCategory; label: string; count: number }[] = [
  { id: "all", label: "All Services", count: previewServices.length },
  {
    id: "ai-automation",
    label: "AI & Automation",
    count: previewServices.filter((s) => s.categoryGroup === "ai-automation").length,
  },
  {
    id: "enterprise-commerce",
    label: "Platforms & Commerce",
    count: previewServices.filter((s) => s.categoryGroup === "enterprise-commerce").length,
  },
  {
    id: "cloud-growth",
    label: "Cloud & Growth",
    count: previewServices.filter((s) => s.categoryGroup === "cloud-growth").length,
  },
];

export function ServicesPreview() {
  const [activeCategory, setActiveCategory] = useState<ServiceFilterCategory>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return previewServices;
    return previewServices.filter((s) => s.categoryGroup === activeCategory);
  }, [activeCategory]);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAFCF9] via-[#F4FAF6] to-[#FAFCF9] border-t border-[#E3EDE5]"
      aria-label="Our Services Preview"
    >
      {/* Background Ambient Lighting & Subtle Grid Lines */}
      <div className="absolute top-0 left-1/6 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9]/70 via-[#F4FAF6] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Orbital Background Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#087A3D 0.75px, transparent 0.75px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <Container size="wide">
        {/* Mobile Section Heading Matching Mockup */}
        <div className="text-center mb-6 lg:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Our <span className="text-[#008F53]">Services</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1 font-normal">
            Innovative solutions for a smarter tomorrow.
          </p>
        </div>

        {/* Upper Zone: Left 3D Central Visual & Right Content Block (Desktop Only) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 3D Visualization Area (Cols 1-7 on desktop, 2nd on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex items-center justify-center relative">
            <Central3DVisual />
          </div>

          {/* Right Content Area (Cols 8-12 on desktop, 1st on mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow variant="chip" className="mb-6">
                Our Services
              </Eyebrow>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#142A27] leading-[1.12]"
            >
              Technology That Moves Your{" "}
              <span className="text-[#008F53] relative inline-block">
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
                <span>Explore All Services</span>
                <span
                  className="w-7 h-7 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/60 text-[#087A3D] group-hover:bg-[#087A3D] group-hover:text-white group-hover:border-[#087A3D] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Lower Zone: Category Filter Tabs & Responsive Service Cards */}
        <div className="lg:mt-16">
          {/* Interactive Category Filter Pills */}
          <div className="mt-8 sm:mt-10 mb-6 sm:mb-8 flex items-center justify-between flex-wrap gap-3 border-b border-[#DFEDE5]/70 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {filterCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#008F53] text-white shadow-xs border border-[#008F53]"
                        : "bg-white/85 hover:bg-white text-[#142A27] hover:text-[#008F53] border border-[#DFEDE5]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-[#E9FFF2] text-[#008F53]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] transition-colors"
            >
              <span>View Full Services Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service Cards Grid (Desktop: 4 columns, Tablet: 3 columns, Mobile: 2 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredServices.map((service, index) => (
              <div key={service.id} className="h-full">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

          {/* Bottom Custom Architecture Banner */}
          <div className="mt-10 sm:mt-14 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#DFEDE5] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
            <div className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#142A27]">
                Need a bespoke multi-service architecture?
              </h3>
              <p className="text-xs sm:text-sm text-[#64736F] mt-1 max-w-2xl">
                We design integrated platforms pairing autonomous AI models, modern headless e-commerce, cloud DevOps, and ERP workflows engineered for your enterprise requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#008F53] hover:bg-[#075B3E] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
