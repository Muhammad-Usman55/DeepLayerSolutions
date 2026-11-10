"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";

interface AdminHeaderProps {
  email?: string;
  role?: string;
}

export function AdminHeader({ email, role }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DFEDE5] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Dashboard Indicator */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo variant="default" size="sm" />
          </Link>
          <div className="h-5 w-px bg-[#DFEDE5] hidden sm:block" />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF]">
            <Shield className="w-3 h-3" />
            <span>Admin Console</span>
          </span>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* User Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFCF9] border border-[#DFEDE5] text-xs">
            <div className="w-5 h-5 rounded-full bg-[#008F53] text-white flex items-center justify-center font-bold text-[10px]">
              {email ? email.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="font-medium text-[#142A27] max-w-[150px] truncate">
              {email}
            </span>
            <span className="uppercase text-[10px] font-bold tracking-wider text-[#008F53] bg-[#E9FFF2] px-1.5 py-0.5 rounded">
              {role || "admin"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
            title="Sign out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{loggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

