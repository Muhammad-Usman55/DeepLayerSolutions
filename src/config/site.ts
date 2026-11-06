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
    github: "https://github.com/deeplayersolutions",
    x: "https://x.com/deeplayersol",
    youtube: "https://youtube.com/@deeplayersolutions",
  },
  stats: [
    { value: "26+", label: "Projects Delivered", description: "Production deployments across AI and web" },
    { value: "9+", label: "Happy Clients", description: "Global founders and enterprise partners" },
    { value: "18+", label: "Client Satisfaction", description: "Measured by repeat collaborations" },
    { value: "2+", label: "Years of Experience", description: "Deep engineering and machine learning mastery" },
  ] satisfies StatItem[],
};

export type SiteConfig = typeof siteConfig;

