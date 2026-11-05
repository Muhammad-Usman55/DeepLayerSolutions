import { Shield, Cpu, Zap, Layers } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";

const pillars = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "We deploy proven next-generation AI and modern web paradigms that anticipate shifting industry requirements.",
  },
  {
    icon: Cpu,
    title: "Engineering Excellence",
    description: "Every codebase is strictly typed, modularly decoupled, and tested for rock-solid stability in production.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Cloud-native foundations built to gracefully handle millions of operations without performance degradation.",
  },
  {
    icon: Shield,
    title: "Client-Focused Delivery",
    description: "Direct collaboration with senior engineers, transparent sprints, and measurable milestone certainty.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[#F4FAF3]/60 relative overflow-hidden border-y border-[#E3EDE5]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#159B50] animate-pulse" />
              Why Choose Us
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101C19] leading-tight">
              Your Growth, <br />
              <span className="text-[#047F5B]">Our Mission.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#65736D] leading-relaxed max-w-xl">
              We combine innovation, technical expertise, and a client-first approach to deliver digital products and AI solutions that make a tangible business impact.
            </p>

            {/* Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-white border border-[#E3EDE5] shadow-2xs hover:border-[#159B50]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#101C19] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#65736D] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button href="/about" variant="primary" size="md" withArrow>
                Learn More About Our Story
              </Button>
            </div>
          </div>

          {/* Right Column (Cols 7-12): Stylized Modern Engineering Terminal / Laptop Graphic */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl bg-gradient-to-br from-[#101C19] via-[#075C32] to-[#101C19] p-4 sm:p-6 shadow-2xl border border-white/20">
              {/* Laptop Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                </div>
                <span className="font-mono text-[11px] text-[#A7F3D0]">deeplayer-core-v2.ts</span>
                <span className="font-mono text-[10px] text-white/40">TypeScript 5.8</span>
              </div>

              {/* Code Screen Body */}
              <div className="mt-4 font-mono text-xs sm:text-sm text-emerald-100/90 leading-relaxed space-y-2 overflow-hidden">
                <p className="text-white/40 text-[11px]">&#47;&#47; DeepLayer Solutions — Autonomous Intelligence Pipeline</p>
                <p>
                  <span className="text-[#34D399]">import</span> &#123; createEngine, NeuralMesh &#125; <span className="text-[#34D399]">from</span> <span className="text-amber-200">&apos;@deeplayer/ai-core&apos;</span>;
                </p>
                <p>
                  <span className="text-[#34D399]">const</span> engine = <span className="text-[#34D399]">new</span> NeuralMesh(&#123;
                </p>
                <p className="pl-4">
                  model: <span className="text-amber-200">&apos;DeepLayer-VisionTransformer-v4&apos;</span>,
                </p>
                <p className="pl-4">
                  quantization: <span className="text-amber-200">&apos;FP16_TENSORRT&apos;</span>,
                </p>
                <p className="pl-4">
                  concurrency: <span className="text-cyan-300">5000</span>, <span className="text-white/40">&#47;&#47; sub-millisecond edge latency</span>
                </p>
                <p className="pl-4">
                  security: <span className="text-[#34D399]">true</span>,
                </p>
                <p>&#125;);</p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#34D399]">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
                  <span className="font-bold">STATUS: PRODUCTION ACTIVE (99.99% Uptime)</span>
                </div>
              </div>

              {/* Glowing Corner Badge `< / >` */}
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl bg-white border border-[#E3EDE5] shadow-xl flex items-center justify-center text-[#087A3D] font-mono font-black text-2xl hidden sm:flex">
                &lt;/&gt;
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
