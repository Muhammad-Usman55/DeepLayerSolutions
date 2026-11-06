"use client";

import React from "react";
import { PlantDoctorVisual } from "./PlantDoctorVisual";
import { TravelMateVisual } from "./TravelMateVisual";
import { VisionSenseVisual } from "./VisionSenseVisual";
import { DeepVoiceVisual } from "./DeepVoiceVisual";
import { SmartQAVisual } from "./SmartQAVisual";
import { AutoLabelerVisual } from "./AutoLabelerVisual";
import { UrduDubbingVisual } from "./UrduDubbingVisual";

interface VisualDispatcherProps {
  visualType: string;
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function ProjectVisualDispatcher({
  visualType,
  mode = "card",
  className = "",
}: VisualDispatcherProps) {
  switch (visualType) {
    case "plant-doctor":
    case "plant-doctor-scanner":
    case "plant-doctor-gradcam":
    case "plant-doctor-treatment":
      return <PlantDoctorVisual mode={mode} className={className} />;

    case "travelmate-ai":
    case "travelmate-timeline":
    case "travelmate-graph":
    case "travelmate-map":
      return <TravelMateVisual mode={mode} className={className} />;

    case "gender-detection":
    case "gender-detection-hud":
    case "gender-detection-pipeline":
    case "gender-detection-dashboard":
      return <VisionSenseVisual mode={mode} className={className} />;

    case "voice-agent":
    case "voice-agent-console":
    case "voice-agent-bargein":
    case "voice-agent-crm":
      return <DeepVoiceVisual mode={mode} className={className} />;

    case "smart-course-qa":
    case "smart-qa":
    case "smart-qa-split":
    case "smart-qa-math":
    case "smart-qa-citation":
      return <SmartQAVisual mode={mode} className={className} />;

    case "auto-labeling":
    case "auto-labeling-canvas":
    case "auto-labeling-timeline":
    case "auto-labeling-export":
      return <AutoLabelerVisual mode={mode} className={className} />;

    case "urdu-dubbing":
    case "urdu-dubbing-stems":
    case "urdu-dubbing-editor":
    case "urdu-dubbing-cloner":
      return <UrduDubbingVisual mode={mode} className={className} />;

    default:
      return <PlantDoctorVisual mode={mode} className={className} />;
  }
}
