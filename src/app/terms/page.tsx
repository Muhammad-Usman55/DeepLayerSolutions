import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of DeepLayer Solutions services and digital platforms.",
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <section className="py-12 md:py-20">
        <Container size="default">
          <Breadcrumb
            items={[{ label: "Terms of Service", href: "/terms" }]}
            className="mb-8"
          />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[#64736F] mb-8 pb-6 border-b border-[#DFEDE5]">
            Last updated: November 2026 • DeepLayer Solutions
          </p>

          <div className="space-y-6 text-sm sm:text-base text-[#64736F] leading-relaxed">
            <h2 className="text-xl font-bold text-[#142A27]">1. Agreement to Terms</h2>
            <p>
              By accessing or using the DeepLayer Solutions website and associated advisory materials, you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use immediately.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">2. Professional Engineering Engagements</h2>
            <p>
              Statements made on this website regarding services, capabilities, or architectural methodologies represent informational descriptions. Formal software development and AI engineering partnerships are governed exclusively by executed Statements of Work (SOW) and Master Services Agreements (MSA).
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">3. Intellectual Property Rights</h2>
            <p>
              All website content, visual marks, logos, graphics, and architectural descriptions are the intellectual property of DeepLayer Solutions. Custom software deliverables created for clients transfer ownership in accordance with the specific terms of client service agreements upon complete remuneration.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, DeepLayer Solutions shall not be liable for any indirect, incidental, or consequential damages resulting from the use of informational website content.
            </p>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
