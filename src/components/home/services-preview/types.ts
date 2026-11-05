export interface PreviewService {
  id: string;
  slug: string;
  title: string;
  category: string;
  visualType: "ai" | "software" | "web" | "cloud";
}

export const previewServices: PreviewService[] = [
  {
    id: "ai-ml",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    category: "Intelligent Systems",
    visualType: "ai",
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Enterprise Platforms",
    visualType: "software",
  },
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    category: "Scalable Platforms",
    visualType: "web",
  },
  {
    id: "cloud-devops",
    slug: "cloud-solutions-devops",
    title: "Cloud Solutions & DevOps",
    category: "Cloud Infrastructure",
    visualType: "cloud",
  },
];

