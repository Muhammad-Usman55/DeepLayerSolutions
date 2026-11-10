"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Inbox,
  Mail,
  BarChart3,
  Globe,
  Image as ImageIcon,
  Bell,
  Shield,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { AdminRole } from "@/types/supabase";
import { canAccessRoute } from "@/lib/auth/permissions";

interface NavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string | number;
    exact?: boolean;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    title: "Recruitment (ATS)",
    items: [
      {
        label: "Jobs",
        href: "/admin/jobs",
        icon: Briefcase,
      },
      {
        label: "Applications",
        href: "/admin/applications",
        icon: Users,
      },
    ],
  },
  {
    title: "Business & Comms",
    items: [
      {
        label: "Contact Inquiries",
        href: "/admin/inquiries",
        icon: Inbox,
      },
      {
        label: "Newsletter",
        href: "/admin/subscribers",
        icon: Mail,
      },
      {
        label: "Email Audit Logs",
        href: "/admin/emails",
        icon: FileText,
      },
    ],
  },
  {
    title: "Content & Assets",
    items: [
      {
        label: "Website Content",
        href: "/admin/pages",
        icon: Globe,
      },
      {
        label: "Media Library",
        href: "/admin/media",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Intelligence & Security",
    items: [
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
      },
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        label: "Admin Users",
        href: "/admin/users",
        icon: Shield,
      },
      {
        label: "Activity Logs",
        href: "/admin/activity-logs",
        icon: FileText,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
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

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-[#DFEDE5] select-none">
      {/* Brand & Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#DFEDE5] shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 overflow-hidden transition-all"
        >
          <Logo variant="default" size="sm" />
          {!isCollapsed && (
            <span className="font-extrabold text-[#142A27] text-sm tracking-tight truncate">
              Admin<span className="text-[#008F53]">Console</span>
            </span>
          )}
        </Link>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 cursor-pointer"
          aria-label="Close mobile navigation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 cursor-pointer transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-[#DFEDE5]">
        {NAV_GROUPS.map((group) => {
          // Filter out items that the current role cannot access
          const accessibleItems = group.items.filter((item) =>
            canAccessRoute(role, item.href)
          );
          if (accessibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold text-[#64736F]/80 uppercase tracking-wider mb-1.5">
                  {group.title}
                </div>
              )}

              {accessibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#008F53] text-white shadow-2xs font-bold"
                        : "text-[#64736F] hover:text-[#142A27] hover:bg-[#FAFCF9]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? "text-white" : "text-[#64736F]"
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.href === "/admin/notifications" && unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white leading-none">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Details */}
      <div className="p-3 border-t border-[#DFEDE5] shrink-0 bg-[#FAFCF9]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#64736F] hover:text-[#142A27] hover:bg-white border border-transparent hover:border-[#DFEDE5] transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span className="truncate">Public Website</span>}
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 z-30 sticky top-0 h-screen ${
          isCollapsed ? "w-18" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Off-Canvas Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
