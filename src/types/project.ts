export type ProjectCategory =
  | "All"
  | "AI & ML"
  | "Web Apps"
  | "Mobile"
  | "Data Science"
  | "Automation"
  | "Computer Vision"
  | "Voice & Conversational AI";

export type ProjectClassification =
  | "Independent Engineering Project"
  | "Production Engineering Prototype"
  | "Research & Edge Engineering Project"
  | "Internal Product & Tool"
  | "Academic & Production Tool";

export type ProjectStatus =
  | "Production Ready"
  | "Active Engineering"
  | "Completed Research"
  | "Stable Release";

export interface KeyFeatureItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface ArchitectureLayer {
  name: string;
  role: string;
  technologies: string[];
  description: string;
}

export interface TechCategoryGroup {
  category: string;
  items: string[];
}

export interface WorkflowStage {
  step: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface EngineeringChallengeItem {
  title: string;
  problem: string;
  approach: string;
  solution: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  context?: string;
}

export interface GalleryScreenItem {
  id: string;
  title: string;
  caption: string;
  visualType: string;
}

export interface CaseStudyProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  projectType: ProjectClassification;
  status: ProjectStatus;
  accentColor: string;
  featured: boolean;
  published: boolean;

  // Short previews for cards & listings
  summary: string;
  techStackFlat: string[];

  // Hero & Overview
  overview: string;
  targetAudience: string;
  heroVisualType: string;

  // Repository & Live Demo (only if authentic/public)
  repositoryUrl?: string;
  liveDemoUrl?: string;

  // Problem & Solution
  challenge: {
    summary: string;
    painPoints: string[];
  };
  solution: {
    summary: string;
    keyDecisions: string[];
  };

  // Structured Case Study Content
  keyFeatures: KeyFeatureItem[];
  technologies: string[];
  technologyGroups: TechCategoryGroup[];
  architecture: {
    overview: string;
    layers: ArchitectureLayer[];
    dataFlow: string[];
  };
  developmentProcess: WorkflowStage[];
  engineeringChallenges: EngineeringChallengeItem[];
  resultsAndValidation: {
    summary: string;
    metrics: MetricItem[];
    qualitativeValidation: string[];
  };
  galleryScreens: GalleryScreenItem[];

  // Pagination
  nextProjectSlug?: string;
  prevProjectSlug?: string;
}
