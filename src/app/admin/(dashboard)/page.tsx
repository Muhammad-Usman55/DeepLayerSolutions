"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Globe,
  Users,
  Briefcase,
  Inbox,
  Mail,
  TrendingUp,
  Eye,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface OverviewState {
  filter: string;
  stats: {
    website: {
      totalVisitors: number;
      uniqueVisitors: number;
      todayVisitors: number;
      totalPageViews: number;
    };
    recruitment: {
      activeJobs: number;
      totalJobs: number;
      totalApplications: number;
      newApplications: number;
      shortlistedCandidates: number;
    };
    business: {
      totalInquiries: number;
      unreadInquiries: number;
      inProgressInquiries: number;
      totalSubscribers: number;
      activeSubscribers: number;
      totalEmails: number;
      sentEmails: number;
    };
  };
  charts: {
    traffic: Array<{ date: string; pageViews: number; visitors: number }>;
    applications: Array<{ date: string; count: number }>;
    applicationStatus: Array<{ status: string; label: string; count: number }>;
    popularPages: Array<{ path: string; views: number; title: string }>;
    popularJobs: Array<{ title: string; department: string; views: number; applications: number }>;
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
  const [data, setData] = useState<OverviewState | null>(null);
  const [filter, setFilter] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverview = useCallback(async (activeFilter = filter) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/admin/overview?filter=${activeFilter}`);
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
  }, [filter]);

  useEffect(() => {
    fetchOverview(filter);
  }, [fetchOverview, filter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    fetchOverview(newFilter);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner & Date Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFEDE5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Executive Performance Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#64736F] mt-0.5">
            Real-time business telemetry, recruitment pipeline, and visitor analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#DFEDE5] text-xs font-semibold shadow-2xs">
            {[
              { id: "today", label: "Today" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
              { id: "90d", label: "90 Days" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#008F53] text-white shadow-2xs font-bold"
                    : "text-[#64736F] hover:text-[#142A27]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fetchOverview(filter)}
            disabled={loading}
            className="p-2 rounded-xl bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27] transition-all cursor-pointer shadow-2xs disabled:opacity-50"
            title="Refresh dashboard data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#008F53]" : ""}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error loading live telemetry</p>
            <p className="text-rose-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* SECTION 1: WEBSITE OVERVIEW CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#008F53]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142A27]">
              Website Traffic & Audience
            </h3>
          </div>
          <Link
            href="/admin/analytics"
            className="text-xs font-semibold text-[#008F53] hover:underline inline-flex items-center gap-1"
          >
            <span>Detailed Analytics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64736F]">Total Visitors</span>
              <Eye className="w-4 h-4 text-[#008F53]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
              {loading ? "..." : (data?.stats.website.totalVisitors || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-[#64736F] mt-1">Verified browser sessions</p>
          </div>

          <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64736F]">Unique Visitors</span>
              <Users className="w-4 h-4 text-[#00B86B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
              {loading ? "..." : (data?.stats.website.uniqueVisitors || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-[#64736F] mt-1">Anonymized device identifiers</p>
          </div>

          <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64736F]">Today&apos;s Visitors</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
              {loading ? "..." : (data?.stats.website.todayVisitors || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-[#64736F] mt-1">Since 00:00 UTC</p>
          </div>

          <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64736F]">Total Page Views</span>
              <Globe className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27]">
              {loading ? "..." : (data?.stats.website.totalPageViews || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-[#64736F] mt-1">Cumulative route transitions</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: RECRUITMENT & BUSINESS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Pipeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#008F53]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142A27]">
                Recruitment & ATS Pipeline
              </h3>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-[#008F53] hover:underline inline-flex items-center gap-1"
            >
              <span>View Candidates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Active Jobs</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                {loading ? "..." : data?.stats.recruitment.activeJobs || 0}
              </div>
              <p className="text-[11px] text-[#008F53] font-semibold mt-1">Published on Careers</p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Total Applications</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                {loading ? "..." : data?.stats.recruitment.totalApplications || 0}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1">All-time candidates</p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">New Applications</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
                {loading ? "..." : data?.stats.recruitment.newApplications || 0}
              </div>
              <p className="text-[11px] text-amber-700 font-semibold mt-1">Pending initial review</p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Shortlisted</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#008F53] mt-1">
                {loading ? "..." : data?.stats.recruitment.shortlistedCandidates || 0}
              </div>
              <p className="text-[11px] text-[#008F53] font-semibold mt-1">Interview ready</p>
            </div>
          </div>
        </div>

        {/* Business & Growth */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#008F53]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142A27]">
                Business Inquiries & Newsletter
              </h3>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-[#008F53] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Inquiries</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Client Inquiries</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                {loading ? "..." : data?.stats.business.totalInquiries || 0}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1">Enterprise requests</p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Unread Inquiries</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">
                {loading ? "..." : data?.stats.business.unreadInquiries || 0}
              </div>
              <p className="text-[11px] text-rose-700 font-semibold mt-1">Requires triage</p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Subscribers</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                {loading ? "..." : data?.stats.business.totalSubscribers || 0}
              </div>
              <p className="text-[11px] text-[#008F53] font-semibold mt-1">
                {data?.stats.business.activeSubscribers || 0} active subscribers
              </p>
            </div>

            <div className="bg-white border border-[#DFEDE5] rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-medium text-[#64736F]">Emails Dispatched</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] mt-1">
                {loading ? "..." : data?.stats.business.sentEmails || 0}
              </div>
              <p className="text-[11px] text-[#64736F] mt-1">Via Gmail API (200 OK)</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: CHARTS & VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Website Pages */}
        <div className="bg-white border border-[#DFEDE5] rounded-3xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-[#142A27]">Popular Website Pages</h4>
            <span className="text-[11px] font-semibold text-[#64736F]">Ranked</span>
          </div>

          <div className="space-y-3">
            {data?.charts.popularPages.map((page, idx) => (
              <div key={page.path} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#142A27] truncate max-w-[180px]">
                    {idx + 1}. {page.title}
                  </span>
                  <span className="text-[#64736F] font-mono text-[11px]">
                    {page.views} views
                  </span>
                </div>
                <div className="w-full bg-[#FAFCF9] border border-[#DFEDE5] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#008F53] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(15, (page.views / (data?.charts.popularPages[0]?.views || 1)) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Status Distribution */}
        <div className="bg-white border border-[#DFEDE5] rounded-3xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-[#142A27]">Application Status Pipeline</h4>
            <span className="text-[11px] font-semibold text-[#008F53]">Live Distribution</span>
          </div>

          <div className="space-y-3">
            {data?.charts.applicationStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between py-1.5 border-b border-[#DFEDE5]/60 last:border-none">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'hired' ? 'bg-[#008F53]' :
                    item.status === 'shortlisted' ? 'bg-[#00B86B]' :
                    item.status === 'new' ? 'bg-amber-500' :
                    item.status === 'rejected' ? 'bg-rose-500' : 'bg-sky-500'
                  }`} />
                  <span className="text-xs font-medium text-[#142A27]">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-[#142A27] bg-[#FAFCF9] border border-[#DFEDE5] px-2 py-0.5 rounded-lg">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Job Postings */}
        <div className="bg-white border border-[#DFEDE5] rounded-3xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-[#142A27]">Featured Openings</h4>
            <Link href="/admin/jobs" className="text-[11px] font-bold text-[#008F53] hover:underline">
              Manage
            </Link>
          </div>

          {data?.charts.popularJobs && data.charts.popularJobs.length > 0 ? (
            <div className="space-y-3">
              {data.charts.popularJobs.map((job) => (
                <div key={job.title} className="p-3 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-[#142A27]">{job.title}</h5>
                    <p className="text-[10px] text-[#64736F]">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#008F53]">{job.views}</span>
                    <span className="text-[10px] text-[#64736F] block">views</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#64736F] space-y-2">
              <Briefcase className="w-8 h-8 text-[#64736F]/40 mx-auto" />
              <p className="text-xs">No active job postings recorded yet.</p>
              <Link
                href="/admin/jobs"
                className="inline-block px-3 py-1.5 rounded-xl bg-[#008F53] text-white font-semibold text-xs mt-1"
              >
                Create Job
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: RECENT STREAMS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-[#DFEDE5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#008F53]" />
              <h4 className="font-bold text-sm text-[#142A27]">Recent Inquiries</h4>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-[#008F53] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#DFEDE5]">
            {data?.recentInquiries && data.recentInquiries.length > 0 ? (
              data.recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 hover:bg-[#FAFCF9] transition-colors flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#142A27]">{inquiry.full_name}</span>
                      <span className="text-[10px] font-mono text-[#64736F] bg-neutral-100 px-1.5 py-0.5 rounded">
                        {inquiry.reference_number}
                      </span>
                    </div>
                    <p className="text-[#64736F] text-[11px] mt-0.5">{inquiry.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      inquiry.status === "new" ? "bg-rose-100 text-rose-800" :
                      inquiry.status === "in_review" ? "bg-amber-100 text-amber-800" :
                      inquiry.status === "contacted" ? "bg-sky-100 text-sky-800" :
                      "bg-emerald-100 text-emerald-800"
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="block text-[10px] text-[#64736F] mt-1">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#64736F]">No inquiries submitted yet.</div>
            )}
          </div>
        </div>

        {/* Recent Email Dispatches */}
        <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-[#DFEDE5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#008F53]" />
              <h4 className="font-bold text-sm text-[#142A27]">Recent Email Dispatches</h4>
            </div>
            <Link
              href="/admin/emails"
              className="text-xs font-semibold text-[#008F53] hover:underline inline-flex items-center gap-1"
            >
              <span>View Audit Trail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#DFEDE5]">
            {data?.recentEmails && data.recentEmails.length > 0 ? (
              data.recentEmails.map((log) => (
                <div key={log.id} className="p-4 hover:bg-[#FAFCF9] transition-colors flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#142A27]">{log.recipient}</span>
                    <p className="text-[11px] text-[#64736F] mt-0.5">{log.email_type.replace(/_/g, " ")}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      log.status === "sent" ? "bg-emerald-100 text-emerald-800" :
                      log.status === "failed" ? "bg-rose-100 text-rose-800" : "bg-neutral-100 text-neutral-800"
                    }`}>
                      {log.status}
                    </span>
                    <span className="block text-[10px] text-[#64736F] mt-1">
                      {new Date(log.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#64736F]">No outbound emails logged yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
