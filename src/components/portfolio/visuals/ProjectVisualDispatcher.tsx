"use client";

import React from "react";
import { PlantDoctor3DVisual } from "./PlantDoctor3DVisual";
import { TravelMate3DVisual } from "./TravelMate3DVisual";
import { VisionSense3DVisual } from "./VisionSense3DVisual";
import { DeepVoice3DVisual } from "./DeepVoice3DVisual";
import { SmartQA3DVisual } from "./SmartQA3DVisual";
import { AutoLabeler3DVisual } from "./AutoLabeler3DVisual";
import { FinSecure3DVisual } from "./FinSecure3DVisual";

interface VisualDispatcherProps {
  visualType: string;
  mode?: "card" | "hero" | "gallery";
  className?: string;
}

export function ProjectVisualDispatcher({
  visualType,
  className = "",
}: VisualDispatcherProps) {
  switch (visualType) {
    case "plant-doctor":
      return (
        <div className={`w-full h-full ${className}`}>
          <PlantDoctor3DVisual />
        </div>
      );

    case "travelmate-ai":
      return (
        <div className={`w-full h-full ${className}`}>
          <TravelMate3DVisual />
        </div>
      );

    case "gender-detection":
    case "visionsense":
      return (
        <div className={`w-full h-full ${className}`}>
          <VisionSense3DVisual />
        </div>
      );

    case "voice-agent":
    case "deepvoice":
      return (
        <div className={`w-full h-full ${className}`}>
          <DeepVoice3DVisual />
        </div>
      );

    case "smart-course-qa":
    case "smart-qa":
    case "smart-enterprise-qa":
      return (
        <div className={`w-full h-full ${className}`}>
          <SmartQA3DVisual />
        </div>
      );

    case "auto-labeling":
      return (
        <div className={`w-full h-full ${className}`}>
          <AutoLabeler3DVisual />
        </div>
      );

    case "finsecure-ml":
      return (
        <div className={`w-full h-full ${className}`}>
          <FinSecure3DVisual />
        </div>
      );

    default:
      return (
        <div className={`w-full h-full ${className}`}>
          <PlantDoctor3DVisual />
        </div>
      );
  }
}
