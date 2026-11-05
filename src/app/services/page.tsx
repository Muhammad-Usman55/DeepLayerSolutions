import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { ServiceFilter } from "@/components/services/ServiceFilter";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TechLayerVisual } from "@/components/common/TechLayerVisual";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore DeepLayer Solutions' engineering services across Artificial Intelligence, Machine Learning, Custom Software, Cloud Infrastructure, and Digital Transformation.",
};

export default function ServicesPage() {
  return (
    <PageWrapper>
      {/* Services Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/40 via-transparent to-transparent">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Services", href: "/services" }]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#159B50] animate-pulse" />
                Comprehensive Capabilities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-[1.1]">
                Intelligent Solutions. <br />
                <span className="text-[#087A3D]">Powerful Technology.</span>
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-[#65736D] leading-relaxed max-w-2xl font-normal">
                From intelligent automation and computer vision to bespoke enterprise software and cloud orchestration, we engineer digital products built to scale.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="w-56 h-56 relative">
                <TechLayerVisual className="max-w-[220px]" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Filterable Services Section */}
      <section className="py-12 md:py-20">
        <Container size="wide">
          <ServiceFilter />
        </Container>
      </section>

      {/* Services Bottom CTA */}
      <CTASection
        title="Need a Custom Technical Solution?"
        subtitle="Let's analyze your architecture and discuss how our engineering team can build your next high-performance system."
        buttonText="Discuss Your Architecture"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}

