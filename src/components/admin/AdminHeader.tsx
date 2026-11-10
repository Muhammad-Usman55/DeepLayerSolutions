"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  Shield,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { AdminRole } from "@/types/supabase";

interface AdminHeaderProps {
  email?: string;
  role?: AdminRole;
  fullName?: string | null;
  onOpenMobileSidebar?: () => void;
  unreadCount?: number;
}

export function AdminHeader({
  email,
  role = "admin",
  fullName,
  onOpenMobileSidebar,
  unreadCount = 0,
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  // Derive readable title from current pathname
  const getPageTitle = (path: string): string => {
    if (path === "/admin") return "Executive Overview";
    if (path.startsWith("/admin/jobs/create")) return "Post New Vacancy";
    if (path.startsWith("/admin/jobs")) return "Job Postings";
    if (path.startsWith("/admin/applications")) return "Applicant Tracking System (ATS)";
    if (path.startsWith("/admin/inquiries")) return "Contact Inquiries";
    if (path.startsWith("/admin/subscribers")) return "Newsletter Subscribers";
    if (path.startsWith("/admin/emails")) return "Email Audit Logs";
    if (path.startsWith("/admin/analytics")) return "Telemetry & Analytics";
    if (path.startsWith("/admin/pages")) return "Website Content Management";
    if (path.startsWith("/admin/media")) return "Media Library";
    if (path.startsWith("/admin/notifications")) return "Notification Center";
    if (path.startsWith("/admin/users")) return "Admin User Management";
    if (path.startsWith("/admin/activity-logs")) return "Security Activity Logs";
    if (path.startsWith("/admin/settings")) return "Global Settings";
    return "Admin Console";
  };

  const roleLabels: Record<AdminRole, string> = {
    superadmin: "Super Admin",
    admin: "Admin",
    recruitment_manager: "Recruitment Lead",
    content_manager: "Content Lead",
    editor: "Editor",
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#DFEDE5] shadow-2xs select-none">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          {onOpenMobileSidebar && (
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="lg:hidden flex items-center">
            <Logo variant="default" size="sm" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2 text-xs text-[#64736F]">
              <Link href="/admin" className="hover:text-[#142A27]">
                Admin
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#142A27]">
                {getPageTitle(pathname)}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-[#142A27] leading-tight">
              {getPageTitle(pathname)}
            </h1>
          </div>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#64736F]/60 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inquiries, jobs, applicants, logs..."
              className="w-full pl-9.5 pr-4 py-1.5 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#64736F]/60 focus:outline-none focus:border-[#008F53] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notification Dropdown Preview */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#DFEDE5] shadow-xl p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5] mb-3">
                  <span className="font-bold text-[#142A27] text-sm">
                    Notifications
                  </span>
                  <Link
                    href="/admin/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#008F53] font-semibold hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-2 py-1">
                  <div className="p-2.5 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5]/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008F53] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#142A27]">
                        Admin Console Operational
                      </p>
                      <p className="text-[11px] text-[#64736F] mt-0.5">
                        Connected to Supabase PostgreSQL & Gmail API.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-[#DFEDE5] hidden sm:block" />

          {/* Admin User Profile Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FAFCF9] border border-[#DFEDE5]">
            <div className="w-6 h-6 rounded-full bg-[#008F53] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {fullName ? fullName.charAt(0).toUpperCase() : email ? email.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-semibold text-[#142A27] text-xs max-w-[130px] truncate leading-tight">
                {fullName || email || "Administrator"}
              </span>
              <span className="text-[10px] font-bold text-[#008F53] leading-none uppercase tracking-wider">
                {roleLabels[role] || role}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
            title="Sign out of administrative session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {loggingOut ? "Signing out..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
