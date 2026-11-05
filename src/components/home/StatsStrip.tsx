import { Container } from "../common/Container";
import { siteConfig } from "@/config/site";

export function StatsStrip() {
  return (
    <section className="py-12 bg-white border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E3EDE5]">
          {siteConfig.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 ${
                index > 0 ? "pt-6 lg:pt-0" : ""
              }`}
            >
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#047F5B]">
                {stat.value}
              </span>
              <span className="mt-2 text-sm sm:text-base font-bold text-[#101C19]">
                {stat.label}
              </span>
              {stat.description && (
                <span className="mt-1 text-xs text-[#65736D] max-w-[200px]">
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

