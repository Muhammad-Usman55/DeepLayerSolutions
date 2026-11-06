"use client";

import React, { useState } from "react";
import { Search, Briefcase, Filter, Sparkles } from "lucide-react";
import { jobOpeningsData } from "@/data/careers";
import { JobCard } from "./JobCard";
import { CareerApplyForm } from "./CareerApplyForm";

const departments = [
  "All Openings",
  "Engineering & AI",
  "Growth & Marketing",
  "Business & Sales",
];

export function CareersContent() {
  const [selectedDept, setSelectedDept] = useState("All Openings");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPositionForForm, setSelectedPositionForForm] = useState<string>("AI/ML Engineer Intern");

  const filteredJobs = jobOpeningsData.filter((job) => {
    const matchesDept =
      selectedDept === "All Openings" || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplyClick = (jobTitle: string) => {
    setSelectedPositionForForm(jobTitle);
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-16">
      {/* Search & Department Filters Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#DFEDE5] shadow-xs">
        {/* Department Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {departments.map((dept) => {
            const isActive = selectedDept === dept;
            const count =
              dept === "All Openings"
                ? jobOpeningsData.length
                : jobOpeningsData.filter((j) => j.department === dept).length;

            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#008F53] text-white shadow-xs"
                    : "bg-[#FAFCF9] text-[#64736F] hover:text-[#142A27] hover:bg-white border border-transparent hover:border-[#DFEDE5]"
                }`}
              >
                <span>{dept}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-[#E9FFF2] text-[#008F53]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Keyword Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#64736F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
          />
        </div>
      </div>

      {/* Jobs Listing Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#008F53]" />
            <h3 className="text-lg font-bold text-[#142A27]">
              Current Openings ({filteredJobs.length})
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-[#008F53] bg-[#E9FFF2] px-3 py-1 rounded-full border border-[#BCE8CF]">
            All 100% Remote
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#DFEDE5]">
            <p className="text-sm font-semibold text-[#142A27]">
              No current openings match your filter criteria.
            </p>
            <p className="mt-1 text-xs text-[#64736F]">
              Try clearing your search query or selecting &ldquo;All Openings&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDept("All Openings");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] hover:bg-[#D5F9E6]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApplyClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Applying Form Section */}
      <div className="pt-8">
        <CareerApplyForm selectedPosition={selectedPositionForForm} />
      </div>
    </div>
  );
}
