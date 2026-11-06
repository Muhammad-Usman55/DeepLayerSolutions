"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  once = true,
  className = "",
  ...props
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    if (direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: "easeOut" as const,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
