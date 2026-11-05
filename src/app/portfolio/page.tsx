import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "Explore our production software engineering and AI projects, featuring computer vision, multi-agent LLM systems, mobile apps, and scalable web platforms.",
};

export default function PortfolioPage() {
  return (
    <PageWrapper>
      {/* Portfolio Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-transparent border-b border-[#E3EDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Portfolio", href: "/portfolio" }]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#159B50] animate-pulse" />
              Verified Deployments
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-tight">
              Ideas We&apos;ve Built. <br />
              <span className="text-[#087A3D]">Solutions We&apos;ve Delivered.</span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-[#65736D] leading-relaxed font-normal">
              Explore selected software and AI engineering projects demonstrating our technical capabilities across computer vision, agentic reasoning, and high-concurrency web applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Portfolio Interactive Grid */}
      <section className="py-12 md:py-20">
        <Container size="wide">
          <Suspense fallback={<div className="py-12 text-center text-[#65736D]">Loading portfolio...</div>}>
            <PortfolioView />
          </Suspense>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Have a Vision for Your Next Big Project?"
        subtitle="Let's engineer a bespoke digital solution tailored to your performance requirements and business model."
        buttonText="Discuss Your Project"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}

