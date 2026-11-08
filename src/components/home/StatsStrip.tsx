import { Container } from "../common/Container";
import { siteConfig } from "@/config/site";

export function StatsStrip() {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-[#E3EDE5]">
      <Container size="wide">
        {/* Mobile Section Heading Matching Mockup */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 lg:hidden">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#142A27]">
            Why <span className="text-[#008F53]">Choose Us</span>
          </h2>
          <p className="mt-1 text-xs text-[#64736F]">
            Your trusted partner in digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:divide-x divide-[#E3EDE5] stats-grid">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl sm:rounded-none bg-white lg:bg-transparent border lg:border-none border-[#DFEDE5] shadow-xs lg:shadow-none"
            >
              <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#008F53]">
                {stat.value}
              </span>
              <span className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base font-bold text-[#142A27]">
                {stat.label}
              </span>
              {stat.description && (
                <span className="mt-1 text-[11px] sm:text-xs text-[#64736F] max-w-[180px] sm:max-w-[200px] hidden sm:inline-block">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

