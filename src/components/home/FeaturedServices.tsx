import React from "react";
import Link from "next/link";
import { ArrowRight, Brain, Code2, Globe, Cloud, Sparkles } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";
import { servicesData } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Code2,
  Globe,
  Cloud,
  Sparkles,
};

export function FeaturedServices() {
  const featured = servicesData.filter((s) => s.featured).slice(0, 4);

  return (
    <section className="py-20 md:py-28 relative">
      <Container size="wide">
        <SectionHeading
          badge="Core Capabilities"
          title="Technology That Moves Your Business Forward."
          highlight="Moves Your Business Forward"
          subtitle="We engineer reliable, scalable software and machine learning platforms that turn ambitious ideas into sustainable competitive advantage."
          action={
            <Button href="/services" variant="secondary" size="md" withArrow>
              View All Services
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service) => {
            const IconComponent = iconMap[service.iconName] || Brain;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs hover:shadow-xl hover:border-[#159B50]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle Top Gradient Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#047F5B] via-[#34D399] to-[#173D2F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#047F5B] flex items-center justify-center mb-6 group-hover:bg-[#047F5B] group-hover:text-white transition-all duration-300 group-hover:rotate-3 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#047F5B] transition-colors line-clamp-2">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-3 text-sm text-[#65736D] leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Capabilities Mini Tags */}
                  <div className="mt-5 pt-4 border-t border-[#E3EDE5]/80 flex flex-wrap gap-1.5">
                    {service.capabilities.slice(0, 2).map((cap) => (
                      <span
                        key={cap}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#F4FAF3] text-[#173D2F] font-medium"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn More Link */}
                <div className="mt-6 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#047F5B] group-hover:text-[#173D2F] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
