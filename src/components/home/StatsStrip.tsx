import { Container } from "../common/Container";
import { siteConfig } from "@/config/site";

export function StatsStrip() {
  return (
    <section className="py-12 bg-white border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x divide-[#E3EDE5]">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-2 sm:px-4"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#047F5B]">
                {stat.value}
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base font-bold text-[#101C19]">
                {stat.label}
              </span>
              {stat.description && (
                <span className="mt-1 text-[11px] sm:text-xs text-[#65736D] max-w-[180px] sm:max-w-[200px]">
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

