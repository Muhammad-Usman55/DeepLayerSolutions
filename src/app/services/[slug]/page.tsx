import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Brain,
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Compass,
  Sparkles,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/common/Button";
import { CTASection } from "@/components/common/CTASection";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";

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
    title: `${service.title} — DeepLayer Services`,
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
      {/* Service Detail Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E9FFF2]/50 via-[#FAFCF9] to-transparent border-b border-[#DFEDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            className="mb-8"
          />

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-[#008F53] border border-[#DFEDE5] mb-4 shadow-2xs">
              <Icon className="w-3.5 h-3.5 text-[#008F53]" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#142A27] leading-tight">
              {service.title}
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-medium text-[#008F53]">
              {service.heroTagline}
            </p>

            <p className="mt-5 text-base sm:text-lg text-[#64736F] leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Start a {service.title} Project
              </Button>
              <Button href="/services" variant="outline" size="lg">
                View Other Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenges & Approach Section */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Challenges Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#142A27]">
                  Business Challenges We Solve
                </h2>
              </div>
              <ul className="space-y-4">
                {service.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm sm:text-base text-[#64736F] leading-relaxed">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAFCF9] border border-[#DFEDE5] shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#142A27]">
                  Our Engineering Approach
                </h2>
              </div>
              <ul className="space-y-4">
                {service.approach.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#008F53] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#142A27] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities & Tech Stack Strip */}
      <section className="py-16 md:py-20 bg-white border-y border-[#DFEDE5]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Capabilities (Cols 1-7) */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-[#142A27] mb-6">
                Key Technical Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="p-4 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#008F53]" />
                    <span className="text-sm font-semibold text-[#142A27]">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack (Cols 8-12) */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
              <h3 className="text-lg font-bold text-[#142A27] mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#008F53]" />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white text-[#008F53] border border-[#DFEDE5] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Development Process */}
      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-[#142A27]">
              How We Deliver {service.title}
            </h2>
            <p className="mt-3 text-[#64736F]">
              A disciplined four-phase delivery cycle from initial audit to production scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs"
              >
                <span className="text-3xl font-extrabold font-mono text-[#008F53] block mb-2">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-[#142A27] mb-2">{step.title}</h4>
                <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-16 bg-[#FAFCF9] border-t border-[#DFEDE5]">
          <Container size="wide">
            <h3 className="text-xl font-bold text-[#142A27] mb-8">
              Complementary Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono uppercase text-[#008F53] font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mt-1">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#64736F] line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#DFEDE5] flex items-center gap-1.5 text-xs font-bold text-[#008F53]">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title={`Ready to Build Your ${service.title} Solution?`}
        subtitle="Speak with our technical leads to architect a high-performance system for your business."
        buttonText="Book a Technical Consultation"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
