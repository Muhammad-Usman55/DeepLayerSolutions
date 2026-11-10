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

export type ServiceFilterCategory =
  | "all"
  | "ai-automation"
  | "enterprise-commerce"
  | "cloud-growth";

export interface PreviewService {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryGroup: "ai-automation" | "enterprise-commerce" | "cloud-growth";
  visualType: VisualType;
  description: string;
}

export const previewServices: PreviewService[] = [
  {
    id: "ai-ml",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    category: "Intelligent Systems",
    categoryGroup: "ai-automation",
    visualType: "ai",
    description: "Predictive intelligence, neural networks, and computer vision systems.",
  },
  {
    id: "gen-ai",
    slug: "generative-ai-llms",
    title: "Generative AI & LLMs",
    category: "Next-Gen AI",
    categoryGroup: "ai-automation",
    visualType: "genai",
    description: "Autonomous reasoning agents, enterprise RAG, and custom fine-tuned LLMs.",
  },
  {
    id: "ecommerce",
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    category: "Digital Commerce",
    categoryGroup: "enterprise-commerce",
    visualType: "ecommerce",
    description: "Headless storefronts, global payment orchestration, and AI conversions.",
  },
  {
    id: "erp-pos",
    slug: "erp-pos-solutions",
    title: "ERP & POS Solutions",
    category: "Enterprise Systems",
    categoryGroup: "enterprise-commerce",
    visualType: "erp",
    description: "Unified cloud & offline POS, real-time inventory, and supply chain ERP.",
  },
  {
    id: "business-automation",
    slug: "business-automation",
    title: "Business Automation",
    category: "Intelligent Automation",
    categoryGroup: "ai-automation",
    visualType: "automation",
    description: "Event-driven micro-automations, RPA pipelines, and 24/7 worker bots.",
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software",
    category: "Core Engineering",
    categoryGroup: "enterprise-commerce",
    visualType: "software",
    description: "Resilient microservices, high-throughput distributed systems, and APIs.",
  },
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    category: "Digital Platforms",
    categoryGroup: "cloud-growth",
    visualType: "web",
    description: "High-performance Next.js web applications, PWAs, and digital platforms.",
  },
  {
    id: "cloud-devops",
    slug: "cloud-solutions-devops",
    title: "Cloud Solutions & DevOps",
    category: "Cloud Infrastructure",
    categoryGroup: "cloud-growth",
    visualType: "cloud",
    description: "Automated GitOps CI/CD pipelines, Kubernetes, and 99.99% uptime reliability.",
  },
  {
    id: "data-eng",
    slug: "data-engineering",
    title: "Data Engineering",
    category: "Data Platforms",
    categoryGroup: "ai-automation",
    visualType: "data",
    description: "Real-time streaming pipelines, modern lakehouses, and BI analytics.",
  },
  {
    id: "mobile-dev",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Mobile Platforms",
    categoryGroup: "cloud-growth",
    visualType: "mobile",
    description: "Native iOS & Android, Flutter, React Native, and offline-first sync.",
  },
  {
    id: "it-consulting",
    slug: "it-consulting",
    title: "IT Consulting",
    category: "Strategic Advisory",
    categoryGroup: "enterprise-commerce",
    visualType: "consulting",
    description: "Architecture audits, fractional CTO leadership, and digital transformation.",
  },
  {
    id: "seo",
    slug: "seo",
    title: "Search Engine Optimization",
    category: "Search & Visibility",
    categoryGroup: "cloud-growth",
    visualType: "seo",
    description: "Technical SEO audits, JSON-LD entity graph schemas, and Core Web Vitals.",
  },
];
