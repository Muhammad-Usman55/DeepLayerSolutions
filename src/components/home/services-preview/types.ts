export type VisualType =
  | "ai"
  | "genai"
  | "ecommerce"
  | "erp"
  | "automation"
  | "software"
  | "web"
  | "cloud"
  | "data"
  | "mobile"
  | "consulting"
  | "seo";

export interface PreviewService {
  id: string;
  slug: string;
  title: string;
  visualType: VisualType;
  description: string;
}

export const previewServices: PreviewService[] = [
  {
    id: "ai-ml",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    visualType: "ai",
    description: "Find patterns in your data and turn them into useful predictions.",
  },
  {
    id: "gen-ai",
    slug: "generative-ai-llms",
    title: "Generative AI & LLMs",
    visualType: "genai",
    description: "Create assistants that can answer from your documents and tools.",
  },
  {
    id: "ecommerce",
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    visualType: "ecommerce",
    description: "Give customers a simple way to browse, buy, and pay online.",
  },
  {
    id: "erp-pos",
    slug: "erp-pos-solutions",
    title: "ERP & POS Solutions",
    visualType: "erp",
    description: "Keep sales, stock, and day-to-day operations in sync.",
  },
  {
    id: "business-automation",
    slug: "business-automation",
    title: "Business Automation",
    visualType: "automation",
    description: "Connect routine tasks so your team spends less time on busywork.",
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software",
    visualType: "software",
    description: "Build the tools your team needs around the way it works.",
  },
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    visualType: "web",
    description: "Make a fast, easy-to-use website or web application.",
  },
  {
    id: "cloud-devops",
    slug: "cloud-solutions-devops",
    title: "Cloud Solutions & DevOps",
    visualType: "cloud",
    description: "Deploy and maintain your applications with confidence.",
  },
  {
    id: "data-eng",
    slug: "data-engineering",
    title: "Data Engineering",
    visualType: "data",
    description: "Bring scattered data together into reports you can rely on.",
  },
  {
    id: "mobile-dev",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    visualType: "mobile",
    description: "Build an iOS or Android app that feels right to use.",
  },
  {
    id: "it-consulting",
    slug: "it-consulting",
    title: "IT Consulting",
    visualType: "consulting",
    description: "Get clear advice on architecture, upgrades, and what to build next.",
  },
  {
    id: "seo",
    slug: "seo",
    title: "Search Engine Optimization",
    visualType: "seo",
    description: "Help customers find your site and make it easier to navigate.",
  },
];
