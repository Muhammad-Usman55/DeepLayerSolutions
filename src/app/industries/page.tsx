import React from "react";
import type { Metadata } from "next";
import {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  Truck,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { industriesData } from "@/data/industries";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/common/Button";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Industries & Sectors",
  description:
    "Tailored digital solutions, AI workflows, and software engineering addressing the operational complexities of Healthcare, Finance, Manufacturing, Logistics, and more.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  Truck,
  Briefcase,
};

export default function IndustriesPage() {
  return (
    <PageWrapper>
      {/* Industries Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-transparent border-b border-[#E3EDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Industries", href: "/industries" }]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <Eyebrow variant="chip" className="mb-4">
              Tailored Sector Solutions
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-tight">
              Technology Built for <br />
              <span className="text-[#087A3D]">Every Industry.</span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-[#65736D] leading-relaxed font-normal">
              Delivering adaptable software architectures and intelligent AI models specifically calibrated to the operational, regulatory, and scalability demands of diverse industries.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {industriesData.map((ind) => (
                <a
                  key={ind.id}
                  href={`#${ind.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E3EDE5] hover:border-[#087A3D] hover:bg-[#F4FAF3] text-[#101C19] transition-all"
                >
                  {ind.title}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Industries Deep-Dive Grid */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="space-y-16">
            {industriesData.map((industry) => {
              const Icon = iconMap[industry.iconName] || Briefcase;

              return (
                <div
                  key={industry.id}
                  id={industry.slug}
                  className="scroll-mt-28 p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#E3EDE5] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Industry Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E3EDE5] gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101C19]">
                          {industry.title}
                        </h2>
                        <p className="text-sm sm:text-base text-[#087A3D] font-medium mt-0.5">
                          {industry.shortDescription}
                        </p>
                      </div>
                    </div>

                    <Button href="/contact" variant="outline" size="sm" withArrow>
                      Discuss {industry.title}
                    </Button>
                  </div>

                  {/* 3-Column Info Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Specific Challenges */}
                    <div className="p-6 rounded-2xl bg-[#FAFCF9] border border-[#E3EDE5]">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#101C19] mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Core Challenges</span>
                      </h3>
                      <ul className="space-y-3">
                        {industry.challenges.map((c, i) => (
                          <li key={i} className="text-xs sm:text-sm text-[#65736D] leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Digital Solutions */}
                    <div className="p-6 rounded-2xl bg-[#F4FAF3] border border-[#C4D9C8]">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#075C32] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#159B50]" />
                        <span>Engineering Solutions</span>
                      </h3>
                      <ul className="space-y-3">
                        {industry.solutions.map((s, i) => (
                          <li key={i} className="text-xs sm:text-sm text-[#101C19] font-medium leading-relaxed flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#159B50] shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Applications & Business Benefits */}
                    <div className="p-6 rounded-2xl bg-white border border-[#E3EDE5] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#101C19] mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#087A3D]" />
                          <span>Potential Applications</span>
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {industry.applications.map((app) => (
                            <span
                              key={app}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8]"
                            >
                              {app}
                            </span>
                          ))}
                        </div>

                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#65736D] mb-2">
                          Measurable Impact:
                        </h4>
                        <ul className="space-y-2">
                          {industry.benefits.map((b, i) => (
                            <li key={i} className="text-xs text-[#65736D] leading-relaxed">
                              • {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E3EDE5] flex flex-wrap gap-1.5">
                        {industry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFCF9] text-[#65736D]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Let's Solve Your Industry's Biggest Challenges."
        subtitle="Partner with engineers and data scientists who understand the exact mechanics, compliance nuances, and technical landscape of your industry."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
