import { NavItem } from "@/types";

export interface ServiceNavItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName: "Globe" | "Gauge" | "Layout" | "Zap" | "Bot" | "Eye" | "Brain";
}

export const servicesMegaMenuData: ServiceNavItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "High-performance enterprise web apps & digital platforms.",
    href: "/services/web-development",
    iconName: "Globe",
  },
  {
    id: "site-opt",
    title: "Website Optimization",
    description: "Core Web Vitals, speed, and modern SEO enhancement.",
    href: "/services/web-development#optimization",
    iconName: "Gauge",
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting, bespoke UX/UI sales & lead generation pages.",
    href: "/services/web-development#landing-pages",
    iconName: "Layout",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Custom agentic pipelines and automated workflow intelligence.",
    href: "/services/generative-ai-llms",
    iconName: "Zap",
  },
  {
    id: "intelligent-agents",
    title: "Bots & Intelligent Agents",
    description: "Conversational AI, autonomous agents & LLM integrations.",
    href: "/services/generative-ai-llms#agents",
    iconName: "Bot",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Object detection, visual recognition & OCR neural networks.",
    href: "/services/ai-machine-learning#vision",
    iconName: "Eye",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Predictive modeling, custom ML models & data analytics.",
    href: "/services/ai-machine-learning",
    iconName: "Brain",
  },
];

export const headerNavLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
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
  { label: "Custom Software", href: "/services/custom-software-development" },
  { label: "Web Platforms", href: "/services/web-development" },
  { label: "Search Engine Optimization (SEO)", href: "/services/seo" },
  { label: "Cloud & DevOps", href: "/services/cloud-solutions-devops" },
  { label: "Data Engineering", href: "/services/data-engineering" },
  { label: "IT Consulting", href: "/services/it-consulting" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
