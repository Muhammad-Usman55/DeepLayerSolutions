import { JobOpeningItem } from "@/types";
import jobsJson from "./jobs.json";

export const careerPerks = [
  {
    title: "100% Remote Flexibility",
    description: "Work from anywhere in the world with flexible asynchronous workflows.",
    icon: "Globe",
  },
  {
    title: "Senior AI & Lead Mentorship",
    description: "Direct 1-on-1 collaboration with principal software architects and machine learning researchers.",
    icon: "Brain",
  },
  {
    title: "Real Production Shipments",
    description: "Build code and campaigns deployed for real enterprise clients, not throwaway toy tasks.",
    icon: "Rocket",
  },
  {
    title: "Fast-Track Full-Time Offers",
    description: "Top-performing interns transition directly into full-time associate engineer and lead roles.",
    icon: "Zap",
  },
];

export const jobOpeningsData: JobOpeningItem[] = (jobsJson as any[]).filter(
  (j) => j.status === "published" || !j.status
) as JobOpeningItem[];
