import { LucideIcon } from "lucide-react";
import { BrainCircuit, Layers3, Box, Zap } from "lucide-react";

export interface ValueCardItem {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  href?: string;
}

export const valueCardsData: ValueCardItem[] = [
  {
    id: "card-01",
    number: "01",
    title: "Innovation First",
    icon: BrainCircuit,
    href: "/services",
  },
  {
    id: "card-02",
    number: "02",
    title: "Engineering Excellence",
    icon: Layers3,
    href: "/services",
  },
  {
    id: "card-03",
    number: "03",
    title: "Built to Scale",
    icon: Box,
    href: "/services",
  },
  {
    id: "card-04",
    number: "04",
    title: "Client-First Approach",
    icon: Zap,
    href: "/about",
  },
];
