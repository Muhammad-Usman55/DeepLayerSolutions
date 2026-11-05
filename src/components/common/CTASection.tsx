import { Button } from "./Button";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function CTASection({
  title = "Ready to Build Something Intelligent?",
  subtitle = "Let's turn your next big idea into a powerful digital solution. Our senior engineers and AI architects are ready to collaborate.",
  buttonText = "Let's Discuss Your Project",
  buttonHref = "/contact",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#173D2F] via-[#047F5B] to-[#112920] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/15">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#34D399]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-[#10B981]/15 blur-2xl pointer-events-none" />

          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Decorative 3D Glass Rings SVG */}
          <div className="absolute -right-12 sm:right-6 lg:right-16 top-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 opacity-30 lg:opacity-60 pointer-events-none">
            <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
              <ellipse
                cx="200"
                cy="200"
                rx="160"
                ry="80"
                transform="rotate(-25 200 200)"
                stroke="url(#ctaTorusGrad)"
                strokeWidth="18"
                opacity="0.85"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="130"
                ry="65"
                transform="rotate(-25 200 200)"
                stroke="#6EE7B7"
                strokeWidth="4"
                strokeDasharray="12 8"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="ctaTorusGrad" x1="40" y1="120" x2="360" y2="280">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#A7F3D0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#A7F3D0] border border-white/20 mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
              Start Your Digital Transformation
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={buttonHref}
                variant="white"
                size="lg"
                withArrow
                className="font-semibold"
              >
                {buttonText}
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="text-white border-white/40 hover:bg-white/10 hover:border-white hover:text-white"
              >
                View Capabilities
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

