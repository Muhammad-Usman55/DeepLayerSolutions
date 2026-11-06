import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { CTASection } from "@/components/common/CTASection";
import { BlogView } from "@/components/blog/BlogView";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Blog & Technical Insights",
  description:
    "Exploring the latest developments in AI, LLMs, computer vision, software engineering, and cloud scalability from the DeepLayer Solutions engineering team.",
};

export default function BlogPage() {
  return (
    <PageWrapper>
      {/* Blog Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-transparent border-b border-[#E3EDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Blog", href: "/blog" }]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <Eyebrow variant="chip" className="mb-4">
              Technical Editorial
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-tight">
              Insights, Ideas & <br />
              <span className="text-[#087A3D]">Innovations.</span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-[#65736D] leading-relaxed font-normal">
              Exploring state-of-the-art advances in artificial intelligence, software engineering paradigms, and digital product scaling directly from our practitioners.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Blog Articles View */}
      <section className="py-12 md:py-20">
        <Container size="wide">
          <BlogView />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Want to Implement These Architectural Paradigms?"
        subtitle="Our architects can help guide your technology strategy and build resilient software systems."
        buttonText="Book an Advisory Session"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}

