import { Button } from "../common/Button";
import { Container } from "../common/Container";
import { TechLayerVisual } from "../common/TechLayerVisual";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF3] to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-6 shadow-xs animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#159B50] animate-pulse" />
              <span>Engineering What&apos;s Next</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight text-[#101C19] leading-[1.08]">
              We Build{" "}
              <span className="text-[#047F5B] relative inline-block">
                Intelligent
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-[#34D399]/40 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>{" "}
              Digital Experiences.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#2D4A3E] leading-relaxed max-w-2xl font-normal">
              Cutting-edge software engineering, AI, and digital products to help your business innovate, grow, and stay ahead in the age of intelligence.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                href="/services"
                variant="primary"
                size="lg"
                withArrow
                className="w-full sm:w-auto font-semibold shadow-md shadow-[#087A3D]/15"
              >
                Explore Our Services
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-medium"
              >
                Book a Consultation
              </Button>
            </div>

            {/* Engineering Pillars & Architecture Spec Strip */}
            <div className="mt-10 pt-7 border-t border-[#E3EDE5] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E3EDE5]">
                <div className="sm:pr-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047F5B]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#047F5B] font-semibold">
                      01 · Capability
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#101C19] tracking-tight">
                    Custom AI & LLMs
                  </p>
                  <p className="text-xs text-[#4D6357] mt-0.5">
                    Production-grade models & vision
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047F5B]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#047F5B] font-semibold">
                      02 · Architecture
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#101C19] tracking-tight">
                    Cloud-Native Scale
                  </p>
                  <p className="text-xs text-[#4D6357] mt-0.5">
                    Distributed, resilient backends
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047F5B]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#047F5B] font-semibold">
                      03 · Standard
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#101C19] tracking-tight">
                    Enterprise SLAs
                  </p>
                  <p className="text-xs text-[#4D6357] mt-0.5">
                    Security-first engineering rigor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Cols 8-12) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <TechLayerVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
