"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * FrozenRoute preserves the router context and DOM tree of the exiting route
 * during the exit animation in Next.js App Router, preventing content flashing.
 */
function FrozenRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!LayoutRouterContext) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const pageVariants: Variants = {
  initial: (reduced?: boolean) => ({
    opacity: 0,
    y: reduced ? 0 : 10,
  }),
  animate: (reduced?: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.1 : 0.25, // 250ms entrance duration
      ease: "easeOut",
    },
  }),
  exit: (reduced?: boolean) => ({
    opacity: 0,
    y: 0, // Pure fade out without vertical distraction on exit
    transition: {
      duration: reduced ? 0.08 : 0.12, // 120ms exit duration
      ease: "easeOut",
    },
  }),
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth scroll to top on route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <>
      {/* Subtle Mint-Green Route Transition Accent Line */}
      {isMounted && (
        <motion.div
          key={`mint-accent-${pathname}`}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 0.35, ease: "easeOut", times: [0, 0.7, 1] }}
          style={{ transformOrigin: "0% 50%" }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#008F53] via-[#34D399] to-[#00B86B] z-[9999] pointer-events-none shadow-[0_0_10px_rgba(52,211,153,0.7)]"
          aria-hidden="true"
        />
      )}

      {/* Main Page Transition Container */}
      <div className="flex-1 w-full flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            custom={shouldReduceMotion ?? false}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 w-full flex flex-col will-change-transform"
          >
            <FrozenRoute>{children}</FrozenRoute>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
