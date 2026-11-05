import Link from "next/link";
import {
  Stethoscope,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Factory,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";

const industries = [
  {
    title: "Healthcare",
    description: "Smarter healthcare with AI diagnostics and HIPAA-compliant patient intelligence.",
    icon: Stethoscope,
    slug: "healthcare",
  },
  {
    title: "Finance & FinTech",
    description: "Secure & intelligent financial platforms, sub-second fraud detection, and algorithmic engines.",
    icon: TrendingUp,
    slug: "finance-fintech",
  },
  {
    title: "Education & EdTech",
    description: "Personalized learning pathways and automated evaluation engines powered by AI.",
    icon: GraduationCap,
    slug: "education-edtech",
  },
  {
    title: "E-Commerce & Retail",
    description: "Hyper-personalized shopping experiences, visual search, and predictive inventory automation.",
    icon: ShoppingBag,
    slug: "ecommerce-retail",
  },
  {
    title: "Manufacturing",
    description: "Drive floor efficiency with real-time edge computer vision and acoustic predictive maintenance.",
    icon: Factory,
    slug: "manufacturing",
  },
  {
    title: "Real Estate",
    description: "Innovative valuation algorithms, digital twin 3D tours, and automated leasing workflows.",
    icon: Building2,
    slug: "real-estate",
  },
];

export function IndustriesPreview() {
  return (
    <section className="py-20 md:py-28 bg-[#F4FAF3]/40 border-t border-[#E3EDE5]">
      <Container size="wide">
        <SectionHeading
          badge="Sectors & Domains"
          title="Industry-Specific Expertise."
          highlight="Industry-Specific"
          subtitle="From early-stage disruptors to enterprise leaders, we engineer digital solutions tailored to the operational realities of your domain."
          action={
            <Button href="/industries" variant="secondary" size="md" withArrow>
              Explore All Industries
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={`/industries#${item.slug}`}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-[#E3EDE5] shadow-2xs hover:shadow-lg hover:border-[#159B50]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#087A3D] group-hover:text-white transition-all duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#65736D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E3EDE5] flex items-center gap-1.5 text-xs font-bold text-[#087A3D] uppercase tracking-wider group-hover:text-[#075C32]">
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

