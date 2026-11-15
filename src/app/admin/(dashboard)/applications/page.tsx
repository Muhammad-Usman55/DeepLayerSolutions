"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import type { JobApplicationStatus } from "@/types/supabase";
import { AdminDrawer } from "@/components/admin/AdminDrawer";
import { AdminModal } from "@/components/admin/AdminModal";
import { useAdminToast } from "@/components/admin/AdminToast";

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

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "All Statuses", value: "all" },
  { label: "New", value: "new" },
  { label: "Under Review", value: "under_review" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Interview", value: "interview" },
  { label: "Selected", value: "selected" },
  { label: "Hired", value: "hired" },
  { label: "Rejected", value: "rejected" },
];

export default function AdminApplicationsPage() {
  const toast = useAdminToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Selected for Drawer Detail / Status update
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [newStatus, setNewStatus] = useState<JobApplicationStatus>("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [savingUpdates, setSavingUpdates] = useState(false);

  // Selected for CV Preview Modal
  const [previewCvUrl, setPreviewCvUrl] = useState<string | null>(null);
  const [previewCandidateName, setPreviewCandidateName] = useState("");

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
      toast.error("Failed to load applicant records", "Please check your network connection.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, status, search, toast]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openDetailDrawer = (app: JobApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.admin_notes || "");
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
        setSelectedApp(data.application);
        setApplications((prev) =>
          prev.map((a) => (a.id === data.application.id ? data.application : a))
        );
        toast.success(
          "Status Updated & Candidate Notified",
          `Status changed to "${newStatus.replace("_", " ").toUpperCase()}". Candidate notified via email.`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Status Update Failed", "Could not persist status change.");
    } finally {
      setSavingUpdates(false);
    }
  };

  const handleDeleteApplication = async (app: JobApplication) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete application from candidate "${app.full_name}"?`
      )
    ) {
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
        toast.success("Application Deleted", `Removed candidate ${app.full_name}.`);
      } else {
        toast.error("Deletion Failed", data.message || "Failed to delete application.");
      }
    } catch {
      toast.error("Network Error", "Could not complete deletion.");
    }
  };

  const getStatusBadge = (appStatus: JobApplicationStatus) => {
    switch (appStatus) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>New</span>
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Under Review</span>
          </span>
        );
      case "shortlisted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Shortlisted</span>
          </span>
        );
      case "interview":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Interview</span>
          </span>
        );
      case "selected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>Selected</span>
          </span>
        );
      case "hired":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-800 border border-green-300">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            <span>Hired</span>
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            {appStatus}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Applicant Tracking System (ATS)
            </h1>
          </div>
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
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:border-[#008F53] focus:bg-white transition-all"
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
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-[#DFEDE5] bg-[#FAFCF9] text-[#142A27] focus:outline-none focus:border-[#008F53] focus:bg-white transition-all appearance-none cursor-pointer"
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
                {applications.map((app, idx) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className="hover:bg-[#F6FAF7] transition-colors group"
                  >
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
                      <span className="font-semibold text-[#142A27] block">
                        {app.applied_position}
                      </span>
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
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewCvUrl(app.resume_path);
                            setPreviewCandidateName(app.full_name);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E9FFF2] text-[#008F53] hover:bg-[#008F53] hover:text-white transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Preview CV</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#A0AEA7]">No resume uploaded</span>
                      )}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => openDetailDrawer(app)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#DFEDE5] text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] hover:border-[#008F53] transition-colors cursor-pointer"
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
                  </motion.tr>
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

      {/* Candidate Review Drawer (Slide-in from right) */}
      <AdminDrawer
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? selectedApp.full_name : "Candidate Details"}
        subtitle={selectedApp ? `Applied for ${selectedApp.applied_position}` : undefined}
        width="xl"
        footer={
          selectedApp && (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => handleDeleteApplication(selectedApp)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#64736F] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={savingUpdates}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-2xs"
                >
                  {savingUpdates && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Status</span>
                </button>
              </div>
            </div>
          )
        }
      >
        {selectedApp && (
          <div className="space-y-6 text-xs sm:text-sm text-[#142A27]">
            {/* Candidate Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7FAF8] p-4 rounded-2xl border border-[#DFEDE5]">
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
                  className="text-[#008F53] hover:underline font-medium"
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
                  className="hover:underline font-medium"
                >
                  {selectedApp.phone}
                </a>
              </div>
            </div>

            {/* Resume CTA */}
            <div className="p-4 rounded-2xl bg-[#E9FFF2]/70 border border-[#BCE8CF] flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-[#142A27] text-sm">Resume / CV Document</h4>
                <p className="text-xs text-[#64736F] mt-0.5">
                  Uploaded directly by candidate into Supabase Storage.
                </p>
              </div>
              {selectedApp.resume_path ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewCvUrl(selectedApp.resume_path);
                      setPreviewCandidateName(selectedApp.full_name);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View CV</span>
                  </button>
                  <a
                    href={selectedApp.resume_path}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[#BCE8CF] text-[#008F53] hover:bg-white transition-colors"
                    title="Download CV"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
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

            {/* Pipeline Status Triage */}
            <div className="pt-4 border-t border-[#DFEDE5] space-y-4">
              <h4 className="text-xs font-bold text-[#142A27] uppercase tracking-wider">
                Pipeline Status Triage
              </h4>

              <div>
                <label className="block text-xs font-bold text-[#64736F] mb-1.5">
                  Update Pipeline Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as JobApplicationStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] bg-white text-xs font-semibold text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
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
                  <span>
                    Candidate will automatically receive an official status update email (
                    {selectedApp.email}).
                  </span>
                </p>
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
                  className="w-full p-3 text-xs rounded-xl border border-[#DFEDE5] bg-white text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* CV Preview Modal */}
      <AdminModal
        isOpen={!!previewCvUrl}
        onClose={() => setPreviewCvUrl(null)}
        title={`CV Document — ${previewCandidateName}`}
        description="Inspect submitted candidate credentials and portfolio artifacts."
        maxWidth="4xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <a
              href={previewCvUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#008F53] hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in new tab</span>
            </a>
            <button
              type="button"
              onClick={() => setPreviewCvUrl(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors cursor-pointer"
            >
              Done Reviewing
            </button>
          </div>
        }
      >
        {previewCvUrl && (
          <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-[#DFEDE5] bg-[#F5F8F6] flex items-center justify-center">
            {previewCvUrl.endsWith(".pdf") || previewCvUrl.includes(".pdf") ? (
              <iframe
                src={previewCvUrl}
                title="CV Document Viewer"
                className="w-full h-full border-none"
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <FileCheck className="w-12 h-12 text-[#008F53] mx-auto" />
                <div>
                  <h4 className="font-bold text-[#142A27] text-base">Resume File Attached</h4>
                  <p className="text-xs text-[#64736F] mt-1 max-w-sm mx-auto">
                    This file format is best viewed or downloaded directly.
                  </p>
                </div>
                <a
                  href={previewCvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#008F53] text-white hover:bg-[#007343] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Open Resume</span>
                </a>
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
