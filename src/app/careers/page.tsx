import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CTASection } from "@/components/common/CTASection";
import { CareersHeroVisual } from "@/components/careers/CareersHeroVisual";
import { CareersContent } from "@/components/careers/CareersContent";
import { careerPerks } from "@/data/careers";
import { Globe, Brain, Rocket, Zap, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Careers & Remote Internships — DeepLayer Solutions",
  description:
    "Explore remote internship opportunities at DeepLayer Solutions in AI/ML Engineering, Digital Marketing, B2B Lead Generation, and Full-Stack Development. Paid stipends, senior mentorship, and full-time transition paths.",
  alternates: {
    canonical: `${siteConfig.url}/careers`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/careers`,
    title: "Careers & Remote Internships | DeepLayer Solutions",
    description:
      "Join our engineering-driven remote team. Apply for AI/ML Engineer Intern, Digital Marketing Intern, Lead Generation Intern, and Full-Stack roles.",
    images: [siteConfig.ogImage],
  },
};

const perkIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Brain,
  Rocket,
  Zap,
};

export default function CareersPage() {
  return (
    <PageWrapper>
      {/* Careers Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E9FFF2]/50 via-[#FAFCF9] to-transparent border-b border-[#DFEDE5]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#E9FFF2]/70 via-[#F3FAF5]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Careers", href: "/careers" }]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading & Culture Info */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Eyebrow variant="chip" className="mb-4">
                WE ARE HIRING • REMOTE ROLES
              </Eyebrow>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#142A27] leading-[1.12]">
                Build The Future of <br />
                <span className="text-[#008F53]">AI &amp; Digital Engineering.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#64736F] leading-relaxed max-w-2xl font-normal">
                Join an agile, global technology studio. Work directly with senior machine learning leads and full-stack architects on production enterprise software.
              </p>

              {/* Quick Metrics Strip */}
              <div className="mt-6 pt-5 border-t border-[#DFEDE5] w-full grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DFEDE5] shadow-2xs">
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-[#008F53] font-bold block">
                    Format
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#142A27] block mt-0.5">
                    100% Remote
                  </span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DFEDE5] shadow-2xs">
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-[#008F53] font-bold block">
                    Stipend
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#142A27] block mt-0.5">
                    Paid + Perks
                  </span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DFEDE5] shadow-2xs">
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-[#008F53] font-bold block">
                    Trajectory
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#142A27] block mt-0.5">
                    Full-Time Offer
                  </span>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-7 flex items-center gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-all duration-300 shadow-md shadow-[#008F53]/20 hover:-translate-y-0.5"
                >
                  <span>Explore Openings</span>
                  <Rocket className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Collaboration Visual */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-square flex items-center justify-center p-2">
                <CareersHeroVisual />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Culture & Perks Section */}
      <section className="py-16 md:py-20 bg-white border-b border-[#DFEDE5]">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
              <span>THE DEEPLAYER ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] tracking-tight">
              Why Launch Your Career With Us?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64736F]">
              We skip the bureaucracy and meaningless tasks. You contribute to real architecture from week one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPerks.map((perk) => {
              const IconComp = perkIconMap[perk.icon] || Sparkles;
              return (
                <div
                  key={perk.title}
                  className="p-6 sm:p-7 rounded-3xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#00B86B] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9FFF2] via-white to-[#D5F9E6] border border-[#00B86B]/40 flex items-center justify-center text-[#008F53] mb-5 shadow-xs">
                    <IconComp className="w-5 h-5 text-[#008F53]" />
                  </div>
                  <h3 className="text-base font-bold text-[#142A27] mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64736F] leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main Jobs Listing & Application Form Section */}
      <section id="openings" className="py-16 md:py-24 bg-[#FAFCF9] scroll-mt-10">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
              <Users className="w-3.5 h-3.5 text-[#00B86B]" />
              <span>CURRENT OPPORTUNITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142A27] tracking-tight">
              Open Remote Positions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64736F]">
              Browse our open internship openings below. Expand any role to review its full description, responsibilities, and requirements.
            </p>
          </div>

          <CareersContent />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Have Questions Before Applying?"
        subtitle="Feel free to reach out to our team directly. We're always eager to connect with ambitious builders."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}

