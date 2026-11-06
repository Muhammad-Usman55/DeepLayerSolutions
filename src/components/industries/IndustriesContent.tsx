"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  Truck,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { CTASection } from "@/components/common/CTASection";
import {
  Healthcare3DVisual,
  Finance3DVisual,
  Education3DVisual,
  Ecommerce3DVisual,
  Manufacturing3DVisual,
  RealEstate3DVisual,
  Logistics3DVisual,
  LegalServices3DVisual,
} from "./IndustryVisuals";

interface IndustryShowcase {
  id: string;
  slug: string;
  title: string;
  category: string;
  metric: string;
  summary: string;
  capabilities: string[];
  VisualComponent: React.ComponentType<{ className?: string }>;
  icon: React.ComponentType<{ className?: string }>;
}

const industriesList: IndustryShowcase[] = [
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    category: "CLINICAL INTELLIGENCE",
    metric: "−40% Documentation Load",
    summary:
      "AI-assisted diagnostic triage, medical computer vision, and HIPAA-compliant patient document extraction pipelines.",
    capabilities: ["HIPAA Compliant", "Clinical AI", "EHR Interoperability"],
    VisualComponent: Healthcare3DVisual,
    icon: Stethoscope,
  },
  {
    id: "finance",
    slug: "finance-fintech",
    title: "Finance & FinTech",
    category: "HIGH-THROUGHPUT LEDGERS",
    metric: "99.7% Fraud Scoring Precision",
    summary:
      "Sub-second fraud scoring algorithms, streaming telemetry pipelines, automated KYC, and low-latency clearing.",
    capabilities: ["Sub-Second Scoring", "PCI-DSS Compliant", "Graph Risk Analysis"],
    VisualComponent: Finance3DVisual,
    icon: TrendingUp,
  },
  {
    id: "education",
    slug: "education-edtech",
    title: "Education & EdTech",
    category: "ADAPTIVE PEDAGOGY",
    metric: "2.4x Higher Course Completion",
    summary:
      "Dynamic mastery calibration, curriculum-grounded conversational tutors, and automated formative grading engines.",
    capabilities: ["Adaptive Pathways", "24/7 AI Tutors", "Formative Grading"],
    VisualComponent: Education3DVisual,
    icon: GraduationCap,
  },
  {
    id: "ecommerce",
    slug: "ecommerce-retail",
    title: "E-Commerce & Retail",
    category: "COMMERCE INTELLIGENCE",
    metric: "+32% Checkout Conversion",
    summary:
      "Real-time visual search, personalized recommendation engines, and predictive multi-warehouse inventory forecasting.",
    capabilities: ["Visual Search", "Dynamic Inventory", "Headless Velocity"],
    VisualComponent: Ecommerce3DVisual,
    icon: ShoppingBag,
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing & Industrial IoT",
    category: "EDGE & INDUSTRIAL AI",
    metric: "−65% Unplanned Line Downtime",
    summary:
      "High-speed edge computer vision for micro-surface defect classification and acoustic predictive machinery maintenance.",
    capabilities: ["Acoustic Telemetry", "Edge Defect Vision", "SCADA Hubs"],
    VisualComponent: Manufacturing3DVisual,
    icon: Factory,
  },
  {
    id: "realestate",
    slug: "real-estate",
    title: "Real Estate & PropTech",
    category: "SPATIAL & VALUATION",
    metric: "Instant Algorithmic Valuation",
    summary:
      "Geospatial automated valuation models (AVMs), interactive 3D digital twins, and frictionless automated digital leasing.",
    capabilities: ["3D Digital Twins", "AVM Analytics", "Smart Energy HVAC"],
    VisualComponent: RealEstate3DVisual,
    icon: Building2,
  },
  {
    id: "logistics",
    slug: "logistics-transportation",
    title: "Logistics & Transportation",
    category: "FLEET & ROUTE DISPATCH",
    metric: "−22% Fuel & Transit Mileage",
    summary:
      "Real-time dynamic route optimization, cold-chain GPS telemetry streaming, and automated multi-stop load dispatching.",
    capabilities: ["Route Optimization", "Cold-Chain GPS", "Automated Dispatch"],
    VisualComponent: Logistics3DVisual,
    icon: Truck,
  },
  {
    id: "professional-services",
    slug: "professional-services",
    title: "Professional Services & Legal",
    category: "CONTRACT & PRACTICE AI",
    metric: "70% Faster Contract Review",
    summary:
      "Automated clause risk analysis, secure role-based virtual data rooms, and intelligent firm knowledge retrieval engines.",
    capabilities: ["Contract Intelligence", "Virtual Data Rooms", "Granular Watermarking"],
    VisualComponent: LegalServices3DVisual,
    icon: Briefcase,
  },
];

export function IndustriesContent() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredIndustries =
    activeFilter === "all"
      ? industriesList
      : industriesList.filter((item) => item.slug === activeFilter);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-22 bg-gradient-to-b from-[#E9FFF2]/60 via-[#FAFCF9] to-white border-b border-[#DFEDE5] select-none">
        {/* Soft Ambient Light Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-[#E9FFF2] via-[#D5F9E6]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Industries", href: "/industries" }]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <Eyebrow variant="chip" className="mb-4">
              Specialized Sector Engineering
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#142A27] leading-[1.12]">
              Technology Built for <br />
              <span className="text-[#008F53]">Every Industry.</span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-[#64736F] leading-relaxed font-normal">
              Domain-calibrated software architectures, AI pipelines, and high-throughput systems engineered for rigorous compliance, operational clarity, and accelerated ROI.
            </p>

            {/* Quick Sector Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#008F53] text-white shadow-xs"
                    : "bg-white border border-[#DFEDE5] text-[#142A27] hover:border-[#008F53] hover:bg-[#E9FFF2]"
                }`}
              >
                All Industries (8)
              </button>

              {industriesList.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setActiveFilter(ind.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeFilter === ind.slug
                      ? "bg-[#008F53] text-white shadow-xs"
                      : "bg-white border border-[#DFEDE5] text-[#142A27] hover:border-[#008F53] hover:bg-[#E9FFF2]"
                  }`}
                >
                  {ind.title.split("&")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STREAMLINED 3D VISUAL SECTOR GRID */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFCF9]" aria-label="Industry Visual Solutions">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredIndustries.map((ind, index) => {
              const Icon = ind.icon;
              const Visual = ind.VisualComponent;

              return (
                <motion.div
                  key={ind.id}
                  id={ind.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 2) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] bg-white border border-[#DFEDE5] p-7 sm:p-9 transition-all duration-300 hover:border-[#008F53]/40 hover:-translate-y-1.5 shadow-[0_6px_24px_rgba(0,143,83,0.03)] hover:shadow-[0_20px_45px_rgba(0,143,83,0.09)]"
                >
                  {/* Top Bar: Icon, Category & Metric Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-5 border-b border-[#DFEDE5]/80">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#E9FFF2] border border-[#DFEDE5] text-[#008F53] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs">
                          <Icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#008F53]">
                            {ind.category}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#142A27] tracking-tight group-hover:text-[#008F53] transition-colors duration-200">
                            {ind.title}
                          </h2>
                        </div>
                      </div>

                      {/* Prominent High-Impact Metric Badge */}
                      <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] shrink-0">
                        {ind.metric}
                      </span>
                    </div>

                    {/* Mobile Metric Pill */}
                    <div className="sm:hidden mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
                        {ind.metric}
                      </span>
                    </div>
                  </div>

                  {/* Center Stage: Bespoke 3D Glass Vector Visualization */}
                  <div className="my-4 sm:my-6 flex items-center justify-center">
                    <div className="w-full max-w-[420px] transition-transform duration-500 ease-out group-hover:scale-105">
                      <Visual />
                    </div>
                  </div>

                  {/* Bottom Stage: 1-Sentence Summary, Capabilities & CTA */}
                  <div>
                    <p className="text-sm text-[#64736F] leading-relaxed mb-5 font-normal">
                      {ind.summary}
                    </p>

                    {/* 3 Streamlined Capability Chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {ind.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAFCF9] text-[#142A27] border border-[#DFEDE5] group-hover:border-[#008F53]/30 transition-colors"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA Action Row */}
                    <div className="pt-4 border-t border-[#DFEDE5]/80 flex items-center justify-between">
                      <Link
                        href={`/contact?industry=${ind.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008F53] group-hover:text-[#007343] transition-colors"
                      >
                        <span>Discuss {ind.title.split("&")[0].trim()}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href={`/contact?industry=${ind.slug}`}
                        className="w-10 h-10 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center group-hover:bg-[#008F53] group-hover:text-white transition-all duration-300 shadow-xs"
                        aria-label={`Inquire about ${ind.title}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. ENTERPRISE ENGINEERING STANDARDS STRIP */}
      <section className="py-14 sm:py-16 bg-white border-y border-[#DFEDE5] select-none">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#DFEDE5]">
            <div className="flex items-start gap-4 md:pr-6">
              <div className="w-11 h-11 rounded-2xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 border border-[#DFEDE5]">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#142A27]">
                  SOC 2 &amp; HIPAA Calibrated
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                  Bank-grade encryption, zero data retention pipelines, and strict regulatory isolation standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6 md:pt-0 md:px-6">
              <div className="w-11 h-11 rounded-2xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 border border-[#DFEDE5]">
                <Zap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#142A27]">
                  Sub-450ms Real-Time Inference
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                  Streaming telemetry, edge model optimization, and low-latency microservices engineered for production.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-2xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 border border-[#DFEDE5]">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#142A27]">
                  Zero-Downtime Deployment
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                  Automated test suites, continuous integration pipelines, and guaranteed enterprise 99.99% SLAs.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <CTASection
        title="Ready to Build for Your Industry?"
        subtitle="Let's turn your next big idea into a powerful digital solution. Our senior engineers and AI architects are ready to collaborate."
        buttonText="Let's Discuss Your Project"
        buttonHref="/contact"
      />
    </>
  );
}

