import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Layers,
  Cpu,
  Clock,
  Lock,
  Server,
  Activity,
  Sparkles,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  Truck,
  Briefcase,
  UtensilsCrossed,
} from "lucide-react";
import { industriesData } from "@/data/industries";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/common/Button";
import { CTASection } from "@/components/common/CTASection";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";
import {
  Healthcare3DVisual,
  Finance3DVisual,
  Education3DVisual,
  Ecommerce3DVisual,
  Manufacturing3DVisual,
  RealEstate3DVisual,
  Logistics3DVisual,
  LegalServices3DVisual,
  Hospitality3DVisual,
} from "@/components/industries/IndustryVisuals";

// Visual Component Mapping
const visualMap: Record<string, React.ComponentType<{ className?: string }>> = {
  healthcare: Healthcare3DVisual,
  "finance-fintech": Finance3DVisual,
  "education-research": Education3DVisual,
  "retail-ecommerce": Ecommerce3DVisual,
  manufacturing: Manufacturing3DVisual,
  "real-estate": RealEstate3DVisual,
  "logistics-transportation": Logistics3DVisual,
  "professional-services": LegalServices3DVisual,
  "hospitality-restaurants": Hospitality3DVisual,
};

// Lucide Icon Mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  Truck,
  Briefcase,
  UtensilsCrossed,
  Activity,
  BarChart3,
};

// Sector Specific Telemetry & Metric Highlights
const sectorMetricsMap: Record<string, { label: string; value: string; detail: string }[]> = {
  healthcare: [
    { label: "Documentation Burden", value: "−40%", detail: "Automated EHR summarization" },
    { label: "Diagnostic Velocity", value: "3.2x Faster", detail: "Computer vision image triage" },
    { label: "Compliance Standard", value: "100% HIPAA", detail: "End-to-end zero-trust encryption" },
    { label: "Interoperability", value: "HL7 / FHIR", detail: "Native bidirectional sync" },
  ],
  "finance-fintech": [
    { label: "Fraud Scoring Precision", value: "99.7%", detail: "Sub-second inference models" },
    { label: "Decision Latency", value: "<12ms", detail: "Real-time streaming telemetry" },
    { label: "Compliance Framework", value: "PCI-DSS / SOC 2", detail: "Tamper-evident audit ledgers" },
    { label: "Throughput Peak", value: "10K+ Tx/s", detail: "High-concurrency clearing" },
  ],
  "education-research": [
    { label: "Literature Analysis", value: "3.5x Faster", detail: "RAG citation synthesis" },
    { label: "Paper Catalog", value: "10M+ Papers", detail: "Multi-vector semantic discovery" },
    { label: "Curriculum Adaptation", value: "Dynamic", detail: "Calibrated to student mastery" },
    { label: "Grant Telemetry", value: "100% Audit", detail: "Provenance & compute tracking" },
  ],
  "retail-ecommerce": [
    { label: "Checkout Conversion", value: "+35% Lift", detail: "Headless instant transitions" },
    { label: "POS Sync Latency", value: "<50ms", detail: "Unified omnichannel inventory" },
    { label: "Stockout Reduction", value: "−80%", detail: "Predictive replenishment alerts" },
    { label: "Catalog Concurrency", value: "1M+ SKUs", detail: "Sub-second product search" },
  ],
  manufacturing: [
    { label: "Unplanned Downtime", value: "−65%", detail: "Acoustic predictive maintenance" },
    { label: "Defect Classification", value: "99.8%", detail: "High-speed edge camera vision" },
    { label: "Sensor Telemetry", value: "<10ms", detail: "SCADA & PLC hub aggregation" },
    { label: "Safety Alerting", value: "Real-Time", detail: "Automated PPE & zone monitor" },
  ],
  "real-estate": [
    { label: "Valuation Turnaround", value: "Instant", detail: "Geospatial AVM analytics" },
    { label: "Virtual Tour FPS", value: "60 FPS", detail: "Photorealistic 3D digital twins" },
    { label: "Leasing Cycle Time", value: "−50% Days", detail: "Frictionless digital tenant ops" },
    { label: "HVAC Energy Savings", value: "Up to 24%", detail: "Smart commercial building IoT" },
  ],
  "logistics-transportation": [
    { label: "Fuel & Route Mileage", value: "−22%", detail: "Dynamic multi-stop dispatch" },
    { label: "Fleet Visibility", value: "Real-Time", detail: "Streaming cold-chain GPS" },
    { label: "Driver Compliance", value: "100% Cap", detail: "Automated hours regulation" },
    { label: "Warehouse Pick Rate", value: "+45% Items", detail: "Optimized traversal routes" },
  ],
  "professional-services": [
    { label: "Contract Review Speed", value: "70% Faster", detail: "Automated clause risk analysis" },
    { label: "Data Room Security", value: "Role-Based", detail: "Granular dynamic watermarking" },
    { label: "Billable Time Leakage", value: "Zero Unbilled", detail: "Automated project tracking" },
    { label: "Knowledge Search", value: "Sub-Second", detail: "Secure internal brief retrieval" },
  ],
  "hospitality-restaurants": [
    { label: "Table Turnover Rate", value: "+40% Lift", detail: "Contactless QR order & pay" },
    { label: "Kitchen Remake Errors", value: "<0.2%", detail: "Unified multi-channel KDS" },
    { label: "Order Wait Time", value: "−35%", detail: "Automated kitchen pacing" },
    { label: "Food Spoilage Waste", value: "−28%", detail: "Predictive ingredient forecasting" },
  ],
};

// Cross-Functional Related Services per Industry
const relatedServicesMap: Record<string, string[]> = {
  healthcare: ["ai-machine-learning", "custom-software-development", "cloud-solutions-devops"],
  "finance-fintech": ["ai-machine-learning", "data-engineering", "custom-software-development"],
  "education-research": ["generative-ai-llms", "custom-software-development", "ai-machine-learning"],
  "retail-ecommerce": ["ecommerce-solutions", "erp-pos-solutions", "web-development"],
  manufacturing: ["ai-machine-learning", "cloud-solutions-devops", "business-automation"],
  "real-estate": ["web-development", "custom-software-development", "data-engineering"],
  "logistics-transportation": ["custom-software-development", "cloud-solutions-devops", "business-automation"],
  "professional-services": ["generative-ai-llms", "business-automation", "it-consulting"],
  "hospitality-restaurants": ["erp-pos-solutions", "ecommerce-solutions", "business-automation"],
};

export async function generateStaticParams() {
  return industriesData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((item) => item.slug === slug);

  if (!industry) {
    return { title: "Sector Not Found — DeepLayer Solutions" };
  }

  const url = `${siteConfig.url}/industries/${industry.slug}`;

  return {
    title: `${industry.title} — Digital Solutions & AI Engineering | DeepLayer Solutions`,
    description: industry.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: `${industry.title} Digital Systems & AI | DeepLayer Solutions`,
      description: industry.shortDescription,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | DeepLayer Solutions`,
      description: industry.shortDescription,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesData.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const Visual = visualMap[industry.slug] || Healthcare3DVisual;
  const Icon = iconMap[industry.iconName] || Activity;
  const metrics = sectorMetricsMap[industry.slug] || [
    { label: "SLA Uptime", value: "99.99%", detail: "Enterprise Grade" },
    { label: "Deployment", value: "Production", detail: "Verified Architecture" },
    { label: "Engineering Lead", value: "Principal", detail: "Senior AI Team" },
  ];

  const relatedServiceSlugs = relatedServicesMap[industry.slug] || [];
  const relatedServices = servicesData.filter((s) => relatedServiceSlugs.includes(s.slug));
  const otherIndustries = industriesData.filter((i) => i.slug !== industry.slug);

  const industryJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.title} Digital Solutions`,
    description: industry.shortDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: industry.title,
    areaServed: "Worldwide",
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industryJsonLd) }}
      />

      {/* 1. SECTOR HERO SECTION (Two-Column Layout with 3D Platform Visual) */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-22 bg-gradient-to-b from-[#E9FFF2]/60 via-[#FAFCF9] to-white border-b border-[#DFEDE5] select-none">
        {/* Soft Ambient Light Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-[#E9FFF2] via-[#D5F9E6]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <Container size="wide">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: industry.title, href: `/industries/${industry.slug}` },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Sector Headline & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] text-xs font-mono font-semibold uppercase tracking-wider mb-5">
                <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Sector Specialized Engineering</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.12]">
                Intelligent Digital Systems Engineered for{" "}
                <span className="text-[#008F53] relative inline-block">
                  {industry.title}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#34D399]/40 -z-10"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#64736F] leading-relaxed max-w-2xl">
                {industry.shortDescription} We build high-throughput, compliant, and production-tested software, data pipelines, and machine learning models tailored to the operational realities of the sector.
              </p>

              {/* Tag Capabilities */}
              <div className="mt-6 flex flex-wrap gap-2">
                {industry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#DFEDE5] text-[#142A27] text-xs font-semibold shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008F53]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  withArrow
                  className="shadow-md shadow-[#008F53]/15 justify-center"
                >
                  Schedule Sector Consultation
                </Button>
                <Button
                  href="/portfolio"
                  variant="secondary"
                  size="md"
                  className="justify-center"
                >
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* Right Column: 3D Platform Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-[28px] bg-white/80 backdrop-blur-md border border-[#DFEDE5] shadow-xl shadow-[#008F53]/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#E9FFF2] to-transparent rounded-full blur-2xl -z-10" />
                <div className="w-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                  <Visual className="w-full h-56 sm:h-64" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. QUANTITATIVE SECTOR METRICS STRIP */}
      <section className="py-10 bg-white border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex flex-col justify-between"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-[#008F53] tracking-tight">
                  {item.value}
                </span>
                <div className="mt-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#142A27]">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-[#64736F] mt-0.5 leading-snug">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. CORE CHALLENGES & OPERATIONAL REALITIES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFCF9] border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
              Operational Bottlenecks
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#142A27] mt-3">
              Key Challenges in Modern {industry.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64736F] leading-relaxed">
              Navigating legacy technical debt, stringent compliance frameworks, and high transaction volumes requires specialized systems architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#142A27] leading-snug">
                    Challenge #{index + 1}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {challenge}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. DEEPLAYER TECHNICAL ARCHITECTURE & SOLUTIONS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#008F53] bg-[#E9FFF2] px-3 py-1 rounded-full border border-[#BCE8CF]">
              Engineered Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#142A27] mt-3">
              How DeepLayer Solves It
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64736F] leading-relaxed">
              We engineer mission-critical systems that integrate into existing operational tech stacks with low latency, robust data provenance, and continuous observability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {industry.solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-[24px] bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] hover:border-[#008F53]/50 shadow-xs hover:shadow-xl hover:shadow-[#008F53]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#075B3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center font-mono font-bold text-sm group-hover:bg-[#008F53] group-hover:text-white transition-colors duration-200">
                    0{index + 1}
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#008F53]/60 group-hover:text-[#008F53] transition-colors" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug">
                  Solution Architecture #{index + 1}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                  {solution}
                </p>

                <div className="mt-5 pt-4 border-t border-[#DFEDE5]/60 flex items-center gap-2 text-xs font-semibold text-[#008F53]">
                  <span>Enterprise Ready & Production Verified</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. SECTOR APPLICATIONS & SYSTEMS WE DELIVER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAFCF9] via-[#F4FAF6] to-[#FAFCF9] border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#008F53] bg-[#E9FFF2] px-3 py-1 rounded-full border border-[#BCE8CF]">
              Turnkey & Custom Deployments
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#142A27] mt-3">
              Enterprise Applications for {industry.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64736F] leading-relaxed">
              Explore specialized modules and software architectures engineered by our team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.applications.map((app, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#142A27] leading-snug">
                    {app}
                  </h3>
                  <p className="mt-2 text-xs text-[#64736F] leading-relaxed">
                    Custom modular deployment with automated API syncing, security isolation, and observability telemetry.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DFEDE5]/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#008F53] font-semibold">
                    Production Grade
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-[#008F53] hover:text-[#075B3E] inline-flex items-center gap-1"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. MEASURABLE BUSINESS IMPACT & ROI */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#008F53] bg-[#E9FFF2] px-3 py-1 rounded-full border border-[#BCE8CF]">
              Verified ROI
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#142A27] mt-3">
              Measurable Business Outcomes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64736F] leading-relaxed">
              Our engineering delivers tangible impact that shows up on the balance sheet and operational scorecards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {industry.benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#142A27] leading-snug">
                    Impact Metric #{index + 1}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DFEDE5]/60 text-xs font-mono text-[#008F53] font-semibold">
                  Audited Operational Improvement
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. RELATED CROSS-FUNCTIONAL SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#FAFCF9] border-b border-[#DFEDE5]">
          <Container size="wide">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 sm:mb-10">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#008F53]">
                  Technical Capabilities
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                  Services Powering This Sector
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] inline-flex items-center gap-1.5"
              >
                <span>All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#008F53] font-semibold bg-[#E9FFF2] px-2 py-0.5 rounded-md">
                      {service.category}
                    </span>
                    <h3 className="text-base font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mt-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#64736F] mt-1 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#DFEDE5]/60 flex items-center justify-between text-xs font-semibold text-[#008F53]">
                    <span>Explore Service Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 8. EXPLORE OTHER SPECIALIZED SECTORS */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#008F53]">
                Sector Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                Explore Other Specialized Industries
              </h2>
            </div>
            <Link
              href="/industries"
              className="text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] inline-flex items-center gap-1.5"
            >
              <span>Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherIndustries.slice(0, 4).map((other) => {
              const OtherIcon = iconMap[other.iconName] || Activity;
              return (
                <Link
                  key={other.id}
                  href={`/industries/${other.slug}`}
                  className="group p-5 rounded-2xl bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 group-hover:bg-[#008F53] group-hover:text-white transition-colors">
                      <OtherIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors leading-snug">
                        {other.title}
                      </h3>
                      <p className="text-[11px] text-[#64736F] line-clamp-2 mt-1 leading-relaxed">
                        {other.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#DFEDE5]/60 flex items-center justify-between text-xs font-semibold text-[#008F53]">
                    <span>View Solutions</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 9. HIGH-CONVERTING SECTOR CALL TO ACTION */}
      <CTASection
        title={`Ready to Modernize Your ${industry.title}`}
        highlight="Infrastructure?"
        subtitle="Let's collaborate with your engineering and leadership teams to architect resilient software, data pipelines, and intelligent AI models that solve real operational friction."
        buttonText="Discuss Your Industry Challenge"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
