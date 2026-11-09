"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  MailCheck,
  ShieldAlert,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Contact Inquiries",
    href: "/admin/inquiries",
    icon: Inbox,
    exact: false,
  },
  {
    label: "Newsletter Subscribers",
    href: "/admin/subscribers",
    icon: Users,
    exact: false,
  },
  {
    label: "Email Audit Logs",
    href: "/admin/emails",
    icon: MailCheck,
    exact: false,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 px-1 border-b border-[#DFEDE5] bg-[#FAFCF9] text-xs sm:text-sm font-semibold select-none scrollbar-none">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-[#008F53] text-white shadow-2xs font-bold"
                : "text-[#64736F] hover:text-[#142A27] hover:bg-white"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#64736F]"}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

