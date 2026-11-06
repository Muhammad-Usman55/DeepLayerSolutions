import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";
import { projectsData } from "@/data/projects";

export function ShowcaseProjects() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-20 md:py-28 relative">
      <Container size="wide">
        <SectionHeading
          badge="Featured Portfolio"
          title="Turning Ideas Into Intelligent Solutions."
          highlight="Intelligent Solutions"
          subtitle="A selection of software platforms and AI implementations engineered with precision, reliability, and modern architecture."
          action={
            <Button href="/portfolio" variant="secondary" size="md" withArrow>
              View Full Portfolio
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Card Visual Header */}
              <div className="relative h-48 w-full bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF3] to-[#FAFCF9] border-b border-[#E3EDE5] flex items-center justify-center p-6 overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                {/* Ambient Soft Glow */}
                <div
                  className="absolute w-32 h-32 rounded-full blur-2xl opacity-40 transition-transform duration-500 group-hover:scale-125"
                  style={{ backgroundColor: project.accentColor || "#159B50" }}
                />

                {/* Central Project Graphic Badge */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-[#E3EDE5] flex items-center justify-center text-[#047F5B] group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <span className="mt-3 text-xs font-mono font-semibold tracking-wider uppercase text-[#173D2F] px-2.5 py-0.5 rounded-full bg-white/80 border border-[#C4D9C8]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#047F5B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#047F5B]">
                    {project.tagline}
                  </p>
                  <p className="mt-3 text-sm text-[#65736D] leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-4 pt-4 border-t border-[#E3EDE5] flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4FAF3] text-[#173D2F] border border-[#E3EDE5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-3 flex items-center justify-between">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#047F5B] group-hover:text-[#173D2F] transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] text-[#A0AEA7] font-medium">Production Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
