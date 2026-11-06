"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../common/Container";
import { Breadcrumb } from "../common/Breadcrumb";
import { CaseStudyProject } from "@/types";
import { ExternalLink, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { ProjectVisualDispatcher } from "../portfolio/visuals/ProjectVisualDispatcher";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface CaseStudyHeroProps {
  project: CaseStudyProject;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-white border-b border-[#E3EDE5]">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#159B50 0.75px, transparent 0.75px), radial-gradient(#087A3D 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      <Container size="wide" className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title, href: `/portfolio/${project.slug}` },
            ]}
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087A3D] hover:text-[#075C32] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Hero Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#047F5B] border border-[#D8E6DC] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-[2px] bg-[#047F5B]" />
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white text-[#101C19] border border-[#E3EDE5]">
            {project.projectType}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#F4FAF3] text-[#047F5B] border border-[#D8E6DC]">
            {project.status}
          </span>
        </div>

        {/* Main Title & Tagline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-lg sm:text-2xl font-semibold text-[#087A3D] leading-snug">
            {project.tagline}
          </p>
          <p className="mt-5 text-base sm:text-lg text-[#65736D] leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Quick Action Links & Tech Pills */}
        <div className="mt-8 pt-6 border-t border-[#E3EDE5] flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#65736D] mr-1">
              Stack:
            </span>
            {project.techStackFlat.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white text-[#075C32] border border-[#E3EDE5] shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External Action Links (Authentic Repos / Demos) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#087A3D] text-white hover:bg-[#075C32] transition-colors shadow-sm"
              >
                <span>Live Prototype</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-[#101C19] hover:bg-[#F4FAF3] border border-[#E3EDE5] hover:border-[#159B50]/60 transition-colors shadow-2xs"
              >
                <GithubIcon className="w-4 h-4 text-[#101C19]" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Large Bespoke Project Visual Display */}
        <div className="mt-10 rounded-2xl sm:rounded-3xl border border-[#E3EDE5] overflow-hidden shadow-xl bg-[#062418]">
          <div className="h-72 sm:h-96 md:h-[460px] w-full">
            <ProjectVisualDispatcher
              visualType={project.heroVisualType || project.slug}
              mode="hero"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
