import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    tagline: "Needs & Constraints Audit",
    description:
      "We dissect your operational workflows, evaluate existing data and systems, and isolate high-leverage opportunities.",
  },
  {
    number: "02",
    title: "Strategize",
    tagline: "Architecture & Feasibility",
    description:
      "Our architects map out database schemas, model backbones, API contracts, and security boundaries before writing code.",
  },
  {
    number: "03",
    title: "Develop",
    tagline: "Iterative Test-Driven Build",
    description:
      "We build modular increments in transparent two-week sprints with continuous automated integration and client demo reviews.",
  },
  {
    number: "04",
    title: "Deliver",
    tagline: "Hardening & Production Scale",
    description:
      "Stress testing, security auditing, zero-downtime deployment, and automated telemetry ensuring steady long-term operations.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28 relative">
      <Container size="wide">
        <SectionHeading
          badge="How We Work"
          title="Our Development Approach."
          highlight="Development Approach"
          subtitle="A battle-tested engineering methodology that eliminates ambiguity, maintains velocity, and ensures measurable outcomes."
        />

        {/* Timeline Grid: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative mt-8 sm:mt-12">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#087A3D]/20 via-[#159B50] to-[#087A3D]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col p-6 sm:p-7 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs hover:shadow-xl hover:border-[#159B50] transition-all duration-300"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-mono text-[#087A3D]">
                    {step.number}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#E8F5E9] border-2 border-[#159B50] group-hover:scale-125 group-hover:bg-[#159B50] transition-all" />
                </div>

                <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#159B50] uppercase tracking-wide mt-1">
                  {step.tagline}
                </span>

                <p className="mt-4 text-sm text-[#65736D] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
