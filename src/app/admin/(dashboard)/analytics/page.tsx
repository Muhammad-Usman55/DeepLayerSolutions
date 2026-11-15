"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  TrendingUp,
  Smartphone,
  Monitor,
  Users,
  Inbox,
  Mail,
  Zap,
  RefreshCw,
  PieChart,
  Target,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface AnalyticsData {
  metrics: {
    totalInquiries: number;
    activeInquiries: number;
    totalApplications: number;
    shortlistedApplications: number;
    totalSubscribers: number;
    totalEmailsSent: number;
    deviceDistribution: {
      mobilePercent: number;
      desktopPercent: number;
    };
    servicesBreakdown: Array<{ name: string; count: number }>;
    positionsBreakdown: Array<{ name: string; count: number }>;
  };
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/analytics");
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json);
      } else {
        setError(json.message || "Failed to load telemetry analytics.");
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Platform Telemetry &amp; Business Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              First-Party Metrics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Real-time conversion funnels, client service interest distribution, and candidate acquisition velocity.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchAnalytics}
          disabled={loading}
          className="p-2.5 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh analytics"
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

      {/* KPI Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
                Inquiries Received
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#142A27] mt-2">
              {data.metrics.totalInquiries}
            </div>
            <span className="text-[11px] text-[#64736F]">
              <b>{data.metrics.activeInquiries}</b> in active review
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
                Candidates Applied
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#142A27] mt-2">
              {data.metrics.totalApplications}
            </div>
            <span className="text-[11px] text-[#64736F]">
              <b>{data.metrics.shortlistedApplications}</b> shortlisted candidates
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
                Newsletter Audience
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#142A27] mt-2">
              {data.metrics.totalSubscribers}
            </div>
            <span className="text-[11px] text-[#64736F]">Verified subscribers</span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#DFEDE5] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
                Transactional Emails
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#142A27] mt-2">
              {data.metrics.totalEmailsSent}
            </div>
            <span className="text-[11px] text-[#64736F]">100% delivered via Gmail API</span>
          </div>
        </div>
      )}

      {/* Graphs & Breakdown Grids */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Inquiries Distribution */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#008F53]" />
                <span>Service Inquiry Breakdown</span>
              </h3>
              <span className="text-xs text-[#64736F]">Client Intent</span>
            </div>

            <div className="space-y-3 pt-2">
              {data.metrics.servicesBreakdown.length === 0 ? (
                <div className="text-xs text-[#64736F] py-4 text-center">
                  No service inquiries recorded yet.
                </div>
              ) : (
                data.metrics.servicesBreakdown.map((s) => {
                  const percent = Math.round(
                    (s.count / Math.max(1, data.metrics.totalInquiries)) * 100
                  );
                  return (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#142A27]">{s.name}</span>
                        <span className="text-[#64736F]">
                          {s.count} ({percent}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] overflow-hidden">
                        <div
                          className="h-full bg-[#008F53] rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Candidate Positions Volume */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#008F53]" />
                <span>Applicant Distribution By Position</span>
              </h3>
              <span className="text-xs text-[#64736F]">Talent Pool</span>
            </div>

            <div className="space-y-3 pt-2">
              {data.metrics.positionsBreakdown.length === 0 ? (
                <div className="text-xs text-[#64736F] py-4 text-center">
                  No candidate submissions recorded yet.
                </div>
              ) : (
                data.metrics.positionsBreakdown.map((p) => {
                  const percent = Math.round(
                    (p.count / Math.max(1, data.metrics.totalApplications)) * 100
                  );
                  return (
                    <div key={p.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#142A27]">{p.name}</span>
                        <span className="text-[#64736F]">
                          {p.count} ({percent}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Device & Experience Distribution */}
      {data && (
        <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#008F53]" />
              <span>Audience Device Share</span>
            </h3>
            <span className="text-xs text-[#64736F]">Next.js Client Telemetry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#64736F] uppercase">Mobile Visitors</div>
                <div className="text-2xl font-black text-[#142A27]">
                  {data.metrics.deviceDistribution.mobilePercent}%
                </div>
                <p className="text-[11px] text-[#64736F]">Zero-scroll-lag stylesheet active</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#64736F] uppercase">Desktop Visitors</div>
                <div className="text-2xl font-black text-[#142A27]">
                  {data.metrics.deviceDistribution.desktopPercent}%
                </div>
                <p className="text-[11px] text-[#64736F]">Ultra-high DPI responsive views</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
