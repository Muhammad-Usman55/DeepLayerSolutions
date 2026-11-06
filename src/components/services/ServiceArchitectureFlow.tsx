"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface ArchitectureStep {
  tier: string;
  name: string;
  highlight: string;
  specs: string[];
  latency: string;
}

const serviceArchitectureMap: Record<
  string,
  {
    heading: string;
    subheading: string;
    tiers: ArchitectureStep[];
  }
> = {
  "ai-machine-learning": {
    heading: "Production AI Inference Pipeline",
    subheading: "End-to-end data ingestion, neural model computation, and low-latency prediction serving.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Data Stream & Validation",
        highlight: "Raw Ingestion & Feature Engineering",
        specs: ["Automated schema checks", "Real-time vectorization", "Zero data leakage"],
        latency: "<15ms",
      },
      {
        tier: "Tier 02",
        name: "DeepLayer Tensor Engine",
        highlight: "Quantized Neural Backbone",
        specs: ["PyTorch / ONNX Runtime", "GPU-accelerated inference", "Dynamic batching"],
        latency: "<45ms",
      },
      {
        tier: "Tier 03",
        name: "Enterprise Telemetry",
        highlight: "Production Monitoring & Drift",
        specs: ["Continuous drift detection", "Automated retraining loop", "SOC2 compliance"],
        latency: "Real-time",
      },
    ],
  },
  "generative-ai-llms": {
    heading: "Enterprise Agentic RAG Architecture",
    subheading: "Ground foundational models in your proprietary data with strict guardrails.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Context & Vector Retrieval",
        highlight: "Hybrid Semantic Indexing",
        specs: ["Hierarchical chunking", "Sparse + dense reranking", "Document permission ACLs"],
        latency: "<80ms",
      },
      {
        tier: "Tier 02",
        name: "Agent Reasoning Core",
        highlight: "Multi-Step Orchestration",
        specs: ["Strict prompt guardrails", "Tool & function calling", "Token optimization"],
        latency: "<220ms",
      },
      {
        tier: "Tier 03",
        name: "Verified Output Stream",
        highlight: "Hallucination Defense",
        specs: ["Citation attribution", "Output schema validation", "Private VPC isolation"],
        latency: "Streamed",
      },
    ],
  },
  "custom-software-development": {
    heading: "Hexagonal Microservices Topology",
    subheading: "Decoupled domain boundaries, asynchronous event buses, and zero-downtime reliability.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Edge API Gateway",
        highlight: "Secure Ingress & Auth",
        specs: ["OAuth2 / JWT validation", "Distributed rate limiting", "mTLS encryption"],
        latency: "<10ms",
      },
      {
        tier: "Tier 02",
        name: "Domain Service Mesh",
        highlight: "Event-Driven Core Logic",
        specs: ["Domain-driven boundaries", "Kafka / RabbitMQ events", "Idempotent transactions"],
        latency: "<35ms",
      },
      {
        tier: "Tier 03",
        name: "Persistence & Audit",
        highlight: "High-Availability Storage",
        specs: ["PostgreSQL read replicas", "Redis multi-tier cache", "Automated rollbacks"],
        latency: "99.99%",
      },
    ],
  },
  "web-development": {
    heading: "Modern Edge Web Architecture",
    subheading: "Server-first hydration, component-level caching, and instant interaction.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Global Edge Network",
        highlight: "Sub-Second Ingress",
        specs: ["Edge routing & SSL", "Dynamic CDN caching", "Asset compression"],
        latency: "<20ms",
      },
      {
        tier: "Tier 02",
        name: "Next.js SSR Engine",
        highlight: "React Server Components",
        specs: ["Zero-bundle server parts", "Incremental Static Reg.", "Streaming hydration"],
        latency: "<60ms",
      },
      {
        tier: "Tier 03",
        name: "Client Interaction",
        highlight: "Optimistic 60fps UI",
        specs: ["100 Lighthouse score", "WCAG 2.1 AA accessible", "Zero layout shift"],
        latency: "60 FPS",
      },
    ],
  },
  "data-engineering": {
    heading: "Real-Time Lakehouse Pipeline",
    subheading: "From multi-source ingestion to validated, analytics-ready columnar warehouses.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Multi-Source Ingestion",
        highlight: "Continuous Data Capture",
        specs: ["Kafka streaming brokers", "Change data capture (CDC)", "Dead-letter queues"],
        latency: "<50ms",
      },
      {
        tier: "Tier 02",
        name: "Processing & Transformation",
        highlight: "Automated dbt & Spark",
        specs: ["Schema drift rejection", "Deduplication & joins", "Data lineage tracking"],
        latency: "Instant",
      },
      {
        tier: "Tier 03",
        name: "Analytical Serving",
        highlight: "Sub-Second BI Queries",
        specs: ["ClickHouse / Snowflake", "Materialized metric stores", "Zero replica lag"],
        latency: "<100ms",
      },
    ],
  },
  "cloud-solutions-devops": {
    heading: "Resilient Multi-Region Cloud Mesh",
    subheading: "GitOps deployment pipelines with automated canary rollouts and full observability.",
    tiers: [
      {
        tier: "Tier 01",
        name: "GitOps CI/CD Gateway",
        highlight: "Automated Verification",
        specs: ["Terraform codified infra", "Automated test suites", "Secret rotation & KMS"],
        latency: "Automated",
      },
      {
        tier: "Tier 02",
        name: "Kubernetes Cluster Pods",
        highlight: "Dynamic Autoscaling",
        specs: ["Horizontal pod scaling", "Canary traffic shifting", "Zero-downtime deploy"],
        latency: "99.99%",
      },
      {
        tier: "Tier 03",
        name: "Unified Observability",
        highlight: "Proactive Incident Defense",
        specs: ["Prometheus / Grafana", "Distributed APM traces", "Self-healing restarts"],
        latency: "Real-time",
      },
    ],
  },
  "mobile-app-development": {
    heading: "Offline-First Mobile Architecture",
    subheading: "Silky 60fps UI threads, local embedded database, and seamless background reconciliation.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Fluid Native UI Layer",
        highlight: "Gesture & Haptics Engine",
        specs: ["60 FPS hardware accel.", "Adaptive tablet/phone UI", "Biometric secure auth"],
        latency: "Native 60fps",
      },
      {
        tier: "Tier 02",
        name: "Local Embedded Engine",
        highlight: "SQLite & Reactive State",
        specs: ["Instant offline reads", "Optimistic mutations", "Secure key storage"],
        latency: "<5ms",
      },
      {
        tier: "Tier 03",
        name: "Cloud Sync Gateway",
        highlight: "Conflict-Free Replay",
        specs: ["Background reconciliation", "Differential sync payloads", "Push notifications"],
        latency: "Background",
      },
    ],
  },
  "it-consulting": {
    heading: "Strategic Modernization Roadmap",
    subheading: "Pragmatic discovery, de-risking architecture, and measurable business velocity.",
    tiers: [
      {
        tier: "Tier 01",
        name: "Discovery & Tech Audit",
        highlight: "Objective Risk Profiling",
        specs: ["Monolith debt scoring", "Cloud cost profiling", "Security vulnerability scan"],
        latency: "Week 1-2",
      },
      {
        tier: "Tier 02",
        name: "Target Architecture Blueprint",
        highlight: "Vendor-Neutral Strategy",
        specs: ["Microservices vs Modular", "AI feasibility & ROI model", "Phased execution steps"],
        latency: "Week 3-4",
      },
      {
        tier: "Tier 03",
        name: "Execution & Oversight",
        highlight: "Senior Technical Guidance",
        specs: ["Principal architect review", "Team upskilling & CI/CD", "-40% ongoing TCO"],
        latency: "Ongoing",
      },
    ],
  },
};

export function ServiceArchitectureFlow({ slug }: { slug: string }) {
  const data = serviceArchitectureMap[slug] || serviceArchitectureMap["ai-machine-learning"];
  const [activeTier, setActiveTier] = useState<number>(1);

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-[0_4px_24px_-4px_rgba(0,143,83,0.06)] relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E9FFF2]/60 via-[#F3FAF5]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            {data.heading}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-[#64736F] max-w-xl">
            {data.subheading}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#008F53] bg-[#FAFCF9] border border-[#DFEDE5] px-3.5 py-1.5 rounded-full shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" />
          <span>PRODUCTION-READY SPEC</span>
        </div>
      </div>

      {/* 3-Tier Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {data.tiers.map((tier, idx) => {
          const isActive = activeTier === idx;
          return (
            <div
              key={tier.name}
              onClick={() => setActiveTier(idx)}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-b from-[#FAFCF9] to-[#E9FFF2]/40 border-[#00B86B] shadow-[0_8px_20px_-4px_rgba(0,184,107,0.15)] ring-1 ring-[#00B86B]/30"
                  : "bg-[#FAFCF9] border-[#DFEDE5] hover:border-[#008F53]/40 hover:bg-white"
              }`}
            >
              {/* Connector Arrow (Desktop only, between cards 0->1 and 1->2) */}
              {idx < 2 && (
                <div className="hidden lg:flex absolute -right-4.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-[#DFEDE5] items-center justify-center text-[#008F53] shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Tier Pill & Latency */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#008F53] text-white"
                      : "bg-[#E9FFF2] text-[#008F53]"
                  }`}
                >
                  {tier.tier}
                </span>
                <span className="text-xs font-mono font-semibold text-[#008F53] bg-white border border-[#DFEDE5] px-2.5 py-0.5 rounded-full">
                  {tier.latency}
                </span>
              </div>

              {/* Title & Highlight */}
              <h4 className="text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors">
                {tier.name}
              </h4>
              <p className="text-xs font-medium text-[#008F53] mt-1 mb-4">
                {tier.highlight}
              </p>

              {/* Specs List */}
              <ul className="space-y-2.5 pt-3 border-t border-[#DFEDE5]/80">
                {tier.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-xs text-[#64736F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B86B] shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

