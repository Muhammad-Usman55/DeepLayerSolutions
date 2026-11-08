import { StatItem } from "@/types";

export const siteConfig = {
  name: "DeepLayer Solutions",
  tagline: "Build • Innovate • Scale",
  subtitle: "Your Trusted Software & AI Partner",
  description:
    "Cutting-edge software engineering, Artificial Intelligence, and digital products to help your business innovate, grow, and stay ahead.",
  url: "https://deeplayersolutions.com",
  ogImage: "/logo/logo.png",
  contact: {
    // Official verified production contact endpoints
    email: "deeplayersolutions@gmail.com",
    phone: "+92 316 6007316",
    whatsapp: "+92 316 6007316",
    whatsappUrl: "https://wa.me/923166007316",
    address: "Lahore, Pakistan",
    availability: "Monday – Friday: 9:00 AM – 6:00 PM (PKT)",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/deeplayersolutions/",
    facebook: "https://www.facebook.com/people/DeepLayer-Solutions/61596345801437/",
  },
  stats: [
    { value: "26+", label: "Projects Delivered", description: "Production deployments across AI and web" },
    { value: "99.4%", label: "Production Uptime", description: "Enterprise-grade reliability & SLA stability" },
    { value: "98%", label: "Client Retention", description: "Long-term enterprise & founder partnerships" },
    { value: "2+", label: "Years of Experience", description: "Deep engineering and machine learning mastery" },
  ] satisfies StatItem[],
};

export type SiteConfig = typeof siteConfig;

