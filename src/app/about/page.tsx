import type { Metadata } from "next";
import {
  Target,
  Eye,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/common/Button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TechLayerVisual } from "@/components/common/TechLayerVisual";

export const metadata: Metadata = {
  title: "About DeepLayer Solutions",
  description:
    "Learn about DeepLayer Solutions' mission, engineering philosophy, and values in software development and artificial intelligence.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: Zap,
    title: "Innovation",
    tagline: "Always forward.",
    description: "We proactively evaluate emerging AI models, algorithmic breakthroughs, and web architectures to give our clients an enduring competitive edge.",
  },
  {
    icon: Award,
    title: "Excellence",
    tagline: "In every detail.",
    description: "We take immense pride in craft: strictly typed codebases, sub-millisecond query performance, and resilient, self-healing deployments.",
  },
  {
    icon: Users,
    title: "Collaboration",
    tagline: "Together stronger.",
    description: "We operate as an extension of your leadership and engineering team, maintaining radical transparency through every sprint.",
  },
  {
    icon: ShieldCheck,
    title: "Impact",
    tagline: "Building a better future.",
    description: "We measure success not by lines of code written, but by the tangible operational value and growth our solutions generate.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* About Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-transparent border-b border-[#E3EDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "About", href: "/about" }]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow variant="chip" className="mb-4">
                Innovating Today for a Smarter Tomorrow
              </Eyebrow>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#142A27] leading-tight">
                Building Tomorrow Through{" "}
                <span className="text-[#008F53]">Intelligent Technology.</span>
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-[#64736F] leading-relaxed font-normal">
                DeepLayer Solutions brings deep software engineering principles and modern artificial intelligence together to construct meaningful digital experiences that scale.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="lg" withArrow>
                  Let&apos;s Connect
                </Button>
                <Button href="/portfolio" variant="outline" size="lg">
                  Explore Our Work
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-center hero-tech-visual-container">
              <TechLayerVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story & Background */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual Panel */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#101C19] to-[#075C32] p-8 sm:p-10 text-white shadow-xl overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-[#34D399]/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#34D399] mb-6">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    DeepLayer Solutions
                  </h3>
                  <p className="text-sm text-emerald-100/90 leading-relaxed">
                    Founded with a focused, singular purpose: to bridge the vast gap between high-level AI research and hardened, fault-tolerant enterprise software engineering.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#34D399] font-bold block text-sm">Founded On</span>
                      <span className="text-white/70">Engineering Craft</span>
                    </div>
                    <div>
                      <span className="text-[#34D399] font-bold block text-sm">Specialization</span>
                      <span className="text-white/70">AI & Cloud Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Eyebrow variant="chip" className="mb-4">
                Our Narrative
              </Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] leading-tight">
                Architecting Digital Foundations for Modern Enterprise.
              </h2>
              <div className="mt-6 space-y-4 text-base text-[#64736F] leading-relaxed">
                <p>
                  We established DeepLayer Solutions to provide founders and enterprise executives with a reliable, technically uncompromising software and AI development partner. Too often, agencies build brittle prototypes that quickly collapse under scale or incur massive technical debt.
                </p>
                <p>
                  Our senior engineering architects combine rigorous domain modeling, strict type safety, edge computing, and modern LLM orchestration. We do not just build features; we build lasting digital assets designed to run seamlessly in high-concurrency production environments.
                </p>
                <p>
                  Headquartered with a global engineering presence, we collaborate with partners worldwide across healthcare, fintech, supply chain, and retail to turn complex technical challenges into competitive market victories.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Split */}
      <section className="py-16 md:py-20 bg-[#FAFCF9] border-t border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#008F53]">
                Our Mission
              </span>
              <h3 className="text-2xl font-extrabold text-[#142A27] mt-2 mb-4">
                Empower businesses through intelligent, reliable, and innovative digital solutions.
              </h3>
              <p className="text-sm sm:text-base text-[#64736F] leading-relaxed">
                To equip progressive businesses with robust software architecture, automated machine learning pipelines, and intuitive user experiences that amplify operational leverage and unlock new market growth.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#008F53]">
                Our Vision
              </span>
              <h3 className="text-2xl font-extrabold text-[#142A27] mt-2 mb-4">
                A future where technology creates meaningful opportunities and sustainable growth.
              </h3>
              <p className="text-sm sm:text-base text-[#64736F] leading-relaxed">
                To contribute to a global economy where artificial intelligence and ethical digital systems eliminate tedious human toil, accelerate scientific discovery, and empower organizations of every size to realize their highest potential.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow variant="chip" className="mb-4">
              Guiding Principles
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27]">
              Our Core Values
            </h2>
            <p className="mt-4 text-[#64736F] text-base sm:text-lg">
              The fundamental standards that steer every architecture decision, code review, and partner engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-7 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs hover:shadow-xl hover:border-[#008F53]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#142A27]">{v.title}</h3>
                    <span className="text-xs font-semibold text-[#008F53] block mt-1">
                      {v.tagline}
                    </span>
                    <p className="mt-3 text-sm text-[#64736F] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Have an Idea Worth Building?"
        subtitle="Let's connect and discuss how DeepLayer Solutions can engineer your next digital platform with precision and speed."
        buttonText="Let's Connect"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
