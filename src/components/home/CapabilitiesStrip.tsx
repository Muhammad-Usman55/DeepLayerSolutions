import { Brain, Code2, Globe, Cloud, Sparkles, Cpu, Bot, Database } from "lucide-react";

const capabilities = [
  { label: "AI & Machine Learning", icon: Brain },
  { label: "Custom Software", icon: Code2 },
  { label: "Web Platforms", icon: Globe },
  { label: "Cloud Solutions", icon: Cloud },
  { label: "Digital Transformation", icon: Sparkles },
  { label: "Generative AI & LLMs", icon: Bot },
  { label: "Computer Vision", icon: Cpu },
  { label: "Data Engineering", icon: Database },
];

export function CapabilitiesStrip() {
  // Duplicate items twice to enable seamless infinite loop
  const ribbonItems = [...capabilities, ...capabilities];

  return (
    <section
      className="relative overflow-hidden py-5 sm:py-6 border-y border-[#E3EDE5] bg-white/70 backdrop-blur-xs select-none"
      aria-label="Capabilities ticker ribbon"
    >
      {/* Left Gradient Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

      {/* Right Gradient Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFCF9] via-[#FAFCF9]/90 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Ribbon Track */}
      <div className="animate-marquee-ribbon flex items-center gap-4 sm:gap-6">
        {ribbonItems.map((cap, index) => {
          const Icon = cap.icon;
          return (
            <div
              key={`${cap.label}-${index}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FAFCF9] border border-[#E3EDE5] hover:border-[#159B50] hover:bg-[#F4FAF3] hover:shadow-md transition-all duration-200 group cursor-pointer shrink-0 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#087A3D] group-hover:bg-[#087A3D] group-hover:text-white transition-all duration-200">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#101C19] group-hover:text-[#087A3D] transition-colors whitespace-nowrap">
                {cap.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
