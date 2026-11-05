export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: string;
  featured?: boolean;
  heroTagline: string;
  challenges: string[];
  approach: string[];
  capabilities: string[];
  techStack: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  relatedServices?: string[];
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  iconName: string;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  applications: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "AI & ML" | "Web Apps" | "Mobile" | "Data Science" | "Automation";
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  featured?: boolean;
  image?: string;
  accentColor?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  featuredImage?: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      keyTakeaways?: string[];
    }[];
    conclusion: string;
  };
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl?: string;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

