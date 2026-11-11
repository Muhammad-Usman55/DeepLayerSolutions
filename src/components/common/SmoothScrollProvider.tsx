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
    // Disable smooth-scrolling entirely on admin dashboards to prevent scroll conflicts
    if (pathname.startsWith("/admin")) {
      return;
    }

    // Initialize Lenis for momentum smooth vertical scrolling
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
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

    // Global resize observer so dynamic DOM additions update scroll limits
    const onResize = () => {
      instance.resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Handle route changes: smoothly scroll to target hash or reset to top
  useEffect(() => {
    if (!lenisRef.current || pathname.startsWith("/admin")) return;

    if (typeof window !== "undefined" && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        lenisRef.current.scrollTo(target as HTMLElement, {
          offset: -80, // compensate for fixed navbar
          immediate: false,
          duration: 0.8,
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

