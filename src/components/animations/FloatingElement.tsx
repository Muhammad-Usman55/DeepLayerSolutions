"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  rotation?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  duration = 6,
  distance = 10,
  rotation = 1.5,
  delay = 0,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
        rotate: [-rotation, rotation, -rotation],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

