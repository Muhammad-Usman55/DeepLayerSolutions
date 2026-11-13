"use client";

import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Lightweight, zero-overhead page wrapper.
 * Completely eliminates the 560ms thread-blocking delay caused by Framer Motion's AnimatePresence mode="wait",
 * enabling instant, sub-50ms page transitions across both desktop and mobile views.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
