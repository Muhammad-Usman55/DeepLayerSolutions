"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Never run on admin routes to prevent table/sidebar scroll interference
    if (pathname.startsWith("/admin")) {
      return;
    }

    // 2. CRITICAL PERFORMANCE RULE: Never hijack touch scroll on mobile / touch devices.
    // iOS and Android have native 120Hz compositor-thread momentum scrolling.
    // Intercepting touch in JavaScript causes severe mobile lag, stutter, and hanging.
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024);

    if (isTouchDevice) {
      return;
    }

    // 3. Desktop-only responsive, ultra-lightweight smooth wheel scrolling
    const instance = new Lenis({
      duration: 0.75, // Snappy & luxurious without sluggish inertia drag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // Direct 1:1 response to mouse wheel notches
      touchMultiplier: 0, // NEVER intercept touch gestures
      syncTouch: false,
      anchors: true,
      respectReducedMotion: true,
      prevent: (node) => {
        return (
          node.classList?.contains("no-lenis") ||
          node.closest?.("[data-lenis-prevent]") !== null ||
          node.closest?.("[data-lenis-prevent-vertical]") !== null
        );
      },
    });

    lenisRef.current = instance;
    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const onResize = () => {
      instance.resize();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [pathname]);

  // Handle route changes: smoothly scroll to target hash or reset to top
  useEffect(() => {
    if (!lenisRef.current || pathname.startsWith("/admin")) return;

    if (typeof window !== "undefined" && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        lenisRef.current.scrollTo(target as HTMLElement, {
          offset: -80, // compensate for fixed navbar
          immediate: false,
          duration: 0.6,
        });
        return;
      }
    }

    // Default to page top on route transition
    lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
