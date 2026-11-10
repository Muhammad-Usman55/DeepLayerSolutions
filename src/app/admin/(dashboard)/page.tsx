"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Sparkles,
  Clock,
  CheckCircle2,
  Users,
  Send,
  ArrowRight,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface OverviewData {
  stats: {
    inquiries: {
      total: number;
      new: number;
      inProgress: number;
      completed: number;
      spam: number;
    };
    subscribers: {
      total: number;
      active: number;
      pending: number;
      unsubscribed: number;
    };
    emails: {
      total: number;
      sent: number;
      failed: number;
    };
  };
  recentInquiries: Array<{
    id: string;
    reference_number: string;
    full_name: string;
    email: string;
    service: string | null;
    status: string;
    created_at: string;
  }>;
  recentEmails: Array<{
    id: string;
    recipient: string;
    email_type: string;
    status: string;
    created_at: string;
    error_message: string | null;
  }>;
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/overview");
      if (!res.ok) throw new Error("Failed to load dashboard overview.");
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        throw new Error(json.message || "Failed to load data.");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred while loading overview.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Real-time telemetry, enterprise inquiries, and audience subscription metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOverview}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-50 text-[#142A27] border border-[#DFEDE5] shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#008F53]" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      {loading && !data ? (
        <div className="bg-white border border-[#DFEDE5] rounded-3xl p-16 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-[#008F53] animate-spin mb-3" />
          <p className="text-sm font-semibold text-[#142A27]">Loading metrics...</p>
        </div>
      ) : data ? (
        <>
          {/* Main 5 Primary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Inquiries */}
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between text-[#64736F] mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Inquiries</span>
                <div className="w-8 h-8 rounded-lg bg-[#F8FBFA] border border-[#DFEDE5] flex items-center justify-center text-[#142A27]">
                  <Inbox className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
                {data.stats.inquiries.total}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1.5">
                Lifetime customer leads
              </p>
            </div>

            {/* Card 2: New Inquiries */}
            <div className="bg-white border border-emerald-200 bg-gradient-to-br from-white to-[#E9FFF2]/30 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between text-[#008F53] mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">New Inquiries</span>
                <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] border border-[#BCE8CF] flex items-center justify-center text-[#008F53]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#008F53]">
                {data.stats.inquiries.new}
              </div>
              <p className="text-[11px] text-[#008F53] font-medium mt-1.5">
                Awaiting initial triage
              </p>
            </div>

            {/* Card 3: In-Progress */}
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between text-[#64736F] mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
                {data.stats.inquiries.inProgress}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1.5">
                In review &amp; contacted
              </p>
            </div>

            {/* Card 4: Completed */}
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between text-[#64736F] mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
                <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] border border-[#BCE8CF] text-[#008F53] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
                {data.stats.inquiries.completed}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1.5">
                Closed / contract initiated
              </p>
            </div>

            {/* Card 5: Active Subscribers */}
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between text-[#64736F] mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Subscribers</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
                {data.stats.subscribers.active}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1.5">
                Confirmed double opt-in
              </p>
            </div>
          </div>

          {/* Secondary Telemetry Strip */}
          <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#64736F]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#142A27]">Transactional Delivery:</span>
              <span className="inline-flex items-center gap-1 text-[#008F53] bg-[#E9FFF2] px-2 py-0.5 rounded font-bold">
                {data.stats.emails.sent} Sent
              </span>
              {data.stats.emails.failed > 0 && (
                <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
                  {data.stats.emails.failed} Failed
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span>
                Pending Confirmation: <strong className="text-[#142A27]">{data.stats.subscribers.pending}</strong>
              </span>
              <span>
                Unsubscribed: <strong className="text-[#142A27]">{data.stats.subscribers.unsubscribed}</strong>
              </span>
            </div>
          </div>

          {/* Two-Column Activity Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Recent Inquiries */}
            <div className="lg:col-span-7 bg-white border border-[#DFEDE5] rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#142A27] flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#008F53]" />
                    <span>Recent Inquiries</span>
                  </h2>
                  <Link
                    href="/admin/inquiries"
                    className="text-xs font-semibold text-[#008F53] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {data.recentInquiries.length === 0 ? (
                  <p className="text-xs text-[#64736F] py-8 text-center">No inquiries received yet.</p>
                ) : (
                  <div className="divide-y divide-[#DFEDE5] overflow-x-auto">
                    {data.recentInquiries.map((inq) => (
                      <div key={inq.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#142A27]">{inq.reference_number}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                inq.status === "new"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : inq.status === "in_review"
                                  ? "bg-amber-100 text-amber-800"
                                  : inq.status === "contacted"
                                  ? "bg-blue-100 text-blue-800"
                                  : inq.status === "closed"
                                  ? "bg-neutral-100 text-neutral-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-[#142A27] font-semibold truncate mt-0.5">{inq.full_name}</p>
                          <p className="text-[#64736F] truncate">{inq.email}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[#64736F]">{new Date(inq.created_at).toLocaleDateString()}</p>
                          <p className="text-[11px] text-[#008F53] font-medium truncate max-w-[120px]">
                            {inq.service || "General"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Recent Email Audit Trail */}
            <div className="lg:col-span-5 bg-white border border-[#DFEDE5] rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#142A27] flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#008F53]" />
                    <span>Outbound Dispatch Audit</span>
                  </h2>
                  <Link
                    href="/admin/emails"
                    className="text-xs font-semibold text-[#008F53] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {data.recentEmails.length === 0 ? (
                  <p className="text-xs text-[#64736F] py-8 text-center">No transactional emails logged yet.</p>
                ) : (
                  <div className="divide-y divide-[#DFEDE5]">
                    {data.recentEmails.map((em) => (
                      <div key={em.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#142A27] truncate">{em.recipient}</p>
                          <p className="text-[11px] text-[#64736F] truncate">{em.email_type}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              em.status === "sent"
                                ? "bg-emerald-100 text-emerald-800"
                                : em.status === "failed"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-neutral-100 text-neutral-700"
                            }`}
                          >
                            {em.status}
                          </span>
                          <p className="text-[10px] text-[#64736F] mt-0.5">
                            {new Date(em.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

