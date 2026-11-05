"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen, Search } from "lucide-react";
import { blogPostsData } from "@/data/blog";
import { formatDate, cn } from "@/lib/utils";

const categories = [
  "All",
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Cloud Solutions",
];

export function BlogView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#E3EDE5]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer",
                activeCategory === cat
                  ? "bg-[#047F5B] text-white shadow-sm"
                  : "bg-white text-[#101C19] hover:bg-[#F4FAF3] hover:text-[#047F5B] border border-[#E3EDE5]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#65736D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            aria-label="Search articles"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-[#E3EDE5] focus:outline-none focus:border-[#047F5B] focus:ring-1 focus:ring-[#047F5B]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col justify-between rounded-2xl bg-white border border-[#E3EDE5] hover:border-[#159B50]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Visual Header Banner */}
            <div className="relative h-44 w-full bg-gradient-to-br from-[#E8F5E9] to-[#FAFCF9] border-b border-[#E3EDE5] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-[#E3EDE5] flex items-center justify-center text-[#087A3D] group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            {/* Post Meta & Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#65736D] mb-3">
                  <span className="font-mono font-semibold uppercase text-[#075C32] px-2.5 py-0.5 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#101C19] group-hover:text-[#087A3D] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-[#65736D] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#E3EDE5] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#65736D]">
                  <Calendar className="w-3.5 h-3.5 text-[#087A3D]" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#087A3D] group-hover:text-[#075C32] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

