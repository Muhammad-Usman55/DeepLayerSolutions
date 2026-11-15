"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  User,
  Settings,
  Moon,
  Sun,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";
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
  fullName = "Muhammad Usman",
  onOpenMobileSidebar,
  unreadCount = 3,
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on click outside
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setShowNotifications(false);
        setShowProfileMenu(false);
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (typeof window !== "undefined") {
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch {}
      }

      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/admin/login";
    }
  };

  const roleLabels: Record<AdminRole, string> = {
    superadmin: "Administrator",
    admin: "Administrator",
    recruitment_manager: "Recruitment Lead",
    content_manager: "Content Lead",
    editor: "Editor",
  };

  const displayName = fullName || "Muhammad Usman";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Mock search suggestions when user types
  const searchSuggestions = [
    { title: "AI/ML Engineer Applications", href: "/admin/applications", category: "ATS", icon: Users },
    { title: "Post New Vacancy", href: "/admin/jobs/create", category: "Jobs", icon: Briefcase },
    { title: "Contact Inquiries", href: "/admin/inquiries", category: "Inbox", icon: FileText },
    { title: "Security Audit Logs", href: "/admin/activity-logs", category: "Security", icon: Shield },
  ].filter((item) =>
    searchQuery.trim() === ""
      ? true
      : item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E3ECE7] select-none shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Mobile Logo */}
        <div className="flex items-center gap-3">
          {onOpenMobileSidebar && (
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-[#64736F] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/admin" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#082019] flex items-center justify-center shrink-0 border border-[#143B30]">
              <Image
                src="/logo/logo-cropped.png"
                alt="DeepLayer"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="font-extrabold text-[#142A27] text-sm tracking-tight">
              Deep<span className="text-[#008F53]">Layer</span>
            </span>
          </Link>
        </div>

        {/* Center: Search Bar with Focus Expansion */}
        <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg relative">
          <div
            className={`relative flex items-center transition-all duration-300 rounded-full ${
              isSearchFocused
                ? "ring-2 ring-[#008F53]/30 border-[#008F53] shadow-sm bg-white"
                : "border-[#E1ECE5] bg-[#F5F8F6] hover:bg-[#EFF4F1]"
            } border`}
          >
            <Search className="absolute left-3.5 w-4 h-4 text-[#7C8E88] pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search anything... (Ctrl + K)"
              className="w-full pl-10 pr-20 py-2 text-xs text-[#142A27] bg-transparent placeholder:text-[#889893] focus:outline-none"
            />
            <div className="absolute right-2.5 hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-[#64736F] border border-[#DFEDE5] shadow-2xs">
                Ctrl
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-[#64736F] border border-[#DFEDE5] shadow-2xs">
                K
              </kbd>
            </div>
          </div>

          {/* Search Dropdown Results */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() !== "" && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-[#DFEDE5] shadow-xl p-2 z-50 text-xs"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#889893] uppercase tracking-wider">
                  Matching Results
                </div>
                {searchSuggestions.length > 0 ? (
                  <div className="space-y-1">
                    {searchSuggestions.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F2F7F4] text-[#142A27] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-3.5 h-3.5 text-[#008F53]" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-[#7C8E88] bg-[#E9FFF2] text-[#008F53] px-2 py-0.5 rounded-full font-semibold">
                            {item.category}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center text-[#7C8E88]">
                    No quick results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Notifications, User Profile & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-[#5B6D67] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notification Dropdown Preview */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xl p-4 z-50 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#142A27] text-sm">
                        Notifications
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9FFF2] text-[#008F53]">
                        {unreadCount} New
                      </span>
                    </div>
                    <Link
                      href="/admin/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-[#008F53] font-semibold hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="space-y-2 py-1 max-h-[300px] overflow-y-auto">
                    <div className="p-3 rounded-xl bg-[#F6FBF8] border border-[#E1ECE5] flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#008F53] flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#142A27] text-xs">
                          New Job Application
                        </p>
                        <p className="text-[11px] text-[#64736F] mt-0.5 truncate">
                          Candidate applied for Senior AI Engineer
                        </p>
                        <span className="text-[10px] text-[#889893] mt-1 block">
                          2 minutes ago
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F6FBF8] border border-[#E1ECE5] flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#142A27] text-xs">
                          All Systems Operational
                        </p>
                        <p className="text-[11px] text-[#64736F] mt-0.5">
                          Supabase, Gmail API & Edge CDN active
                        </p>
                        <span className="text-[10px] text-[#889893] mt-1 block">
                          15 minutes ago
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin User Profile Pill with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-full hover:bg-[#F2F7F4] transition-colors cursor-pointer border border-transparent hover:border-[#DFEDE5]"
            >
              <div className="relative w-8 h-8 rounded-full bg-[#008F53] text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/20 overflow-hidden shrink-0">
                <Image
                  src="/team/usman.png"
                  alt={displayName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="select-none">{userInitials}</span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-bold text-[#142A27] text-xs leading-tight">
                  {displayName}
                </span>
                <span className="text-[10px] font-semibold text-[#7C8E88] leading-tight">
                  {roleLabels[role] || "Administrator"}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#7C8E88] hidden sm:block transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xl p-2 z-50 text-xs"
                >
                  <div className="px-3 py-2.5 border-b border-[#DFEDE5] mb-1">
                    <p className="font-bold text-[#142A27] text-xs truncate">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-[#64736F] truncate mt-0.5">
                      {email || "deeplayersolutions@gmail.com"}
                    </p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#E9FFF2] text-[#008F53] uppercase tracking-wider">
                      {roleLabels[role] || "Administrator"}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/admin/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#5B6D67] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Account Settings</span>
                    </Link>

                    <Link
                      href="/admin/activity-logs"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#5B6D67] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Security Logs</span>
                    </Link>

                    <Link
                      href="/"
                      target="_blank"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-[#5B6D67] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Live Website</span>
                      </div>
                    </Link>
                  </div>

                  <div className="pt-1 mt-1 border-t border-[#DFEDE5]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{loggingOut ? "Signing out..." : "Log Out"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Switcher Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-2 rounded-full text-[#5B6D67] hover:text-[#142A27] hover:bg-[#F2F7F4] transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkTheme ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
