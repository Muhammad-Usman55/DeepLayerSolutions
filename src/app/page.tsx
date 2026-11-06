import { HeroSection } from "@/components/home/HeroSection";
import { TechnologyMarquee } from "@/components/home/TechnologyMarquee";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ShowcaseProjects } from "@/components/home/ShowcaseProjects";
import { IndustriesPreview } from "@/components/home/IndustriesPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TechEcosystem } from "@/components/home/TechEcosystem";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/common/CTASection";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <TechnologyMarquee />
      <ServicesPreview />
      <WhyChooseUs />
      <StatsStrip />
      <ShowcaseProjects />
      <IndustriesPreview />
      <ProcessTimeline />
      <TechEcosystem />
      <FAQSection />
      <CTASection
        title="Ready to Build Something Intelligent?"
        subtitle="Let's turn your next big idea into a powerful digital solution. Our senior engineers and AI architects are ready to collaborate."
        buttonText="Let's Discuss Your Project"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
