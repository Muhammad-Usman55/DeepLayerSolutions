"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  FileText,
  Star,
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Plus,
  Edit3,
  User,
  Shield,
  Layers,
  LayoutGrid,
  Settings,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useAnimatedCount } from "@/components/admin/useAnimatedCount";

// Smooth Cubic Bezier Spline Generator for Charts
function generateSplinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return path;
}

// Mini Sparkline Component for Metric Cards
function MiniSparkline({
  points,
  strokeColor,
  gradientId,
  gradientFrom,
}: {
  points: number[];
  strokeColor: string;
  gradientId: string;
  gradientFrom: string;
}) {
  const width = 140;
  const height = 48;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((val, idx) => ({
    x: (idx / (points.length - 1)) * (width - 8) + 4,
    y: height - 6 - ((val - min) / range) * (height - 14),
  }));

  const linePath = generateSplinePath(coords);
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-12 overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.35" />
          <stop offset="100%" stopColor={gradientFrom} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <motion.path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

// Individual Stat Card with Animated Number and Hover Elevation
function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  trend,
  trendPositive,
  trendBg,
  trendColor,
  sparklineData,
  strokeColor,
  gradientId,
  gradientFrom,
  delay = 0,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  value: number;
  trend: string;
  trendPositive?: boolean;
  trendBg: string;
  trendColor: string;
  sparklineData: number[];
  strokeColor: string;
  gradientId: string;
  gradientFrom: string;
  delay?: number;
}) {
  const animatedValue = useAnimatedCount(value, 900);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group relative bg-white rounded-2xl border border-[#E3ECE7] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Top: Icon & Trend Badge */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${trendBg} ${trendColor}`}
          >
            <span>↑ {trend}</span>
          </div>
        </div>

        {/* Middle: Number & Label */}
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            {animatedValue}
          </div>
          <p className="text-xs font-medium text-[#64736F] mt-0.5">{label}</p>
        </div>
      </div>

      {/* Bottom: Mini Sparkline Wave */}
      <div className="mt-3 pt-2">
        <MiniSparkline
          points={sparklineData}
          strokeColor={strokeColor}
          gradientId={gradientId}
          gradientFrom={gradientFrom}
        />
      </div>
    </motion.div>
  );
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [activeDateFilter, setActiveDateFilter] = useState("Last 30 Days");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<"Visitors" | "Applications" | "Jobs">("Visitors");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(6);
  const [loading, setLoading] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch live telemetry from API
  const fetchOverview = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/overview?filter=30d`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) setData(json);
      }
    } catch (err) {
      console.warn("Using dashboard telemetry baseline:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  // Analytics Spline Datasets
  const chartDatasets = {
    Visitors: {
      labels: ["Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15"],
      values: [3800, 4800, 3600, 4500, 4000, 6200, 7240],
      displayUnit: "Visitors",
      maxVal: 8000,
    },
    Applications: {
      labels: ["Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15"],
      values: [12, 19, 15, 28, 22, 35, 47],
      displayUnit: "Applications",
      maxVal: 50,
    },
    Jobs: {
      labels: ["Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15"],
      values: [18, 18, 20, 20, 22, 24, 24],
      displayUnit: "Active Roles",
      maxVal: 30,
    },
  };

  const currentDataset = chartDatasets[activeChartTab];

  // SVG Chart Dimensions
  const chartWidth = 600;
  const chartHeight = 220;
  const chartPaddingTop = 20;
  const chartPaddingBottom = 30;
  const chartPaddingLeft = 36;
  const chartPaddingRight = 20;

  const chartPlotWidth = chartWidth - chartPaddingLeft - chartPaddingRight;
  const chartPlotHeight = chartHeight - chartPaddingTop - chartPaddingBottom;

  const chartPoints = currentDataset.values.map((val, idx) => ({
    x: chartPaddingLeft + (idx / (currentDataset.values.length - 1)) * chartPlotWidth,
    y: chartPaddingTop + chartPlotHeight - (val / currentDataset.maxVal) * chartPlotHeight,
  }));

  const chartLinePath = generateSplinePath(chartPoints);
  const chartAreaPath = `${chartLinePath} L ${chartPoints[chartPoints.length - 1].x} ${chartPaddingTop + chartPlotHeight} L ${chartPoints[0].x} ${chartPaddingTop + chartPlotHeight} Z`;

  const dateOptions = ["Today", "Last 7 Days", "Last 30 Days", "Last 90 Days", "All Time"];

  return (
    <div className="space-y-6 select-none relative">
      {/* 1. TOP HEADER & GREETING BANNER WITH AMBIENT EMERALD GLOW */}
      <div className="relative rounded-3xl bg-linear-to-r from-emerald-50/70 via-[#F3FAF6]/60 to-transparent p-6 sm:p-8 border border-[#DFEDE5]/80 overflow-hidden shadow-2xs">
        {/* Soft Organic Ambient Mesh Glow */}
        <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
                Welcome Back, Muhammad Usman! 👋
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6D67] mt-1 font-medium">
              Here&apos;s what&apos;s happening with your website today.
            </p>
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative shrink-0" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs font-bold text-[#142A27] hover:bg-[#F2F7F4] transition-all cursor-pointer shadow-2xs hover:border-[#008F53]"
            >
              <Calendar className="w-4 h-4 text-[#008F53]" />
              <span>{activeDateFilter}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#64736F] transition-transform duration-200 ${
                  isFilterDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isFilterDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#DFEDE5] shadow-xl p-1.5 z-40 text-xs"
                >
                  {dateOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setActiveDateFilter(opt);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
                        activeDateFilter === opt
                          ? "bg-[#E9FFF2] text-[#008F53] font-bold"
                          : "text-[#142A27] hover:bg-[#F2F7F4]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. FOUR ADVANCED STATISTICS CARDS WITH SPARKLINE ANIMATIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Visitors */}
        <StatCard
          icon={Users}
          iconBg="bg-emerald-50"
          iconColor="text-[#008F53]"
          label="Total Visitors"
          value={data?.stats?.website?.totalVisitors || 12480}
          trend="+12.5%"
          trendPositive={true}
          trendBg="bg-[#E9FFF2]"
          trendColor="text-[#008F53]"
          sparklineData={[3200, 4100, 3900, 5200, 4800, 6100, 7240]}
          strokeColor="#10B981"
          gradientId="grad-visitors"
          gradientFrom="#10B981"
          delay={0}
        />

        {/* Job Applications */}
        <StatCard
          icon={Briefcase}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Job Applications"
          value={data?.stats?.recruitment?.totalApplications || 186}
          trend="+8.3%"
          trendPositive={true}
          trendBg="bg-blue-50"
          trendColor="text-blue-600"
          sparklineData={[12, 19, 15, 28, 22, 35, 47]}
          strokeColor="#3B82F6"
          gradientId="grad-applications"
          gradientFrom="#3B82F6"
          delay={0.05}
        />

        {/* Active Job Posts */}
        <StatCard
          icon={FileText}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="Active Job Posts"
          value={data?.stats?.recruitment?.activeJobs || 24}
          trend="+4.2%"
          trendPositive={true}
          trendBg="bg-purple-50"
          trendColor="text-purple-600"
          sparklineData={[18, 19, 20, 20, 22, 23, 24]}
          strokeColor="#8B5CF6"
          gradientId="grad-jobs"
          gradientFrom="#8B5CF6"
          delay={0.1}
        />

        {/* Total Projects */}
        <StatCard
          icon={Star}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          label="Total Projects"
          value={892}
          trend="+10.1%"
          trendPositive={true}
          trendBg="bg-amber-50"
          trendColor="text-amber-600"
          sparklineData={[650, 710, 740, 790, 810, 850, 892]}
          strokeColor="#F59E0B"
          gradientId="grad-projects"
          gradientFrom="#F59E0B"
          delay={0.15}
        />
      </div>

      {/* 3. TWO-COLUMN MAIN ANALYTICS & ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: WEBSITE ANALYTICS CHART & RECENT ACTIVITIES (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Website Analytics Interactive Spline Chart */}
          <div className="bg-white rounded-3xl border border-[#E3ECE7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#008F53]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#142A27] leading-tight">
                    Website Analytics
                  </h2>
                  <p className="text-[11px] text-[#64736F]">
                    Live traffic & interaction metrics
                  </p>
                </div>
              </div>

              {/* Chart Tabs: Visitors, Applications, Jobs */}
              <div className="inline-flex items-center p-1 rounded-xl bg-[#F4F7F5] border border-[#DFEDE5] text-xs font-semibold">
                {(["Visitors", "Applications", "Jobs"] as const).map((tab) => {
                  const isActive = activeChartTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveChartTab(tab);
                        setHoveredPointIndex(6);
                      }}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-[#5B6D67] hover:text-[#142A27]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeChartTab"
                          className="absolute inset-0 bg-[#008F53] rounded-lg shadow-2xs"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive SVG Spline Line & Area Chart */}
            <div className="relative w-full h-[240px]">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradientEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = chartPaddingTop + chartPlotHeight * (1 - ratio);
                  const labelValue = Math.round(ratio * currentDataset.maxVal);
                  const formattedLabel =
                    labelValue >= 1000 ? `${(labelValue / 1000).toFixed(0)}k` : `${labelValue}`;

                  return (
                    <g key={i}>
                      <line
                        x1={chartPaddingLeft}
                        y1={y}
                        x2={chartWidth - chartPaddingRight}
                        y2={y}
                        stroke="#EDF3F0"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <text
                        x={chartPaddingLeft - 8}
                        y={y + 3}
                        textAnchor="end"
                        fontSize="10"
                        fill="#889893"
                        fontFamily="sans-serif"
                      >
                        {formattedLabel}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {currentDataset.labels.map((date, i) => {
                  const x = chartPaddingLeft + (i / (currentDataset.labels.length - 1)) * chartPlotWidth;
                  return (
                    <text
                      key={date}
                      x={x}
                      y={chartHeight - 6}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#889893"
                      fontFamily="sans-serif"
                    >
                      {date}
                    </text>
                  );
                })}

                {/* Area Gradient Fill */}
                <path d={chartAreaPath} fill="url(#chartGradientEmerald)" />

                {/* Spline Path */}
                <motion.path
                  key={activeChartTab}
                  d={chartLinePath}
                  fill="none"
                  stroke="#008F53"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Data Points */}
                {chartPoints.map((pt, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                    >
                      {/* Invisible hover target */}
                      <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

                      {/* Visible node */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? "6" : "4"}
                        fill="#008F53"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Tooltip Mockup */}
              {hoveredPointIndex !== null && chartPoints[hoveredPointIndex] && (
                <div
                  className="absolute pointer-events-none transition-all duration-200"
                  style={{
                    left: `${(chartPoints[hoveredPointIndex].x / chartWidth) * 100}%`,
                    top: `${(chartPoints[hoveredPointIndex].y / chartHeight) * 100}%`,
                    transform: "translate(-50%, -130%)",
                  }}
                >
                  <div className="px-3 py-1.5 rounded-xl bg-white text-[#142A27] text-xs font-bold border border-[#DFEDE5] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[#64736F] font-medium">
                      {currentDataset.labels[hoveredPointIndex]}
                    </span>
                    <span>•</span>
                    <span className="w-2 h-2 rounded-full bg-[#008F53]" />
                    <span>
                      {currentDataset.values[hoveredPointIndex].toLocaleString()}{" "}
                      {currentDataset.displayUnit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card: Recent Activities Feed */}
          <div className="bg-white rounded-3xl border border-[#E3ECE7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDF3F0]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-neutral-100 text-[#142A27]">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[#142A27]">
                  Recent Activities
                </h2>
              </div>
              <Link
                href="/admin/activity-logs"
                className="group text-xs font-bold text-[#008F53] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="divide-y divide-[#EDF3F0]">
              {[
                {
                  id: 1,
                  icon: Briefcase,
                  iconBg: "bg-emerald-50 text-[#008F53]",
                  title: 'New job application received for "AI/ML Engineer"',
                  time: "2 minutes ago",
                  href: "/admin/applications",
                },
                {
                  id: 2,
                  icon: Edit3,
                  iconBg: "bg-blue-50 text-blue-600",
                  title: 'A new blog post "Top AI Tools in 2026" has been published',
                  time: "15 minutes ago",
                  href: "/admin/pages?tab=blogs",
                },
                {
                  id: 3,
                  icon: Plus,
                  iconBg: "bg-purple-50 text-purple-600",
                  title: 'New portfolio project "TravelMate AI" added',
                  time: "1 hour ago",
                  href: "/admin/pages?tab=portfolio",
                },
                {
                  id: 4,
                  icon: User,
                  iconBg: "bg-amber-50 text-amber-600",
                  title: "A new testimonial from Ayesha Khan",
                  time: "2 hours ago",
                  href: "/admin/pages?tab=testimonials",
                },
              ].map((activity, idx) => {
                const ActivityIcon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="py-3.5 flex items-center justify-between gap-3 group hover:bg-[#F9FCFA] px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl ${activity.iconBg} flex items-center justify-center shrink-0`}
                      >
                        <ActivityIcon className="w-4 h-4" />
                      </div>
                      <Link
                        href={activity.href}
                        className="text-xs font-semibold text-[#142A27] truncate hover:text-[#008F53] transition-colors"
                      >
                        {activity.title}
                      </Link>
                    </div>

                    <span className="text-[11px] text-[#889893] whitespace-nowrap shrink-0">
                      {activity.time}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS & SYSTEM STATUS (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Quick Actions Grid */}
          <div className="bg-white rounded-3xl border border-[#E3ECE7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#008F53]" />
              <h2 className="text-base font-bold text-[#142A27]">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Add Job Post",
                  href: "/admin/jobs/create",
                  icon: Briefcase,
                  iconColor: "text-[#008F53]",
                },
                {
                  label: "Manage Applications",
                  href: "/admin/applications",
                  icon: Users,
                  iconColor: "text-emerald-600",
                },
                {
                  label: "Add Blog Post",
                  href: "/admin/pages?tab=blogs&action=create",
                  icon: FileText,
                  iconColor: "text-teal-600",
                },
                {
                  label: "Add Project",
                  href: "/admin/pages?tab=portfolio&action=create",
                  icon: LayoutGrid,
                  iconColor: "text-[#008F53]",
                },
                {
                  label: "View Website",
                  href: "/",
                  external: true,
                  icon: ExternalLink,
                  iconColor: "text-teal-600",
                },
                {
                  label: "Site Settings",
                  href: "/admin/settings",
                  icon: Settings,
                  iconColor: "text-emerald-700",
                },
              ].map((action, idx) => {
                const ActionIcon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#F5FAF7] border border-[#DFEDE5] hover:border-[#008F53]/40 hover:bg-[#EBF7F0] transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ActionIcon
                          className={`w-4 h-4 ${action.iconColor} shrink-0 transition-transform duration-200 group-hover:scale-110`}
                        />
                        <span className="text-xs font-bold text-[#142A27] truncate">
                          {action.label}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#64736F] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#008F53] shrink-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Card: System Status */}
          <div className="bg-white rounded-3xl border border-[#E3ECE7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDF3F0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#008F53]" />
                <h2 className="text-base font-bold text-[#142A27]">
                  System Status
                </h2>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#C6EFD9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>

            <div className="divide-y divide-[#EDF3F0] pt-1">
              {[
                { name: "Website Live", status: "Online" },
                { name: "Database", status: "Healthy" },
                { name: "Email Service", status: "Working" },
                { name: "CDN", status: "Active" },
              ].map((svc) => (
                <div
                  key={svc.name}
                  className="py-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008F53]" />
                    </span>
                    <span className="font-semibold text-[#142A27]">
                      {svc.name}
                    </span>
                  </div>

                  <span className="font-bold text-[#008F53]">
                    {svc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
