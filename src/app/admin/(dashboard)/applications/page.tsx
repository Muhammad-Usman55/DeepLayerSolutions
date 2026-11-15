"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Loader2,
  Calendar,
  Mail,
  User,
  FileText,
  Briefcase,
  Phone,
  Link2,
  ExternalLink,
  Trash2,
} from "lucide-react";
import type { JobApplicationStatus } from "@/types/supabase";

interface JobApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  applied_position: string;
  experience_years: number | null;
  skills: string[] | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  resume_path: string | null;
  cover_letter: string | null;
  status: JobApplicationStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS: Array<{ label: string; value: string; color: string }> = [
  { label: "All Statuses", value: "all", color: "bg-gray-100 text-gray-700" },
  { label: "New", value: "new", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { label: "Under Review", value: "under_review", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { label: "Shortlisted", value: "shortlisted", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { label: "Interview", value: "interview", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { label: "Selected", value: "selected", color: "bg-teal-100 text-teal-800 border-teal-200" },
  { label: "Hired", value: "hired", color: "bg-green-100 text-green-900 border-green-300" },
  { label: "Rejected", value: "rejected", color: "bg-rose-100 text-rose-800 border-rose-200" },
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Selected for Modal Detail / Status update
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [newStatus, setNewStatus] = useState<JobApplicationStatus>("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [savingUpdates, setSavingUpdates] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        status,
        search,
      });

      const res = await fetch(`/api/admin/applications?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();

      if (data.success) {
        setApplications(data.applications || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, status, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openDetailModal = (app: JobApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.admin_notes || "");
    setSaveSuccess(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;

    try {
      setSavingUpdates(true);
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApp.id,
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();

      if (data.success) {
        setSaveSuccess(true);
        setSelectedApp(data.application);
        setApplications((prev) =>
          prev.map((a) => (a.id === data.application.id ? data.application : a))
        );
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingUpdates(false);
    }
  };

  const handleDeleteApplication = async (app: JobApplication) => {
    if (!window.confirm(`Are you sure you want to delete application from candidate "${app.full_name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/applications?id=${app.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== app.id));
        if (selectedApp?.id === app.id) setSelectedApp(null);
      } else {
        alert(data.message || "Failed to delete application.");
      }
    } catch {
      alert("Network error occurred while attempting deletion.");
    }
  };

  const getStatusBadge = (appStatus: JobApplicationStatus) => {
    switch (appStatus) {
      case "new":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">New</span>;
      case "under_review":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Under Review</span>;
      case "shortlisted":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Shortlisted</span>;
      case "interview":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Interview</span>;
      case "selected":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">Selected</span>;
      case "hired":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-300">Hired</span>;
      case "rejected":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">{appStatus}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
            Applicant Tracking System (ATS)
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Review candidate submissions, resume downloads, status triage, and candidate pipelines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF]">
            {totalCount} Total Applicants
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64736F]" />
            <input
              type="text"
              placeholder="Search by candidate name, email, or role..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64736F]" />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#008F53] animate-spin" />
            <p className="text-xs text-[#64736F]">Loading applicant submissions...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center space-y-3 px-4">
            <Briefcase className="w-12 h-12 text-[#A0AEA7] mx-auto" />
            <h3 className="text-sm font-bold text-[#142A27]">No job applications found</h3>
            <p className="text-xs text-[#64736F] max-w-sm mx-auto">
              {search || status !== "all"
                ? "No candidates matched your search or status filter. Try clearing filters."
                : "Candidate submissions through the careers form will appear here with one-click resume access."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DFEDE5] bg-[#FAFCF9] text-[11px] font-bold text-[#64736F] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Candidate</th>
                  <th className="py-3.5 px-4">Role Applied</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4">Resume / CV</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFEDE5] text-xs">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAFCF9] transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-[#142A27]">{app.full_name}</div>
                      <div className="text-[11px] text-[#64736F] flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-[#A0AEA7]" />
                        <span>{app.email}</span>
                      </div>
                      <div className="text-[11px] text-[#64736F] flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-[#A0AEA7]" />
                        <span>{app.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#142A27] block">{app.applied_position}</span>
                      {app.linkedin_url && (
                        <a
                          href={app.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#008F53] hover:underline mt-1"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </td>

                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>

                    <td className="py-4 px-4 text-[#64736F] whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-4">
                      {app.resume_path ? (
                        <a
                          href={app.resume_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E9FFF2] text-[#008F53] hover:bg-[#008F53] hover:text-white transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View CV</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-[#A0AEA7]">No resume uploaded</span>
                      )}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => openDetailModal(app)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#DFEDE5] text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(app)}
                          title="Delete Application"
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && applications.length > 0 && (
          <div className="py-3 px-4 sm:px-6 border-t border-[#DFEDE5] bg-[#FAFCF9] flex items-center justify-between text-xs text-[#64736F]">
            <div>
              Showing page <span className="font-bold text-[#142A27]">{page}</span> of{" "}
              <span className="font-bold text-[#142A27]">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#DFEDE5] bg-white disabled:opacity-40 hover:bg-[#E9FFF2] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded-lg border border-[#DFEDE5] bg-white disabled:opacity-40 hover:bg-[#E9FFF2] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Detail & Triage Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#DFEDE5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#DFEDE5] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[11px] font-bold text-[#008F53] uppercase tracking-wider">
                  Candidate Application
                </span>
                <h3 className="text-xl font-extrabold text-[#142A27]">
                  {selectedApp.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl text-[#64736F] hover:bg-[#FAFCF9] hover:text-[#142A27] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm text-[#142A27]">
              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAFCF9] p-4 rounded-2xl border border-[#DFEDE5]">
                <div>
                  <span className="text-[11px] font-bold text-[#64736F] uppercase block">
                    Target Position
                  </span>
                  <span className="font-bold text-[#008F53] text-sm">
                    {selectedApp.applied_position}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64736F] uppercase block">
                    Submitted At
                  </span>
                  <span>{new Date(selectedApp.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64736F] uppercase block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="text-[#008F53] hover:underline"
                  >
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64736F] uppercase block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {selectedApp.phone}
                  </a>
                </div>
              </div>

              {/* Links & Resume CTA */}
              <div className="p-4 rounded-2xl bg-[#F0FAF4] border border-[#BCE8CF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-[#142A27] text-sm">Resume / CV Document</h4>
                  <p className="text-xs text-[#64736F] mt-0.5">
                    Uploaded directly by the candidate into Supabase Storage.
                  </p>
                </div>
                {selectedApp.resume_path ? (
                  <a
                    href={selectedApp.resume_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download / Open CV</span>
                  </a>
                ) : (
                  <span className="text-xs text-[#64736F]">No file uploaded</span>
                )}
              </div>

              {/* LinkedIn & Portfolio */}
              <div className="flex flex-wrap gap-3">
                {selectedApp.linkedin_url && (
                  <a
                    href={selectedApp.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] hover:bg-white text-xs font-semibold text-[#142A27]"
                  >
                    <Link2 className="w-3.5 h-3.5 text-[#008F53]" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#64736F]" />
                  </a>
                )}
                {selectedApp.portfolio_url && (
                  <a
                    href={selectedApp.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] hover:bg-white text-xs font-semibold text-[#142A27]"
                  >
                    <Link2 className="w-3.5 h-3.5 text-[#008F53]" />
                    <span>Portfolio / GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#64736F]" />
                  </a>
                )}
              </div>

              {/* Cover Letter */}
              {selectedApp.cover_letter && (
                <div>
                  <h4 className="text-xs font-bold text-[#64736F] uppercase tracking-wider mb-2">
                    Cover Note / Ambition
                  </h4>
                  <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] whitespace-pre-wrap text-xs leading-relaxed text-[#142A27]">
                    {selectedApp.cover_letter}
                  </div>
                </div>
              )}

              {/* Status & Admin Notes Triage */}
              <div className="pt-4 border-t border-[#DFEDE5] space-y-4">
                <h4 className="text-xs font-bold text-[#142A27] uppercase tracking-wider">
                  Recruitment Status Triage
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#64736F] mb-1.5">
                      Pipeline Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as JobApplicationStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-xs font-semibold text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                    >
                      <option value="new">New</option>
                      <option value="under_review">Under Review</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="selected">Selected</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <p className="text-[11px] text-[#008F53] mt-1.5 flex items-center gap-1 font-medium">
                      <Mail className="w-3 h-3" />
                      <span>Candidate will automatically receive an official status update email ({selectedApp.email}).</span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64736F] mb-1.5">
                    Internal Interview Notes &amp; Feedback
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add interview assessment notes, evaluation feedback, or next steps..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#DFEDE5] bg-[#FAFCF9] flex items-center justify-between sticky bottom-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => selectedApp && handleDeleteApplication(selectedApp)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Candidate</span>
                </button>
                {saveSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Application updated &amp; candidate notified via email!</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#64736F] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={savingUpdates}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {savingUpdates && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
