"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Users,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Clock,
  UserX,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  status: "pending" | "active" | "unsubscribed";
  subscribed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        status,
        search,
      });

      const res = await fetch(`/api/admin/subscribers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load subscribers");
      const data = await res.json();

      if (data.success) {
        setSubscribers(data.subscribers);
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
    fetchSubscribers();
  }, [fetchSubscribers]);

  return (
    <div className="space-y-6">
      {/* Title & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Audience subscription registry, double opt-in confirmation states, and unsubscribe audit trails.
          </p>
        </div>

        <a
          href="/api/admin/subscribers/export"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-[#DFEDE5] text-[#142A27] text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#008F53]" />
          <span>Export Authorized CSV</span>
        </a>
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
            placeholder="Search by subscriber email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs sm:text-sm text-[#142A27] placeholder:text-[#64736F]/60 focus:outline-none focus:border-[#00B86B]"
          />
        </div>

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
            <option value="all">All States</option>
            <option value="active">Active (Confirmed)</option>
            <option value="pending">Pending (Unconfirmed)</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFCF9] border-b border-[#DFEDE5] text-[#64736F] font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Subscriber Email</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Subscribed At</th>
                <th className="py-3.5 px-4">Unsubscribed At</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Requested Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64736F]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#008F53]" />
                    <span>Loading subscriber registry...</span>
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64736F]">
                    No subscribers found matching your criteria.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#FAFCF9]/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#142A27]">
                      {sub.email}
                    </td>
                    <td className="py-3.5 px-4">
                      {sub.status === "active" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      )}
                      {sub.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3" />
                          <span>Pending Opt-In</span>
                        </span>
                      )}
                      {sub.status === "unsubscribed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-150 text-neutral-600">
                          <UserX className="w-3 h-3" />
                          <span>Unsubscribed</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#64736F] whitespace-nowrap">
                      {sub.subscribed_at ? new Date(sub.subscribed_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-[#64736F] whitespace-nowrap">
                      {sub.unsubscribed_at ? new Date(sub.unsubscribed_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right text-[#64736F] whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString()}
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
    </div>
  );
}

