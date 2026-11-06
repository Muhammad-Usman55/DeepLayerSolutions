"use client";

import React from "react";
import { Container } from "../common/Container";
import { CaseStudyProject } from "@/types";
import {
  Zap,
  ShieldCheck,
  Layers,
  FileCheck,
  Workflow,
  CheckCircle2,
  RefreshCw,
  MapPin,
  Shield,
  Eye,
  Radio,
  Mic,
  PhoneCall,
  Database,
  FileText,
  Binary,
  Compass,
  MousePointerClick,
  Film,
  Scissors,
  Download,
  Sliders,
  Mic2,
  Languages,
  Volume2,
  Cpu,
} from "lucide-react";

interface Props {
  project: CaseStudyProject;
}

// Icon mapper helper
function renderFeatureIcon(iconName?: string) {
  switch (iconName) {
    case "Zap":
      return <Zap className="w-5 h-5 text-[#159B50]" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-5 h-5 text-[#159B50]" />;
    case "Layers":
      return <Layers className="w-5 h-5 text-[#159B50]" />;
    case "FileCheck":
      return <FileCheck className="w-5 h-5 text-[#159B50]" />;
    case "Workflow":
      return <Workflow className="w-5 h-5 text-[#159B50]" />;
    case "CheckCircle2":
      return <CheckCircle2 className="w-5 h-5 text-[#159B50]" />;
    case "RefreshCw":
      return <RefreshCw className="w-5 h-5 text-[#159B50]" />;
    case "MapPin":
      return <MapPin className="w-5 h-5 text-[#159B50]" />;
    case "Shield":
      return <Shield className="w-5 h-5 text-[#159B50]" />;
    case "Eye":
      return <Eye className="w-5 h-5 text-[#159B50]" />;
    case "Radio":
      return <Radio className="w-5 h-5 text-[#159B50]" />;
    case "Mic":
      return <Mic className="w-5 h-5 text-[#159B50]" />;
    case "PhoneCall":
      return <PhoneCall className="w-5 h-5 text-[#159B50]" />;
    case "Database":
      return <Database className="w-5 h-5 text-[#159B50]" />;
    case "FileText":
      return <FileText className="w-5 h-5 text-[#159B50]" />;
    case "Binary":
      return <Binary className="w-5 h-5 text-[#159B50]" />;
    case "Compass":
      return <Compass className="w-5 h-5 text-[#159B50]" />;
    case "MousePointerClick":
      return <MousePointerClick className="w-5 h-5 text-[#159B50]" />;
    case "Film":
      return <Film className="w-5 h-5 text-[#159B50]" />;
    case "Scissors":
      return <Scissors className="w-5 h-5 text-[#159B50]" />;
    case "Download":
      return <Download className="w-5 h-5 text-[#159B50]" />;
    case "Sliders":
      return <Sliders className="w-5 h-5 text-[#159B50]" />;
    case "Mic2":
      return <Mic2 className="w-5 h-5 text-[#159B50]" />;
    case "Languages":
      return <Languages className="w-5 h-5 text-[#159B50]" />;
    case "Volume2":
      return <Volume2 className="w-5 h-5 text-[#159B50]" />;
    default:
      return <Cpu className="w-5 h-5 text-[#159B50]" />;
  }
}

export function KeyFeaturesGrid({ project }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E3EDE5]">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#159B50]" />
            <span>CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C19]">
            Key Architectural Features
          </h2>
          <p className="mt-3 text-base text-[#65736D]">
            Modular capabilities engineered into the core runtime of {project.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.keyFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFCF9] border border-[#E3EDE5] hover:border-[#159B50]/50 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] border border-[#C4D9C8] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  {renderFeatureIcon(feature.iconName)}
                </div>

                <h3 className="text-lg font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#65736D] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E3EDE5] flex items-center justify-between text-[11px] font-mono text-[#A0AEA7]">
                <span>FEATURE_0{idx + 1}</span>
                <span className="text-[#075C32] font-semibold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
