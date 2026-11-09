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
  Building2,
  Mail,
  User,
  MessageSquare,
  FileText,
} from "lucide-react";
import type { ContactSubmissionStatus } from "@/types/supabase";

interface Inquiry {
  id: string;
  reference_number: string;
  full_name: string;
  email: string;
  company: string | null;
  service: string | null;
  subject: string;
  message: string;
  status: ContactSubmissionStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "All Statuses", value: "all" },
  { label: "New", value: "new" },
  { label: "In Review", value: "in_review" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
  { label: "Spam", value: "spam" },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Selected Inquiry for Modal View & Triage
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [newStatus, setNewStatus] = useState<ContactSubmissionStatus>("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [savingUpdates, setSavingUpdates] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        status,
        search,
      });

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      const data = await res.json();

      if (data.success) {
        setInquiries(data.inquiries);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalCount(data.pagination.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, status, search]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const openDetailModal = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNewStatus(inq.status);
    setAdminNotes(inq.admin_notes || "");
    setSaveSuccess(false);
  };

  const handleSaveInquiryUpdates = async () => {
    if (!selectedInquiry) return;

    try {
      setSavingUpdates(true);
      setSaveSuccess(false);

      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSaveSuccess(true);
        setSelectedInquiry(json.inquiry);
        // Refresh inquiries list
        setInquiries((prev) =>
          prev.map((item) => (item.id === json.inquiry.id ? json.inquiry : item))
        );
      } else {
        alert(json.message || "Failed to update inquiry.");
      }
    } catch {
      alert("Error saving inquiry updates.");
    } finally {
      setSavingUpdates(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            Contact Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Manage incoming enterprise project requests, system scope briefs, and triage notes.
          </p>
        </div>

        <a
          href="/api/admin/inquiries/export"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-[#DFEDE5] text-[#142A27] text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#008F53]" />
          <span>Export Authorized CSV</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, or reference number (e.g. DLS-2026-)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs sm:text-sm text-[#142A27] placeholder:text-[#64736F]/60 focus:outline-none focus:border-[#00B86B]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-[#64736F]" />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs font-semibold text-[#142A27] focus:outline-none focus:border-[#00B86B] cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFCF9] border-b border-[#DFEDE5] text-[#64736F] font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Reference ID</th>
                <th className="py-3.5 px-4">Visitor</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#008F53]" />
                    <span>Loading inquiries...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    No inquiries match your current filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAFCF9]/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#142A27]">
                      {inq.reference_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#142A27]">{inq.full_name}</div>
                      <div className="text-xs text-[#64736F]">{inq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#142A27]">
                      {inq.service || <span className="text-[#64736F]">General</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "new"
                            ? "bg-emerald-100 text-emerald-800"
                            : inq.status === "in_review"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : inq.status === "closed"
                            ? "bg-neutral-100 text-neutral-700"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#64736F] whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        type="button"
                        onClick={() => openDetailModal(inq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E9FFF2] text-[#008F53] hover:bg-[#D5F9E6] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#DFEDE5] bg-[#FAFCF9] flex items-center justify-between text-xs text-[#64736F]">
          <span>
            Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> ({totalCount} total)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-[#DFEDE5] bg-white hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-[#DFEDE5] bg-white hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail & Triage Modal */}
      {selectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
        >
          <div className="relative w-full max-w-2xl bg-white border border-[#DFEDE5] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFEDE5] bg-[#FAFCF9]">
              <div>
                <span className="text-[11px] font-bold text-[#008F53] uppercase tracking-wider">
                  Inquiry Triage Detail
                </span>
                <h2 className="text-lg font-bold font-mono text-[#142A27]">
                  {selectedInquiry.reference_number}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full hover:bg-neutral-200/60 flex items-center justify-center text-[#64736F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#F8FBFA] border border-[#DFEDE5] rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#64736F]">
                  <User className="w-4 h-4 text-[#008F53]" />
                  <span>
                    Name: <strong className="text-[#142A27]">{selectedInquiry.full_name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#64736F]">
                  <Mail className="w-4 h-4 text-[#008F53]" />
                  <span>
                    Email: <strong className="text-[#142A27]">{selectedInquiry.email}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#64736F]">
                  <Building2 className="w-4 h-4 text-[#008F53]" />
                  <span>
                    Company: <strong className="text-[#142A27]">{selectedInquiry.company || "None specified"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#64736F]">
                  <Calendar className="w-4 h-4 text-[#008F53]" />
                  <span>
                    Received:{" "}
                    <strong className="text-[#142A27]">
                      {new Date(selectedInquiry.created_at).toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Subject & Service */}
              <div>
                <div className="text-xs font-semibold text-[#64736F] uppercase tracking-wider mb-1">
                  Subject &bull; Service Requested
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DFEDE5] font-semibold text-[#142A27]">
                  {selectedInquiry.subject}
                  <span className="ml-2 text-xs font-normal text-[#008F53] bg-[#E9FFF2] px-2 py-0.5 rounded">
                    {selectedInquiry.service || "General Inquiry"}
                  </span>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <div className="text-xs font-semibold text-[#64736F] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#008F53]" />
                  <span>Project Description</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-[#142A27] leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Triage Status & Private Notes */}
              <div className="pt-2 border-t border-[#DFEDE5] space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#142A27] uppercase tracking-wider mb-1.5">
                    Update Workflow Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ContactSubmissionStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs sm:text-sm font-semibold text-[#142A27] focus:outline-none focus:border-[#00B86B]"
                  >
                    <option value="new">New (Awaiting Review)</option>
                    <option value="in_review">In Review (Architecture Team Assessing)</option>
                    <option value="contacted">Contacted (Outreach in Progress)</option>
                    <option value="closed">Closed (Engaged / Resolved)</option>
                    <option value="spam">Spam (Automated / Junk)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142A27] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#008F53]" />
                    <span>Private Admin Notes (Confidential)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add private technical assessment, estimated sprint budget, or internal follow-up notes..."
                    className="w-full p-3 rounded-xl bg-white border border-[#DFEDE5] text-xs sm:text-sm text-[#142A27] placeholder:text-[#64736F]/60 focus:outline-none focus:border-[#00B86B]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#DFEDE5] bg-[#FAFCF9] flex items-center justify-between">
              <div>
                {saveSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#008F53]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Inquiry updated successfully</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs font-semibold text-[#142A27] hover:bg-neutral-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveInquiryUpdates}
                  disabled={savingUpdates}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingUpdates ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Triage Notes</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

