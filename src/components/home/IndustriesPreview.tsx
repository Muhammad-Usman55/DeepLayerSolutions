"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  ArrowRight,
  Activity,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";
import { Carousel } from "../carousel/Carousel";

interface IndustryItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
  tagline: string;
  badge: string;
}

const industries: IndustryItem[] = [
  {
    title: "Healthcare",
    tagline: "AI Diagnostics & Clinical Workflow Intelligence",
    description: "Smarter healthcare with AI diagnostics, medical vision analysis, and HIPAA-compliant patient intelligence.",
    icon: Stethoscope,
    slug: "healthcare",
    badge: "HIPAA COMPLIANT",
  },
  {
    title: "Finance & FinTech",
    tagline: "Sub-Second Fraud Scoring & Trading Systems",
    description: "Secure & intelligent financial platforms, sub-second fraud detection, algorithmic scoring, and ledger automation.",
    icon: TrendingUp,
    slug: "finance-fintech",
    badge: "HIGH THROUGHPUT",
  },
  {
    title: "Education & EdTech",
    tagline: "Multi-Modal RAG & Academic Q&A Systems",
    description: "Personalized learning pathways, syllabus-aligned retrieval systems, and automated evaluation engines.",
    icon: GraduationCap,
    slug: "education-edtech",
    badge: "ADAPTIVE AI",
  },
  {
    title: "E-Commerce & Retail",
    tagline: "Visual Search & Real-Time Footfall Vision",
    description: "Hyper-personalized shopping journeys, real-time edge store analytics, and predictive inventory optimization.",
    icon: ShoppingBag,
    slug: "ecommerce-retail",
    badge: "EDGE VISION",
  },
  {
    title: "Manufacturing",
    tagline: "Predictive Maintenance & Defect Classification",
    description: "Drive floor efficiency with real-time edge computer vision, automated defect labeling, and acoustic predictive maintenance.",
    icon: Factory,
    slug: "manufacturing",
    badge: "IOT INTEGRATED",
  },
  {
    title: "Real Estate",
    tagline: "Valuation Algorithms & Digital Twins",
    description: "Innovative valuation algorithms, geospatial property intelligence, digital twin 3D tours, and leasing automation.",
    icon: Building2,
    slug: "real-estate",
    badge: "SPATIAL COMPUTING",
  },
];

// Bespoke 3D Glass Graphic for each industry
function IndustryGraphic({ slug }: { slug: string }) {
  switch (slug) {
    case "healthcare":
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <Stethoscope className="w-8 h-8" />
          </div>
          {/* Subtle ECG pulse wave */}
          <svg className="absolute bottom-3 left-4 right-4 h-6 text-[#008F53]/30" viewBox="0 0 100 20" fill="none">
            <path d="M0 10 H35 L40 2 L45 18 L50 6 L55 12 L60 10 H100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "finance-fintech":
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-8 h-8" />
          </div>
          {/* Subtle Bar Chart Indicator */}
          <div className="absolute bottom-3 right-6 flex items-end gap-1.5 opacity-40">
            <div className="w-2 h-4 bg-[#00B86B] rounded-xs" />
            <div className="w-2 h-7 bg-[#00B86B] rounded-xs" />
            <div className="w-2 h-10 bg-[#008F53] rounded-xs" />
          </div>
        </div>
      );
    case "education-edtech":
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="absolute bottom-3 left-6 text-[10px] font-mono text-[#008F53]/50 font-bold tracking-widest">
            RAG // CITATION GUARANTEE
          </div>
        </div>
      );
    case "ecommerce-retail":
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="absolute bottom-3 right-6 text-[10px] font-mono text-[#008F53]/50 font-bold tracking-widest">
            STORE DWELL // 48 FPS
          </div>
        </div>
      );
    case "manufacturing":
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <Factory className="w-8 h-8" />
          </div>
          <div className="absolute bottom-3 left-6 text-[10px] font-mono text-[#008F53]/50 font-bold tracking-widest">
            PREDICTIVE TELEMETRY
          </div>
        </div>
      );
    default:
      return (
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-b from-[#F8FCF9] to-[#E9FFF2] overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#DFEDE5] flex items-center justify-center text-[#008F53] group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="absolute bottom-3 right-6 text-[10px] font-mono text-[#008F53]/50 font-bold tracking-widest">
            DIGITAL TWIN 3D
          </div>
        </div>
      );
  }
}

export function IndustriesPreview() {
  return (
    <section className="py-20 md:py-28 bg-[#F8FCF9] border-t border-[#DFEDE5]">
      <Container size="wide">
        <SectionHeading
          badge="Sectors & Domains"
          title="Industry-Specific Expertise."
          highlight="Industry-Specific"
          subtitle="From early-stage disruptors to enterprise leaders, we engineer digital solutions tailored to the operational realities of your domain."
          action={
            <Button href="/industries" variant="secondary" size="md" withArrow>
              Explore All Industries
            </Button>
          }
        />

        {/* Responsive Industries Carousel (3 Desktop, 2 Tablet, 1 Mobile) */}
        <div className="mt-8">
          <Carousel
            desktopVisible={3}
            tabletVisible={2}
            mobileVisible={1}
            gap={24}
            showControls={true}
            showDots={true}
            ariaLabel="Industry expertise carousel"
          >
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 h-full focus:outline-hidden focus:ring-2 focus:ring-[#008F53]"
              >
                {/* Visual Header */}
                <IndustryGraphic slug={ind.slug} />

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#008F53] px-2.5 py-0.5 rounded-full bg-[#E9FFF2] border border-[#DFEDE5]">
                        {ind.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors">
                      {ind.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#008F53]">
                      {ind.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[#64736F] leading-relaxed line-clamp-3">
                      {ind.description}
                    </p>
                  </div>

                  {/* Footer Arrow */}
                  <div className="mt-6 pt-4 border-t border-[#DFEDE5] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#008F53] group-hover:text-[#007343]">
                    <span>Explore Domain</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#008F53]" />
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
