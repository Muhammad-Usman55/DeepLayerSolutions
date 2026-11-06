import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { CTASection } from "@/components/common/CTASection";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Our Products & Engineering Case Studies",
  description:
    "Explore selected software and AI engineering projects demonstrating our technical capabilities across intelligent applications, automation, and digital solutions.",
};

export default function PortfolioPage() {
  return (
    <PageWrapper>
      {/* Portfolio 3D Hero Section */}
      <PortfolioHero />

      {/* Main Portfolio Interactive Grid Section */}
      <section className="py-12 md:py-20 bg-[#FAFCF9]">
        <Container size="wide">
          <Suspense
            fallback={
              <div className="py-20 text-center text-sm font-mono text-[#64736F]">
                Loading verified projects...
              </div>
            }
          >
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
