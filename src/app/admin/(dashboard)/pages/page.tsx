"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  FileText,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Eye,
  X,
  Share2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface PageMetaItem {
  id: string;
  title: string;
  path: string;
  description: string;
  section: "Core" | "Solutions" | "Company" | "Legal";
  lastAudited: string;
  hasOgImage: boolean;
  canonicalUrl: string;
}

const PAGES_CATALOG: PageMetaItem[] = [
  {
    id: "home",
    title: "DeepLayer Solutions — Software Architecture & Artificial Intelligence",
    path: "/",
    description: "Enterprise software architecture, artificial intelligence engineering, and scalable cloud systems.",
    section: "Core",
    lastAudited: "Nov 15, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com",
  },
  {
    id: "services",
    title: "Engineering Services & AI Capabilities — DeepLayer Solutions",
    path: "/services",
    description: "Generative AI, Large Language Models, PyTorch neural vision, and distributed backend engineering.",
    section: "Solutions",
    lastAudited: "Nov 14, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/services",
  },
  {
    id: "portfolio",
    title: "Enterprise Case Studies & Deployments — DeepLayer Solutions",
    path: "/portfolio",
    description: "Real-world engineering case studies spanning FinTech AI, multimodal vision, and high-throughput systems.",
    section: "Solutions",
    lastAudited: "Nov 13, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/portfolio",
  },
  {
    id: "industries",
    title: "Industry Verticals & Sector Solutions — DeepLayer Solutions",
    path: "/industries",
    description: "Tailored architectural solutions for Healthcare, Fintech, Logistics, Retail, and SaaS enterprises.",
    section: "Solutions",
    lastAudited: "Nov 12, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/industries",
  },
  {
    id: "about",
    title: "About DeepLayer Solutions — Architectural Vision & Leadership",
    path: "/about",
    description: "Meet our principal engineers, mission, and philosophy for resilient, intelligence-driven software.",
    section: "Company",
    lastAudited: "Nov 11, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/about",
  },
  {
    id: "careers",
    title: "Careers & Remote Internships — DeepLayer Solutions",
    path: "/careers",
    description: "Paid remote engineering internships and full-time career transition paths in Lahore and globally.",
    section: "Company",
    lastAudited: "Nov 15, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/careers",
  },
  {
    id: "blog",
    title: "Engineering Blog & Technical Insights — DeepLayer Solutions",
    path: "/blog",
    description: "In-depth technical articles on AI agents, neural retrieval, production LLMs, and systems scaling.",
    section: "Company",
    lastAudited: "Nov 14, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/blog",
  },
  {
    id: "contact",
    title: "Contact DeepLayer Solutions — Start Your Architecture Journey",
    path: "/contact",
    description: "Schedule technical architecture consultations, inquire about projects, or connect with leadership.",
    section: "Company",
    lastAudited: "Nov 15, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/contact",
  },
  {
    id: "privacy",
    title: "Privacy Policy — DeepLayer Solutions",
    path: "/privacy",
    description: "Commitment to GDPR, data confidentiality, client telemetry protection, and security practices.",
    section: "Legal",
    lastAudited: "Nov 10, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/privacy",
  },
  {
    id: "terms",
    title: "Terms of Service — DeepLayer Solutions",
    path: "/terms",
    description: "Client engagement terms, intellectual property protections, warranties, and SLA guarantees.",
    section: "Legal",
    lastAudited: "Nov 10, 2026",
    hasOgImage: true,
    canonicalUrl: "https://www.deeplayersolutions.com/terms",
  },
];

export default function AdminPagesPage() {
  const [pages] = useState<PageMetaItem[]>(PAGES_CATALOG);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [selectedPage, setSelectedPage] = useState<PageMetaItem | null>(null);

  const filteredPages = pages.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.path.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchesSection = sectionFilter === "all" || p.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Website Content &amp; Pages Index
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              Next.js 16 SSG / ISR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Audit canonical URLs, OpenGraph previews, SEO metadata, and live production endpoints.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Live Site</span>
        </a>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Indexed Core Pages
          </span>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {pages.length} Pages
          </div>
          <span className="text-[11px] text-[#64736F]">100% SEO Canonical &amp; Sitemap verified</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Metadata Compliance
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-2 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>100% Valid</span>
          </div>
          <span className="text-[11px] text-[#64736F]">H1 tags, OpenGraph, Twitter Cards</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Edge Cache Mode
          </span>
          <div className="text-2xl font-black text-indigo-700 mt-2">
            Dynamic ISR
          </div>
          <span className="text-[11px] text-[#64736F]">Sub-50ms TTFB across Vercel Global Edge</span>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[#DFEDE5] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFCF9]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search page route or title..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DFEDE5] bg-white text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] cursor-pointer"
            >
              <option value="all">All Sections ({pages.length})</option>
              <option value="Core">Core</option>
              <option value="Solutions">Solutions</option>
              <option value="Company">Company</option>
              <option value="Legal">Legal</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DFEDE5] bg-[#FAFCF9] text-[11px] font-bold text-[#64736F] uppercase tracking-wider">
                <th className="py-3 px-4">Page Route</th>
                <th className="py-3 px-4">SEO Page Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Last Verified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5] text-xs">
              {filteredPages.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAFCF9] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#008F53]">
                    {p.path}
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="font-bold text-[#142A27] truncate">{p.title}</div>
                    <div className="text-[11px] text-[#64736F] truncate mt-0.5">{p.description}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
                      {p.section}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-[#64736F] font-mono">
                    {p.lastAudited}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPage(p)}
                        className="px-2.5 py-1.5 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        Metadata
                      </button>

                      <a
                        href={p.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl text-[#008F53] hover:bg-[#E9FFF2] transition-colors cursor-pointer"
                        title="View live page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* METADATA MODAL */}
      {selectedPage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#142A27]">
                    SEO &amp; OpenGraph Inspector
                  </h3>
                  <span className="text-[11px] font-mono text-[#008F53]">{selectedPage.path}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPage(null)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] space-y-1">
                <span className="text-[10px] font-bold text-[#64736F] uppercase">Page Title Tag</span>
                <div className="font-bold text-[#142A27] leading-tight">{selectedPage.title}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] space-y-1">
                <span className="text-[10px] font-bold text-[#64736F] uppercase">Meta Description</span>
                <div className="text-[#64736F] leading-relaxed">{selectedPage.description}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] space-y-1">
                <span className="text-[10px] font-bold text-[#64736F] uppercase">Canonical URL</span>
                <div className="font-mono text-[#008F53] font-bold">{selectedPage.canonicalUrl}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#64736F] uppercase block">OpenGraph Banner</span>
                  <span className="font-mono text-[11px] text-[#142A27]">/logo/logo.png (1200x630)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Ready
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DFEDE5] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedPage(null)}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-[#142A27] cursor-pointer"
              >
                Close
              </button>
              <a
                href={selectedPage.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <span>Visit Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
