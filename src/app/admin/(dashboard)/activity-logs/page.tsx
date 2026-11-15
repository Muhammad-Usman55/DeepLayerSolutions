"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Shield,
  Search,
  RefreshCw,
  Lock,
  Users,
  Inbox,
  Mail,
  AlertCircle,
  Clock,
  Eye,
  Filter,
} from "lucide-react";

interface ActivityLog {
  id: string;
  action: string;
  adminEmail: string;
  entityType: "auth" | "ats" | "inquiry" | "email";
  details: string;
  createdAt: string;
  ipAddress: string;
}

const ACTION_STYLES: Record<string, string> = {
  admin_login: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  application_submitted: "bg-indigo-500/10 text-indigo-700 border-indigo-500/30",
  application_shortlisted: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  inquiry_received: "bg-teal-500/10 text-teal-700 border-teal-500/30",
  email_dispatched: "bg-purple-500/10 text-purple-700 border-purple-500/30",
  email_failed: "bg-rose-500/10 text-rose-700 border-rose-500/30",
};

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/activity-logs");
      const json = await res.json();
      if (res.ok && json.success) {
        setLogs(json.logs || []);
      } else {
        setError(json.message || "Failed to load activity logs.");
      }
    } catch {
      setError("Network error while connecting to audit service.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(q) ||
      log.adminEmail.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q);
    const matchesEntity = entityFilter === "all" || log.entityType === entityFilter;
    return matchesSearch && matchesEntity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Security &amp; Operational Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              Real-Time
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Immutable log of administrative logins, candidate pipeline updates, customer triage, and dispatch events.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLogs}
          disabled={loading}
          className="p-2.5 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh audit stream"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Total Audited Events
          </span>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {logs.length}
          </div>
          <span className="text-[11px] text-[#64736F]">Recorded in recent cycle</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Monitored Subsystems
          </span>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            4 Services
          </div>
          <span className="text-[11px] text-[#64736F]">Auth, ATS, Inquiries &amp; Emails</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
            Integrity Status
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span>Compliant</span>
          </div>
          <span className="text-[11px] text-[#64736F]">Zero unauthenticated anomalies</span>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[#DFEDE5] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFCF9]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by action, actor, or detail..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DFEDE5] bg-white text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] cursor-pointer"
            >
              <option value="all">All Subsystems</option>
              <option value="auth">Authentication &amp; Security</option>
              <option value="ats">ATS / Job Applications</option>
              <option value="inquiry">Client Inquiries</option>
              <option value="email">Email Dispatches</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DFEDE5] bg-[#FAFCF9] text-[11px] font-bold text-[#64736F] uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor / Subsystem</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Origin Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5] text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64736F]">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-[#008F53] animate-spin" />
                      <span>Loading audit trail...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64736F]">
                    No audit records match your active query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const style = ACTION_STYLES[log.action] || "bg-neutral-100 text-neutral-700 border-neutral-300";

                  return (
                    <tr key={log.id} className="hover:bg-[#FAFCF9] transition-colors">
                      {/* Timestamp */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64736F] whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${style}`}>
                          {log.action.replace(/_/g, " ")}
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="py-3.5 px-4 font-semibold text-[#142A27] whitespace-nowrap">
                        {log.adminEmail}
                      </td>

                      {/* Details */}
                      <td className="py-3.5 px-4 text-[#64736F] leading-relaxed max-w-md">
                        {log.details}
                      </td>

                      {/* Origin Channel */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#A0AEA7] whitespace-nowrap">
                        {log.ipAddress}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
