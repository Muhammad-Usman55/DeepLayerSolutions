import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and data governance principles for DeepLayer Solutions.",
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <section className="py-12 md:py-20">
        <Container size="default">
          <Breadcrumb
            items={[{ label: "Privacy Policy", href: "/privacy" }]}
            className="mb-8"
          />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#64736F] mb-8 pb-6 border-b border-[#DFEDE5]">
            Last updated: November 2026 • DeepLayer Solutions
          </p>

          <div className="space-y-6 text-sm sm:text-base text-[#64736F] leading-relaxed">
            <h2 className="text-xl font-bold text-[#142A27]">1. Introduction</h2>
            <p>
              At DeepLayer Solutions (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take data privacy and technical integrity with utmost seriousness. This Privacy Policy outlines how we treat information received via our website, client communications, and preliminary consultations.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">2. Information We Collect</h2>
            <p>
              We collect information you explicitly provide to us when requesting a consultation, submitting our contact form, or subscribing to our technical insights. This may include your name, business email address, company name, project requirements, and budget expectations.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">3. How We Use Information</h2>
            <p>
              Information collected is used solely to respond to inquiries, evaluate project feasibility, deliver customized engineering proposals, and provide technical communications. We never sell, rent, or monetize your contact or project information to third parties.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">4. Non-Disclosure & Intellectual Property</h2>
            <p>
              Any proprietary code, architectural documents, or business strategies shared during discovery sessions are treated as strictly confidential and protected under standard mutual non-disclosure obligations.
            </p>

            <h2 className="text-xl font-bold text-[#142A27]">5. Contact Us</h2>
            <p>
              For inquiries regarding data privacy or to request the deletion of your consultation records, please contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#008F53] font-medium underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}

