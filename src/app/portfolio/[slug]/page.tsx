import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CTASection } from "@/components/common/CTASection";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ProjectOverviewSection } from "@/components/case-study/ProjectOverviewSection";
import { ChallengeSolutionSection } from "@/components/case-study/ChallengeSolutionSection";
import { KeyFeaturesGrid } from "@/components/case-study/KeyFeaturesGrid";
import { ArchitectureSection } from "@/components/case-study/ArchitectureSection";
import { TechnologyStackSection } from "@/components/case-study/TechnologyStackSection";
import { DevelopmentProcessSection } from "@/components/case-study/DevelopmentProcessSection";
import { EngineeringChallengesSection } from "@/components/case-study/EngineeringChallengesSection";
import { ResultsValidationSection } from "@/components/case-study/ResultsValidationSection";
import { ProjectGallerySection } from "@/components/case-study/ProjectGallerySection";
import { RelatedProjectsNav } from "@/components/case-study/RelatedProjectsNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | DeepLayer Solutions",
    };
  }

  return {
    title: `${project.title} — ${project.tagline} | DeepLayer Solutions`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | DeepLayer Solutions`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      {/* 1. Case Study Hero */}
      <CaseStudyHero project={project} />

      {/* 2. Project Overview & Target Audience */}
      <ProjectOverviewSection project={project} />

      {/* 3. The Challenge & The Solution */}
      <ChallengeSolutionSection project={project} />

      {/* 4. Key Architectural Features */}
      <KeyFeaturesGrid project={project} />

      {/* 5. Under The Hood: System Architecture */}
      <ArchitectureSection project={project} />

      {/* 6. Technology Stack Composition */}
      <TechnologyStackSection project={project} />

      {/* 7. Development & Engineering Lifecycle */}
      <DevelopmentProcessSection project={project} />

      {/* 8. Genuine Engineering Challenges & Solutions */}
      <EngineeringChallengesSection project={project} />

      {/* 9. Verified Results & Telemetry Benchmarks */}
      <ResultsValidationSection project={project} />

      {/* 10. Visual Product Architecture (Screens Gallery) */}
      <ProjectGallerySection project={project} />

      {/* 11. Previous & Next Project Navigation */}
      <RelatedProjectsNav project={project} />

      {/* 12. Final Bottom CTA */}
      <CTASection
        title={`Ready to Build Something Similar to ${project.title}?`}
        subtitle="Let's engineer a bespoke digital solution tailored to your operational constraints, latency requirements, and business goals."
        buttonText="Discuss Your Project"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
