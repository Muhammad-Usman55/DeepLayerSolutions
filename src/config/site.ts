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
    // Editable contact details - replace with verified production credentials
    email: "hello@deeplayersolutionss.com",
    phone: "+92 300 123 4567",
    address: "G-13, Islamabad, Pakistan",
    availability: "Monday – Friday: 9:00 AM – 6:00 PM (PKT)",
  },
  social: {
    linkedin: "https://linkedin.com/company/deeplayersolutions",
    github: "https://github.com/deeplayersolutions",
    x: "https://x.com/deeplayersol",
    youtube: "https://youtube.com/@deeplayersolutions",
  },
  stats: [
    { value: "50+", label: "Projects Delivered", description: "Production deployments across AI and web" },
    { value: "25+", label: "Happy Clients", description: "Global founders and enterprise partners" },
    { value: "99%", label: "Client Satisfaction", description: "Measured by repeat collaborations" },
    { value: "5+", label: "Years of Experience", description: "Deep engineering and machine learning mastery" },
  ] satisfies StatItem[],
};

export type SiteConfig = typeof siteConfig;

