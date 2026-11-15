"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserCheck,
  FileText,
  LayoutGrid,
  Star,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { AdminRole } from "@/types/supabase";
import { canAccessRoute } from "@/lib/auth/permissions";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  exact?: boolean;
  subItems?: { label: string; href: string }[];
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "Job Postings",
        href: "/admin/jobs",
        icon: Briefcase,
        subItems: [
          { label: "All Vacancies", href: "/admin/jobs" },
          { label: "Post New Vacancy", href: "/admin/jobs/create" },
        ],
      },
      {
        label: "Applications",
        href: "/admin/applications",
        icon: Users,
        badge: 47,
      },
      {
        label: "Candidates",
        href: "/admin/applications?filter=candidates",
        icon: UserCheck,
      },
      {
        label: "Blog Posts",
        href: "/admin/pages?tab=blogs",
        icon: FileText,
      },
      {
        label: "Portfolio Projects",
        href: "/admin/pages?tab=portfolio",
        icon: LayoutGrid,
      },
      {
        label: "Testimonials",
        href: "/admin/pages?tab=testimonials",
        icon: Star,
      },
      {
        label: "Media Library",
        href: "/admin/media",
        icon: ImageIcon,
      },
      {
        label: "Website Pages",
        href: "/admin/pages",
        icon: Globe,
      },
      {
        label: "Appearance",
        href: "/admin/settings?tab=appearance",
        icon: Sparkles,
        subItems: [
          { label: "Theme & Palette", href: "/admin/settings?tab=appearance" },
          { label: "Typography & Layout", href: "/admin/settings?tab=layout" },
        ],
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        subItems: [
          { label: "General Settings", href: "/admin/settings" },
          { label: "Admin Users", href: "/admin/users" },
          { label: "Security Logs", href: "/admin/activity-logs" },
        ],
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
];

interface AdminSidebarProps {
  role?: AdminRole;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  unreadCount?: number;
}

export function AdminSidebar({
  role,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  unreadCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    "/admin/jobs": pathname.startsWith("/admin/jobs"),
    "/admin/settings": pathname.startsWith("/admin/settings"),
    "/admin/settings?tab=appearance": false,
  });

  const toggleDropdown = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdowns((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#082019] text-white border-r border-[#143B30] select-none shadow-xl">
      {/* Brand & Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#143B30] shrink-0">
        <Link
          href="/admin"
          onClick={onCloseMobile}
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#008F53] to-[#0D3B2E] flex items-center justify-center shrink-0 border border-[#1FB474]/30 shadow-[0_0_15px_rgba(0,143,83,0.35)] transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo/logo-cropped.png"
              alt="DeepLayer Solutions Logo"
              width={22}
              height={22}
              className="object-contain drop-shadow"
            />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm tracking-tight text-white leading-tight">
                Deep<span className="text-[#34D399]">Layer</span>
              </span>
              <span className="text-[10px] text-white/60 tracking-wider font-semibold uppercase">
                Solutions
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
          aria-label="Close mobile navigation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {NAV_GROUPS.map((group, groupIdx) => {
          return (
            <div key={groupIdx} className="space-y-1">
              {group.title && !isCollapsed && (
                <div className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-wider my-2">
                  {group.title}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href.split("?")[0]));
                const isDropdownOpen = !!openDropdowns[item.href];
                const hasSubItems = item.subItems && item.subItems.length > 0;

                return (
                  <div key={item.label} className="space-y-0.5">
                    <div className="relative">
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        title={isCollapsed ? item.label : undefined}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer relative ${
                          isActive
                            ? "bg-[#008F53] text-white shadow-md font-bold"
                            : "text-white/75 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                              isActive ? "text-white" : "text-white/70 group-hover:text-white"
                            }`}
                          />

                          {!isCollapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>

                        {!isCollapsed && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Badges */}
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-[#34D399] text-[#082019] leading-none">
                                {item.badge}
                              </span>
                            )}
                            {item.href === "/admin/notifications" && unreadCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white leading-none">
                                {unreadCount}
                              </span>
                            )}

                            {/* Dropdown chevron */}
                            {hasSubItems && (
                              <button
                                type="button"
                                onClick={(e) => toggleDropdown(item.href, e)}
                                className="p-0.5 rounded text-white/50 hover:text-white transition-colors cursor-pointer"
                              >
                                <motion.div
                                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </motion.div>
                              </button>
                            )}
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Sub-items collapse accordion */}
                    {!isCollapsed && hasSubItems && (
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="pl-8 pr-2 py-1 space-y-1 overflow-hidden"
                          >
                            {item.subItems?.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={onCloseMobile}
                                  className={`block px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                                    isSubActive
                                      ? "text-[#34D399] font-bold bg-white/5"
                                      : "text-white/60 hover:text-white hover:bg-white/5"
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Status Card (Exact match to Mockup) */}
      {!isCollapsed && (
        <div className="p-3.5 mx-3 mb-2 rounded-2xl bg-[#061813] border border-[#143B30] text-center space-y-2">
          <div className="w-9 h-9 rounded-full bg-[#008F53]/20 border border-[#008F53]/40 flex items-center justify-center mx-auto text-[#34D399]">
            <Rocket className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Your Website
            </div>
            <div className="inline-flex items-center justify-center gap-1 text-[11px] text-[#34D399] font-semibold mt-0.5">
              <span>is Running Smoothly!</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[10px] text-white/50 pt-1.5 border-t border-white/5 font-sans">
            Last Updated: Nov 15, 2026 • 9:45 PM
          </div>
        </div>
      )}

      {/* Bottom Footer Details */}
      {!isCollapsed && (
        <div className="px-3 pb-3 text-center">
          <p className="text-[10px] text-white/35 font-medium">
            &copy; 2026 DeepLayer Solutions
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Animated Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 76 : 260 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block shrink-0 z-30 sticky top-0 h-screen overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Off-Canvas Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 lg:hidden shadow-2xl"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
