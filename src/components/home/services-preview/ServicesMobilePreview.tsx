"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Code2,
  Globe,
  ShoppingCart,
  Store,
  Workflow,
  Cloud,
  Database,
  Smartphone,
  Compass,
  SearchCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { previewServices, PreviewService, VisualType } from "./types";
import { Card3DVisual } from "./Card3DVisual";

function getServiceIcon(type: VisualType) {
  switch (type) {
    case "ai":
      return Brain;
    case "genai":
      return Sparkles;
    case "ecommerce":
      return ShoppingCart;
    case "erp":
      return Store;
    case "automation":
      return Workflow;
    case "software":
      return Code2;
    case "web":
      return Globe;
    case "cloud":
      return Cloud;
    case "data":
      return Database;
    case "mobile":
      return Smartphone;
    case "consulting":
      return Compass;
    case "seo":
      return SearchCheck;
    default:
      return Brain;
  }
}

const SERVICE_CAPABILITIES: Record<string, string[]> = {
  "ai-ml": ["Predictive Models", "Computer Vision", "Neural Nets"],
  "gen-ai": ["Multi-Agent Swarms", "Enterprise RAG", "Custom LLMs"],
  "ecommerce": ["Headless Stores", "Global Checkout", "AI Recommendations"],
  "erp-pos": ["Real-Time Sync", "Inventory Control", "Cloud POS"],
  "business-automation": ["RPA Workflows", "Event Bots", "Zero-Touch Ops"],
  "custom-software": ["High-Concurrency", "Microservices", "REST & gRPC"],
  "web-dev": ["Next.js & React", "Sub-second P99", "Edge Delivery"],
  "cloud-devops": ["Kubernetes & CI/CD", "AWS & GCP", "99.99% Uptime"],
  "data-engineering": ["ETL Pipelines", "Data Lakes", "Real-Time Telemetry"],
  "mobile-app": ["iOS & Android", "React Native", "Offline-First Sync"],
  "ai-consulting": ["Architecture Audit", "ROI Roadmap", "Security Compliance"],
  "seo-digital-marketing": ["Core Web Vitals", "Semantic Search", "Conversion Rate"],
};

export function ServicesMobilePreview() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: "all", label: "All (12)" },
    { id: "ai-automation", label: "⚡ AI & Automation" },
    { id: "enterprise-commerce", label: "🛒 Platforms & ERP" },
    { id: "cloud-growth", label: "🌐 Cloud & Web" },
  ];

  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return previewServices;
    return previewServices.filter((s) => s.categoryGroup === selectedCategory);
  }, [selectedCategory]);

  const activeService: PreviewService =
    filteredServices[currentIndex] || filteredServices[0] || previewServices[0];

  const IconComponent = getServiceIcon(activeService.visualType);
  const capabilities = SERVICE_CAPABILITIES[activeService.id] || [
    "Enterprise Ready",
    "High Scale",
    "Bespoke",
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredServices.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredServices.length) % filteredServices.length);
  };

  return (
    <div className="w-full">
      {/* 1. Mobile Header with Punchy Copy */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF] text-[10px] font-bold text-[#008F53] uppercase tracking-wider mb-2">
          <span>✦ Core Services</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
          What We <span className="text-[#008F53]">Build</span>
        </h2>
        <p className="text-xs text-[#64736F] mt-1 max-w-xs mx-auto">
          Intelligent software &amp; autonomous AI architectures.
        </p>
      </div>

      {/* 2. Horizontal Tactile Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 mb-4 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? "bg-[#008F53] text-white shadow-xs"
                  : "bg-white text-[#142A27] border border-[#DFEDE5] hover:bg-[#F2F7F4]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Hero Spotlight Card */}
      <div className="relative rounded-3xl bg-linear-to-b from-white via-[#F8FCFA] to-[#F1FAF5] border border-[#DFEDE5] shadow-md p-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#008F53]/10 via-transparent to-transparent rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            {/* Top Bar: Category Pill & Icon */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-bold bg-[#E9FFF2] px-2.5 py-1 rounded-full border border-[#BCE8CF]">
                {activeService.category}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#008F53] text-white flex items-center justify-center shadow-xs">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Center: 3D Visual Stage */}
            <div className="w-full h-36 flex items-center justify-center my-1 rounded-2xl bg-white/70 border border-[#E3EDE5] shadow-2xs overflow-hidden relative">
              <div className="scale-90 flex items-center justify-center">
                <Card3DVisual type={activeService.visualType} />
              </div>
            </div>

            {/* Content: Title & Short 1-Line Description */}
            <div className="mt-3">
              <h3 className="text-lg font-extrabold text-[#142A27] tracking-tight">
                {activeService.title}
              </h3>
              <p className="text-xs text-[#5B6D67] mt-1 leading-relaxed line-clamp-2">
                {activeService.description}
              </p>
            </div>

            {/* Capabilities Micro-Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#DFEDE5]/70">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-[#087A3D] border border-[#CDE5D5]"
                >
                  {cap}
                </span>
              ))}
            </div>

            {/* Action CTA Button */}
            <Link
              href={`/services/${activeService.slug}`}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#008F53] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#007343] transition-colors shadow-xs active:scale-98"
            >
              <span>Explore {activeService.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* 4. Navigation Arrows & Slide Counter */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E3ECE7]">
          <span className="text-[11px] font-mono text-[#64736F] font-semibold">
            <span className="text-[#008F53] font-bold">{currentIndex + 1}</span> /{" "}
            {filteredServices.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-white border border-[#DFEDE5] text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] transition-colors cursor-pointer active:scale-90"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-white border border-[#DFEDE5] text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] transition-colors cursor-pointer active:scale-90"
              aria-label="Next service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Link to Full Catalog */}
      <div className="text-center mt-3">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008F53] hover:underline"
        >
          <span>View all 12 services in catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
