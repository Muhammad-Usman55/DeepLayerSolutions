"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminRole } from "@/types/supabase";

interface AdminDashboardShellProps {
  email?: string;
  role?: AdminRole;
  fullName?: string | null;
  children: React.ReactNode;
}

export function AdminDashboardShell({
  email,
  role = "admin",
  fullName,
  children,
}: AdminDashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#142A27] flex font-sans antialiased">
      {/* Responsive Collapsible Sidebar */}
      <AdminSidebar
        role={role}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          email={email}
          role={role}
          fullName={fullName}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

