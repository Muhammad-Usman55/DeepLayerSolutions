"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 20,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: FadeInProps) {
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

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      initial={initial}
      animate={animate}
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
