import {
  LucideIcon,
  BrainCircuit,
  Code2,
  Globe2,
  Cloud,
  Database,
  Sparkles,
  Bot,
  SearchCheck,
} from "lucide-react";

export interface TechnologyItem {
  id: string;
  label: string;
  slug: string;
  href: string;
  icon: LucideIcon;
  tag: string;
  subline: string;
}

export const technologyItems: TechnologyItem[] = [
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    slug: "ai-machine-learning",
    href: "/services/ai-machine-learning",
    icon: BrainCircuit,
    tag: "01 · INTELLIGENCE",
    subline: "Custom ML Models & Predictive Neural Nets",
  },
  {
    id: "product-engineering",
    label: "Product Engineering",
    slug: "custom-software-development",
    href: "/services/custom-software-development",
    icon: Code2,
    tag: "02 · ARCHITECTURE",
    subline: "High-Concurrency Scalable Systems",
  },
  {
    id: "web-app-dev",
    label: "Web & Application Development",
    slug: "web-development",
    href: "/services/web-development",
    icon: Globe2,
    tag: "03 · PLATFORMS",
    subline: "Enterprise Next.js & Modern Web Apps",
  },
  {
    id: "genai-llms",
    label: "Generative AI & LLMs",
    slug: "generative-ai-llms",
    href: "/services/generative-ai-llms",
    icon: Sparkles,
    tag: "04 · FRONTIER",
    subline: "Fine-Tuned LLMs & Multi-Agent RAG",
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    slug: "cloud-solutions-devops",
    href: "/services/cloud-solutions-devops",
    icon: Cloud,
    tag: "05 · INFRASTRUCTURE",
    subline: "Automated CI/CD & Kubernetes Clusters",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    slug: "data-engineering",
    href: "/services/data-engineering",
    icon: Database,
    tag: "06 · PIPELINES",
    subline: "Real-Time Lakehouses & ETL Streams",
  },
  {
    id: "intelligent-agents",
    label: "Bots & Intelligent Agents",
    slug: "intelligent-agents",
    href: "/services/generative-ai-llms#agents",
    icon: Bot,
    tag: "07 · AUTOMATION",
    subline: "Self-Governing Agentic Workflows",
  },
  {
    id: "seo",
    label: "SEO & Growth Engine",
    slug: "seo",
    href: "/services/seo",
    icon: SearchCheck,
    tag: "08 · VISIBILITY",
    subline: "Core Web Vitals & Organic Search Rank",
  },
];
