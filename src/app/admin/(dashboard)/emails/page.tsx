"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Send,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  ShieldAlert,
  Info,
} from "lucide-react";

interface EmailLog {
  id: string;
  recipient: string;
  email_type: string;
  related_record_id: string | null;
  provider_message_id: string | null;
  status: "queued" | "sent" | "delivered" | "failed" | "bounced";
  error_message: string | null;
  created_at: string;
}

export default function AdminEmailsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Error inspection modal
  const [selectedErrorLog, setSelectedErrorLog] = useState<EmailLog | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        status,
        type,
        search,
      });

      const res = await fetch(`/api/admin/emails?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load email logs");
      const data = await res.json();

      if (data.success) {
        setLogs(data.emailLogs);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalCount(data.pagination.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, status, type, search]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
          Email Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-[#64736F] mt-1">
          Complete delivery audit trail for Resend transactional dispatches, customer confirmations, and alerts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by recipient email address..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs sm:text-sm text-[#142A27] placeholder:text-[#64736F]/60 focus:outline-none focus:border-[#00B86B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-[#64736F]" />
          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs font-semibold text-[#142A27] focus:outline-none focus:border-[#00B86B] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
            <option value="delivered">Delivered</option>
            <option value="queued">Queued</option>
            <option value="bounced">Bounced</option>
          </select>

          {/* Type filter */}
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs font-semibold text-[#142A27] focus:outline-none focus:border-[#00B86B] cursor-pointer"
          >
            <option value="all">All Email Types</option>
            <option value="contact_notification">Company Notification</option>
            <option value="contact_autoresponder">Inquiry Confirmation</option>
            <option value="newsletter_confirmation">Newsletter Double Opt-In</option>
            <option value="newsletter_welcome">Newsletter Welcome</option>
            <option value="system_alert">System Alert</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFCF9] border-b border-[#DFEDE5] text-[#64736F] font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Recipient</th>
                <th className="py-3.5 px-4">Email Category</th>
                <th className="py-3.5 px-4">Delivery Status</th>
                <th className="py-3.5 px-4">Provider Message ID</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#008F53]" />
                    <span>Loading email logs...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    No email audit records match your search criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAFCF9]/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#142A27]">
                      {log.recipient}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs text-[#64736F] bg-[#FAFCF9] border border-[#DFEDE5] px-2 py-0.5 rounded">
                        {log.email_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {log.status === "sent" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sent</span>
                        </span>
                      )}
                      {log.status === "failed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Failed</span>
                        </span>
                      )}
                      {log.status !== "sent" && log.status !== "failed" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700">
                          {log.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#64736F]">
                      {log.provider_message_id ? (
                        <span className="truncate max-w-[150px] inline-block">{log.provider_message_id}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#64736F] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      {log.error_message ? (
                        <button
                          type="button"
                          onClick={() => setSelectedErrorLog(log)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <Info className="w-3 h-3" />
                          <span>Error Info</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[#64736F]">Normal</span>
                      )}
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

      {/* Safe Error Details Modal */}
      {selectedErrorLog && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
        >
          <div className="relative w-full max-w-lg bg-white border border-rose-200 rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                <ShieldAlert className="w-5 h-5" />
                <span>Delivery Diagnostic Information</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedErrorLog(null)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#64736F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm">
              <div className="bg-[#FAFCF9] border border-[#DFEDE5] rounded-xl p-3">
                <p className="text-xs text-[#64736F]">Recipient: <strong className="text-[#142A27]">{selectedErrorLog.recipient}</strong></p>
                <p className="text-xs text-[#64736F] mt-1">Dispatch Type: <strong className="text-[#142A27]">{selectedErrorLog.email_type}</strong></p>
                <p className="text-xs text-[#64736F] mt-1">Logged At: <strong className="text-[#142A27]">{new Date(selectedErrorLog.created_at).toLocaleString()}</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                  Safe Error Output (Sanitized)
                </label>
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
                  {selectedErrorLog.error_message || "No specific error message was captured."}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
                <strong>Security Guarantee:</strong> All internal API keys, Bearer headers, and provider secrets are scrubbed before logging and display.
              </div>
            </div>

            <div className="pt-3 border-t border-[#DFEDE5] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedErrorLog(null)}
                className="px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
