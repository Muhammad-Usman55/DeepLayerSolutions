import { LucideIcon, BrainCircuit, Code2, Globe2, Cloud, Database, Sparkles } from "lucide-react";

export interface TechnologyItem {
  id: string;
  label: string;
  slug: string;
  href: string;
  icon: LucideIcon;
  tag: string;
}

export const technologyItems: TechnologyItem[] = [
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    slug: "ai-machine-learning",
    href: "/services/ai-machine-learning",
    icon: BrainCircuit,
    tag: "01 · INTELLIGENCE",
  },
  {
    id: "product-engineering",
    label: "Product Engineering",
    slug: "custom-software-development",
    href: "/services/custom-software-development",
    icon: Code2,
    tag: "02 · ARCHITECTURE",
  },
  {
    id: "web-app-dev",
    label: "Web & Application Development",
    slug: "web-development",
    href: "/services/web-development",
    icon: Globe2,
    tag: "03 · PLATFORMS",
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    slug: "cloud-solutions-devops",
    href: "/services/cloud-solutions-devops",
    icon: Cloud,
    tag: "04 · INFRASTRUCTURE",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    slug: "data-engineering",
    href: "/services/data-engineering",
    icon: Database,
    tag: "05 · PIPELINES",
  },
  {
    id: "genai-llms",
    label: "Generative AI & LLMs",
    slug: "generative-ai-llms",
    href: "/services/generative-ai-llms",
    icon: Sparkles,
    tag: "06 · FRONTIER",
  },
];

