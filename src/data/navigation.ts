import { NavItem } from "@/types";

export interface ServiceNavItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName:
    | "Brain"
    | "Bot"
    | "Code2"
    | "Globe"
    | "Database"
    | "Cloud"
    | "Smartphone"
    | "Compass"
    | "SearchCheck"
    | "Gauge"
    | "Layout"
    | "Zap"
    | "Eye";
}

export const servicesMegaMenuData: ServiceNavItem[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Custom deep learning models, computer vision & neural networks.",
    href: "/services/ai-machine-learning",
    iconName: "Brain",
  },
  {
    id: "gen-ai",
    title: "Generative AI & LLM Solutions",
    description: "RAG vector pipelines, multi-agent AI systems & LLM fine-tuning.",
    href: "/services/generative-ai-llms",
    iconName: "Bot",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "High-concurrency backend systems & enterprise microservices.",
    href: "/services/custom-software-development",
    iconName: "Code2",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Enterprise Next.js web applications, headless platforms & rapid UI.",
    href: "/services/web-development",
    iconName: "Globe",
  },
  {
    id: "data-eng",
    title: "Data Engineering & Analytics",
    description: "High-throughput ETL pipelines, streaming architectures & BI lakes.",
    href: "/services/data-engineering",
    iconName: "Database",
  },
  {
    id: "cloud-devops",
    title: "Cloud Solutions & DevOps",
    description: "Kubernetes orchestration, CI/CD automation & zero-trust cloud.",
    href: "/services/cloud-solutions-devops",
    iconName: "Cloud",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Cross-platform iOS & Android native apps with offline sync.",
    href: "/services/mobile-app-development",
    iconName: "Smartphone",
  },
  {
    id: "it-consulting",
    title: "IT Consulting & Transformation",
    description: "Architecture modernization, technical audits & CTO advisory.",
    href: "/services/it-consulting",
    iconName: "Compass",
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    description: "Technical crawl audits, Core Web Vitals & organic ranking.",
    href: "/services/seo",
    iconName: "SearchCheck",
  },
];

export const headerNavLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers", badge: "Hiring" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavItem[] = [
  { label: "AI & Machine Learning", href: "/services/ai-machine-learning" },
  { label: "Generative AI & LLMs", href: "/services/generative-ai-llms" },
  { label: "Custom Software", href: "/services/custom-software-development" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Data Engineering", href: "/services/data-engineering" },
  { label: "Cloud & DevOps", href: "/services/cloud-solutions-devops" },
  { label: "Mobile Applications", href: "/services/mobile-app-development" },
  { label: "IT Consulting", href: "/services/it-consulting" },
  { label: "SEO & Optimization", href: "/services/seo" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
