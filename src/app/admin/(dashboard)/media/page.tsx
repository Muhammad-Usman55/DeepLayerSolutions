"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Image as ImageIcon,
  Copy,
  ExternalLink,
  Check,
  Search,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";

interface MediaAsset {
  id: string;
  name: string;
  category: "Logos & Identity" | "Icons & Favicons" | "Candidate Resumes" | "Illustrations";
  path: string;
  size: string;
  dimensions?: string;
  type: string;
}

const BRAND_MEDIA: MediaAsset[] = [
  {
    id: "logo-main",
    name: "DeepLayer Primary Logo (Green / Emerald)",
    category: "Logos & Identity",
    path: "/logo/logo.png",
    size: "24.8 KB",
    dimensions: "512 x 512 px",
    type: "PNG",
  },
  {
    id: "logo-cropped",
    name: "DeepLayer Cropped Icon & Symbol",
    category: "Logos & Identity",
    path: "/logo/logo-cropped.png",
    size: "18.2 KB",
    dimensions: "256 x 256 px",
    type: "PNG",
  },
  {
    id: "logo-white",
    name: "DeepLayer Monochrome White Vector Mark",
    category: "Logos & Identity",
    path: "/logo/logo-white.png",
    size: "19.5 KB",
    dimensions: "512 x 512 px",
    type: "PNG",
  },
  {
    id: "icon-app",
    name: "PWA App Icon & Touch Target",
    category: "Icons & Favicons",
    path: "/icon.png",
    size: "8.4 KB",
    dimensions: "192 x 192 px",
    type: "PNG",
  },
  {
    id: "favicon-ico",
    name: "Browser Tab Favicon",
    category: "Icons & Favicons",
    path: "/favicon.ico",
    size: "4.2 KB",
    dimensions: "32 x 32 px",
    type: "ICO",
  },
  {
    id: "apple-touch",
    name: "Apple Touch Device Icon",
    category: "Icons & Favicons",
    path: "/apple-icon.png",
    size: "12.1 KB",
    dimensions: "180 x 180 px",
    type: "PNG",
  },
];

export default function AdminMediaPage() {
  const [media] = useState<MediaAsset[]>(BRAND_MEDIA);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (path: string, id: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredMedia = media.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(q) || item.path.toLowerCase().includes(q);
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Media &amp; Brand Asset Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              CDN &amp; Storage
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Centrally manage brand imagery, vectors, icons, and candidate uploads stored across Supabase Storage.
          </p>
        </div>

        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFEDE5] text-[#142A27] text-xs font-semibold hover:bg-neutral-50 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-[#008F53]" />
          <span>Inspect Stored Resumes</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFCF9]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files or paths..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DFEDE5] bg-white text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] cursor-pointer"
          >
            <option value="all">All Media Categories</option>
            <option value="Logos & Identity">Logos &amp; Identity</option>
            <option value="Icons & Favicons">Icons &amp; Favicons</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMedia.map((asset) => {
          const isCopied = copiedId === asset.id;

          return (
            <div
              key={asset.id}
              className="p-5 rounded-3xl bg-white border border-[#DFEDE5] hover:border-[#008F53]/40 transition-all shadow-2xs flex flex-col justify-between gap-4"
            >
              <div>
                {/* Visual Preview Container */}
                <div className="h-40 w-full rounded-2xl bg-gradient-to-b from-[#FAFCF9] to-[#E9FFF2]/30 border border-[#DFEDE5] flex items-center justify-center p-4 relative overflow-hidden mb-3">
                  <div className="relative w-24 h-24">
                    <Image
                      src={asset.path}
                      alt={asset.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 border border-[#DFEDE5] text-[#142A27]">
                    {asset.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#008F53]">
                    {asset.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#142A27] line-clamp-1">
                    {asset.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#64736F] font-mono pt-1">
                    <span>{asset.size}</span>
                    {asset.dimensions && (
                      <>
                        <span>•</span>
                        <span>{asset.dimensions}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#DFEDE5] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(asset.path, asset.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#64736F]" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl text-[#008F53] hover:bg-[#E9FFF2] transition-colors"
                  title="Open file in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
