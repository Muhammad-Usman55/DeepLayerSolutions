"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Bypass animation on all admin views to eliminate UI flashes and blinking
  if (pathname.startsWith("/admin")) {
    return <div className="flex-1 flex flex-col w-full">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        suppressHydrationWarning
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

