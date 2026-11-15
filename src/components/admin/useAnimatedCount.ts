"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to smoothly count up from 0 to a target value using requestAnimationFrame.
 * Uses ease-out cubic curve for snappy, organic enterprise SaaS feel.
 * Automatically respects `prefers-reduced-motion`.
 */
export function useAnimatedCount(targetValue: number, duration: number = 1000): string {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      setDisplayValue(targetValue);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || targetValue === 0) {
      setDisplayValue(targetValue);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * targetValue);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration]);

  return displayValue.toLocaleString();
}
