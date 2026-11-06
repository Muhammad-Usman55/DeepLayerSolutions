import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/common/Button";
import { CTASection } from "@/components/common/CTASection";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";
import { ServiceHero3DVisual } from "@/components/services/Service3DVisuals";
import { ServiceArchitectureFlow } from "@/components/services/ServiceArchitectureFlow";
import { ServiceImpactMatrix } from "@/components/services/ServiceImpactMatrix";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Sparkles,
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Compass,
};

// Key quantitative telemetry metrics for each service
const serviceMetricsMap: Record<string, { label: string; value: string }[]> = {
  "ai-machine-learning": [
    { label: "Precision Rate", value: "99.4%" },
    { label: "Inference Latency", value: "<45ms" },
    { label: "Drift Defense", value: "Continuous" },
  ],
  "generative-ai-llms": [
    { label: "RAG Latency", value: "<350ms" },
    { label: "Hallucination Defense", value: "Strict Guardrails" },
    { label: "Token Efficiency", value: "-40% Costs" },
  ],
  "custom-software-development": [
    { label: "Uptime SLA", value: "99.99%" },
    { label: "API Response", value: "<30ms" },
    { label: "Test Coverage", value: ">92%" },
  ],
  "web-development": [
    { label: "Lighthouse Score", value: "100" },
    { label: "First Contentful Paint", value: "<0.6s" },
    { label: "Accessibility", value: "WCAG 2.1 AA" },
  ],
  "data-engineering": [
    { label: "Pipeline Throughput", value: "10M+ Events/s" },
    { label: "Query Latency", value: "Sub-Second" },
    { label: "Schema Validation", value: "100% Strict" },
  ],
  "cloud-solutions-devops": [
    { label: "Multi-Cloud Uptime", value: "99.99%" },
    { label: "Deploy Velocity", value: "Zero Downtime" },
    { label: "Infrastructure as Code", value: "100% Codified" },
  ],
  "mobile-app-development": [
    { label: "UI Thread Speed", value: "Native 60 FPS" },
    { label: "Offline Persistence", value: "SQLite Engine" },
    { label: "Crash-Free Users", value: "99.8%" },
  ],
  "it-consulting": [
    { label: "Operational TCO", value: "-40% Costs" },
    { label: "Velocity Increase", value: "3.5x Faster" },
    { label: "Tech Debt Reduction", value: "Measured ROI" },
  ],
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const url = `${siteConfig.url}/services/${service.slug}`;

  return {
    title: `${service.title} — DeepLayer Solutions`,
    description: service.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: `${service.title} | DeepLayer Solutions`,
      description: service.shortDescription,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | DeepLayer Solutions`,
      description: service.shortDescription,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName] || Brain;
  const metrics = serviceMetricsMap[service.slug] || [
    { label: "Enterprise SLA", value: "99.99%" },
    { label: "Production Verified", value: "Yes" },
    { label: "Senior Lead", value: "Principal" },
  ];
  const related = servicesData.filter((s) =>
    service.relatedServices?.includes(s.slug)
  );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.category,
    areaServed: "Worldwide",
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* 1. VISUAL HERO SECTION (Two-Column Layout with 3D Architecture Visual) */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E9FFF2]/50 via-[#FAFCF9] to-transparent border-b border-[#DFEDE5]">
        {/* Soft background ambient gradient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#E9FFF2]/70 via-[#F3FAF5]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <Container size="wide">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Crisp Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-[#008F53] border border-[#BCE8CF] mb-4 shadow-2xs">
                <Icon className="w-3.5 h-3.5 text-[#00B86B]" />
                <span>{service.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.15]">
                {service.title}
              </h1>

              <p className="mt-3 text-base sm:text-lg font-semibold text-[#008F53]">
                {service.heroTagline}
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#64736F] leading-relaxed max-w-2xl font-normal">
                {service.fullDescription}
              </p>

              {/* 3 Telemetry Metrics Strip */}
              <div className="mt-6 pt-5 border-t border-[#DFEDE5] w-full grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                {metrics.map((m) => (
                  <div key={m.label} className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DFEDE5] shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-mono uppercase text-[#008F53] font-bold block truncate">
                      {m.label}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#142A27] block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Button href="/contact" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                  Start Your Project
                </Button>
                <Button href="#architecture" variant="outline" size="lg" className="w-full sm:w-auto">
                  View Architecture
                </Button>
              </div>
            </div>

            {/* Right Column: Bespoke 3D Service Architecture Visual */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-square flex items-center justify-center p-2">
                <ServiceHero3DVisual slug={service.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SYSTEM ARCHITECTURE BLUEPRINT (Interactive Visual Flow) */}
      <section id="architecture" className="py-16 md:py-20 scroll-mt-10">
        <Container size="wide">
          <ServiceArchitectureFlow slug={service.slug} />
        </Container>
      </section>

      {/* 3. BUSINESS CHALLENGES VS. DEEPLAYER SOLUTION (Visual Impact Matrix) */}
      <section className="py-14 md:py-18 bg-[#FAFCF9] border-y border-[#DFEDE5]">
        <Container size="wide">
          <ServiceImpactMatrix
            serviceTitle={service.title}
            challenges={service.challenges}
            approach={service.approach}
          />
        </Container>
      </section>

      {/* 4. KEY TECHNICAL CAPABILITIES & TOOLCHAIN */}
      <section className="py-16 md:py-20 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Capabilities (Cols 1-7) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
                <Layers className="w-3.5 h-3.5 text-[#00B86B]" />
                <span>CORE ENGINEERING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-6">
                Key Technical Capabilities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#00B86B] shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#008F53] group-hover:bg-[#00B86B] transition-colors shrink-0" />
                    <span className="text-sm font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Frameworks (Cols 8-12) */}
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#FAFCF9] border border-[#DFEDE5] shadow-xs">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DFEDE5] flex items-center justify-center text-[#008F53] shadow-2xs">
                  <Cpu className="w-5 h-5 text-[#008F53]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-bold block">
                    PRODUCTION TOOLCHAIN
                  </span>
                  <h4 className="text-lg font-bold text-[#142A27]">
                    Technologies &amp; Frameworks
                  </h4>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white text-[#008F53] border border-[#DFEDE5] hover:border-[#008F53] shadow-2xs hover:shadow-xs transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFEDE5] flex items-center gap-2 text-xs text-[#64736F]">
                <ShieldCheck className="w-4 h-4 text-[#008F53] shrink-0" />
                <span>Audited for enterprise security and high-throughput concurrency.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DEVELOPMENT PROCESS (How We Deliver — 4-Step Connected Pipeline) */}
      <section className="py-16 md:py-22 bg-[#FAFCF9] border-t border-[#DFEDE5]">
        <Container size="wide">
          <ServiceProcessTimeline
            process={service.process}
            serviceTitle={service.title}
          />
        </Container>
      </section>

      {/* 6. COMPLEMENTARY SERVICES */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-[#DFEDE5]">
          <Container size="wide">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-[#008F53] font-bold tracking-wider block mb-1">
                  CROSS-FUNCTIONAL SYNERGY
                </span>
                <h3 className="text-2xl font-bold text-[#142A27]">
                  Complementary Services
                </h3>
              </div>
              <Link
                href="/services"
                className="text-xs font-mono font-semibold text-[#008F53] hover:underline hidden sm:flex items-center gap-1"
              >
                All Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#008F53] hover:bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#008F53] font-bold">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mt-1">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#64736F] line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#DFEDE5] flex items-center gap-1.5 text-xs font-bold text-[#008F53]">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 7. BOTTOM CTA */}
      <CTASection
        title={`Ready to Build Your ${service.title} Solution?`}
        subtitle="Speak with our technical leads to architect a high-performance system for your business."
        buttonText="Book a Technical Consultation"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
