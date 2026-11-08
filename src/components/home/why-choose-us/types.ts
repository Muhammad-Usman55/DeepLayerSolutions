import { LucideIcon } from "lucide-react";
import { BrainCircuit, Layers3, Box, Zap } from "lucide-react";

export interface ValueCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export const valueCardsData: ValueCardItem[] = [
  {
    id: "card-01",
    number: "01",
    title: "Innovation First",
    description: "Custom AI models and agentic RAG pipelines engineered with sub-450ms inference latency.",
    icon: BrainCircuit,
    href: "/services",
  },
  {
    id: "card-02",
    number: "02",
    title: "Engineering Excellence",
    description: "Strict TypeScript safety, automated CI/CD pipelines, and zero-compromise code quality.",
    icon: Layers3,
    href: "/services",
  },
  {
    id: "card-03",
    number: "03",
    title: "Built to Scale",
    description: "Cloud-native microservices, Kubernetes clusters, and event-driven architectures for high concurrency.",
    icon: Box,
    href: "/services",
  },
  {
    id: "card-04",
    number: "04",
    title: "Client-First Approach",
    description: "Transparent sprint delivery, direct senior architect collaboration, and complete client IP ownership.",
    icon: Zap,
    href: "/about",
  },
];
