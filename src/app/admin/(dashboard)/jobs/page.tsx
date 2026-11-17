"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit2,
  FileText,
} from "lucide-react";

interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  duration?: string;
  stipend?: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: "published" | "draft" | "closed";
  applicantStats: {
    total: number;
    new: number;
    shortlisted: number;
  };
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  // Job Details Drawer / Modal
  const [viewingJob, setViewingJob] = useState<JobOpening | null>(null);

  // New Job Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Engineering & AI");
  const [newType, setNewType] = useState("Internship");
  const [newLocation, setNewLocation] = useState("Remote (Global / Pakistan)");
  const [newDuration, setNewDuration] = useState("3 – 6 Months");
  const [newStipend, setNewStipend] = useState("Competitive Paid Stipend + Fast-Track Offer");
  const [newDesc, setNewDesc] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit Job Modal
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDept, setEditDept] = useState("");
  const [editType, setEditType] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editStipend, setEditStipend] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState<"published" | "draft" | "closed">("published");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (res.ok && data.success) {
        setJobs(data.jobs || []);
      } else {
        setError(data.message || "Failed to load jobs.");
      }
    } catch {
      setError("Network error while connecting to jobs service.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "all" || job.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicantStats?.total || 0), 0);
  const totalNewApplicants = jobs.reduce((sum, j) => sum + (j.applicantStats?.new || 0), 0);

  // CREATE JOB SUBMIT
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setFormError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          department: newDept,
          type: newType,
          location: newLocation,
          duration: newDuration,
          stipend: newStipend,
          shortDescription: newDesc || "Newly provisioned vacancy.",
          description: newDesc,
          status: "published",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsCreateOpen(false);
        setNewTitle("");
        setNewDesc("");
        setSuccessMsg(`Vacancy "${newTitle}" created successfully.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchJobs();
      } else {
        setFormError(data.message || "Failed to create vacancy.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  // OPEN EDIT MODAL
  const handleOpenEdit = (job: JobOpening) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditDept(job.department);
    setEditType(job.type);
    setEditLocation(job.location);
    setEditDuration(job.duration || "3 – 6 Months");
    setEditStipend(job.stipend || "Competitive Paid Stipend");
    setEditDesc(job.description || job.shortDescription);
    setEditStatus(job.status || "published");
    setFormError("");
  };

  // EDIT JOB SUBMIT
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    setFormError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingJob.id,
          title: editTitle,
          department: editDept,
          type: editType,
          location: editLocation,
          duration: editDuration,
          stipend: editStipend,
          shortDescription: editDesc,
          description: editDesc,
          status: editStatus,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEditingJob(null);
        setSuccessMsg(`Vacancy "${editTitle}" updated successfully.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchJobs();
      } else {
        setFormError(data.message || "Failed to update vacancy.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  // DELETE JOB
  const handleDeleteJob = async (job: JobOpening) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete vacancy: "${job.title}"?\n\nThis will remove it from the careers portal.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(job.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Vacancy "${job.title}" deleted successfully.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        setJobs((prev) => prev.filter((j) => j.id !== job.id && j.slug !== job.slug));
        if (viewingJob?.id === job.id) setViewingJob(null);
        if (editingJob?.id === job.id) setEditingJob(null);
        fetchJobs();
      } else {
        alert(data.message || "Failed to delete vacancy.");
      }
    } catch {
      alert("Network error occurred while attempting deletion.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Job Vacancy Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              ATS Integrated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Publish, edit, delete, and track applicant volume for open engineering and leadership roles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#DFEDE5] bg-white text-[#142A27] text-xs font-semibold hover:bg-neutral-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#008F53]" />
            <span>Public Portal</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setFormError("");
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Published Roles
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {jobs.length}
          </div>
          <span className="text-[11px] text-[#64736F]">Active in careers catalog</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Total Applicants
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {totalApplicants}
          </div>
          <span className="text-[11px] text-[#64736F]">{totalNewApplicants} pending triage</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Active Departments
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {departments.length}
          </div>
          <span className="text-[11px] text-[#64736F]">Engineering, Growth &amp; Sales</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFCF9]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DFEDE5] bg-white text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] cursor-pointer"
          >
            <option value="all">All Departments ({jobs.length})</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={fetchJobs}
            className="p-2 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors shrink-0 cursor-pointer"
            title="Refresh vacancies"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-16 text-center text-[#64736F]">
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#008F53] animate-spin" />
            <span className="text-xs">Loading vacancy catalog and applicant counts...</span>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-16 text-center bg-white border border-[#DFEDE5] rounded-3xl p-8 text-[#64736F]">
          No vacancies match your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const isClosed = job.status === "closed";
            const isDraft = job.status === "draft";

            return (
              <div
                key={job.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DFEDE5] hover:border-[#008F53]/40 transition-all shadow-2xs flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
                      {job.department}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md border capitalize ${
                        isClosed
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : isDraft
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isClosed ? "bg-rose-500" : isDraft ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                      />
                      <span>{job.status || "published"}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#142A27] tracking-tight">
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#64736F] mt-1 line-clamp-2 leading-relaxed">
                    {job.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] text-[#64736F]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#008F53]" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#008F53]" />
                      <span>{job.duration || job.type}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Bar: Applicants & Actions (Edit & Delete) */}
                <div className="pt-4 border-t border-[#DFEDE5] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center font-bold text-xs">
                      {job.applicantStats?.total || 0}
                    </div>
                    <div className="text-[11px] leading-tight">
                      <div className="font-bold text-[#142A27]">
                        {job.applicantStats?.total || 0} Applicants
                      </div>
                      {(job.applicantStats?.new || 0) > 0 && (
                        <span className="text-emerald-600 font-semibold">
                          {job.applicantStats.new} new
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Details button */}
                    <button
                      type="button"
                      onClick={() => setViewingJob(job)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
                      title="Inspect job scope and requirements"
                    >
                      Details
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(job)}
                      className="p-1.5 rounded-xl border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
                      title="Edit job vacancy"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job)}
                      className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete job vacancy"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* ATS Candidates link */}
                    <Link
                      href="/admin/applications"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer ml-1"
                    >
                      <span>ATS</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* JOB DETAILS MODAL */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#DFEDE5]">
              <div>
                <span className="text-[10px] font-bold text-[#008F53] uppercase tracking-wider">
                  {viewingJob.department} • {viewingJob.type}
                </span>
                <h3 className="text-lg font-bold text-[#142A27]">
                  {viewingJob.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingJob(null)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#142A27]">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64736F] mb-1">
                  Role Overview
                </h4>
                <p className="leading-relaxed text-[#64736F]">{viewingJob.description}</p>
              </div>

              {viewingJob.responsibilities?.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64736F] mb-1.5">
                    Key Responsibilities
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[#64736F]">
                    {viewingJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {viewingJob.requirements?.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64736F] mb-1.5">
                    Candidate Requirements
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[#64736F]">
                    {viewingJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#142A27]">Compensation / Perks</div>
                  <div className="text-[11px] text-[#64736F]">{viewingJob.stipend}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const j = viewingJob;
                      setViewingJob(null);
                      handleOpenEdit(j);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-[#DFEDE5] text-xs font-semibold hover:bg-neutral-100"
                  >
                    Edit Vacancy
                  </button>
                  <Link
                    href="/admin/applications"
                    className="px-3.5 py-2 rounded-xl bg-[#008F53] text-white font-semibold text-xs hover:bg-[#007443] transition-colors"
                  >
                    Go to ATS Candidates →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE JOB MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5]">
              <h3 className="text-base font-bold text-[#142A27]">
                Post New Remote Vacancy
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Vacancy Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior AI Research Engineer"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Department
                  </label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer"
                  >
                    <option value="Engineering & AI">Engineering &amp; AI</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Growth & Marketing">Growth &amp; Marketing</option>
                    <option value="Business & Sales">Business &amp; Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Employment Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Stipend / Compensation
                </label>
                <input
                  type="text"
                  value={newStipend}
                  onChange={(e) => setNewStipend(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline responsibilities, tech stack, and goals..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#DFEDE5]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#64736F] hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? "Publishing..." : "Publish Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT JOB MODAL */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5]">
              <h3 className="text-base font-bold text-[#142A27]">
                Edit Vacancy: {editingJob.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Vacancy Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Department
                  </label>
                  <select
                    value={editDept}
                    onChange={(e) => setEditDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer"
                  >
                    <option value="Engineering & AI">Engineering &amp; AI</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Growth & Marketing">Growth &amp; Marketing</option>
                    <option value="Business & Sales">Business &amp; Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Vacancy Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer font-bold"
                  >
                    <option value="published">Published (Visible to candidates)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="closed">Closed (Applications blocked)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142A27] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Stipend / Compensation
                </label>
                <input
                  type="text"
                  value={editStipend}
                  onChange={(e) => setEditStipend(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#DFEDE5]">
                <button
                  type="button"
                  onClick={() => {
                    const j = editingJob;
                    setEditingJob(null);
                    handleDeleteJob(j);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Vacancy</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingJob(null)}
                    className="px-4 py-2 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#64736F] hover:bg-neutral-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {formLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
