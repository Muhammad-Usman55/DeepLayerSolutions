"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechLayerVisualProps {
  className?: string;
}

export function TechLayerVisual({ className }: TechLayerVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural 3D tilt
  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Perspective Tilt for the entire canvas
  const rotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-10, 10]);
  const depthX = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-14, 14]);
  const depthY = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none group perspective-[1200px]",
        className
      )}
    >
      {/* 1. ATMOSPHERIC VOLUMETRIC RADIAL LIGHTING (Controlled Emerald & Mint Ambient Glow) */}
      <div className="absolute inset-0 bg-radial from-[#34D399]/20 via-[#047F5B]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-6 w-80 h-80 bg-[#047F5B]/16 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 -left-6 w-80 h-80 bg-[#34D399]/18 rounded-full blur-3xl pointer-events-none" />

      {/* 2. ISOMETRIC CYBERNETIC GROUND GRID & SONAR PEDESTAL (Emerald & Mint) */}
      <div className="absolute bottom-4 inset-x-8 h-32 flex items-center justify-center pointer-events-none">
        <div className="absolute w-80 h-24 rounded-[100%] border border-[#047F5B]/30 animate-ping opacity-25" />
        <svg viewBox="0 0 400 120" className="w-full h-full opacity-55">
          <ellipse cx="200" cy="60" rx="180" ry="48" fill="none" stroke="#047F5B" strokeWidth="1" strokeDasharray="6 6" opacity="0.35" />
          <ellipse cx="200" cy="60" rx="130" ry="34" fill="none" stroke="#047F5B" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" />
          <ellipse cx="200" cy="60" rx="75" ry="20" fill="none" stroke="#34D399" strokeWidth="1.2" opacity="0.6" />
          <line x1="20" y1="60" x2="380" y2="60" stroke="#047F5B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="200" y1="12" x2="200" y2="108" stroke="#047F5B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        </svg>
      </div>

      {/* 3. ROTATING DUAL HOLOGRAPHIC ORBITAL RINGS (Defined Emerald & Mint Trails) */}
      <div className="absolute inset-2 sm:inset-4 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 520 520" className="w-full h-full animate-[spin_50s_linear_infinite]">
          <defs>
            <linearGradient id="orbTrailGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047F5B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#047F5B" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="orbTrailGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#047F5B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#173D2F" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Primary Tilted Orbital Trail Ellipse */}
          <ellipse
            cx="260"
            cy="260"
            rx="235"
            ry="82"
            fill="none"
            stroke="url(#orbTrailGrad1)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
            transform="rotate(-26 260 260)"
          />
          {/* Secondary Counter-Tilted Orbital Trail Ellipse */}
          <ellipse
            cx="260"
            cy="260"
            rx="195"
            ry="68"
            fill="none"
            stroke="url(#orbTrailGrad2)"
            strokeWidth="1.4"
            strokeDasharray="5 5"
            transform="rotate(40 260 260)"
          />
          {/* Orbital Satellite Telemetry Nodes */}
          <circle cx="490" cy="235" r="5" fill="#34D399" stroke="#047F5B" strokeWidth="1.5" />
          <circle cx="100" cy="335" r="4.5" fill="#047F5B" stroke="#34D399" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 4. DYNAMIC SYNCHRONIZED GROUND SHADOW (Green-Tinted Ambient) */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 w-64 h-16 rounded-[100%] bg-gradient-to-r from-[#173D2F]/30 via-[#047F5B]/40 to-[#173D2F]/30 blur-xl pointer-events-none"
      />

      {/* 5. MAIN 3D ANIMATED WIREFRAME STRUCTURE (EMERALD, MINT & TRANSLUCENT PALE-MINT GLASS) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: depthX,
          y: depthY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full max-w-[460px] aspect-square flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Floating Levitation wrapper */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Central Translucent Emerald Glass Nucleus with Controlled Inner Lighting */}
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#047F5B]/25 via-[#34D399]/20 to-[#DDF5E9]/50 backdrop-blur-md border border-[#34D399]/40 shadow-[inset_0_0_45px_rgba(4,127,91,0.4),inset_0_0_18px_rgba(52,211,153,0.5),0_0_35px_rgba(4,127,91,0.22)] pointer-events-none" />

          {/* Controlled Inner Luminescent Core */}
          <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#047F5B]/35 via-[#34D399]/30 to-transparent blur-md pointer-events-none" />

          {/* Animated 3D Generative Sculpture */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/koeRHQn0tk.svg"
              alt="DeepLayer Solutions Neural Architecture"
              width={460}
              height={460}
              priority
              unoptimized
              className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(4,127,91,0.3)] group-hover:drop-shadow-[0_22px_48px_rgba(52,211,153,0.42)] transition-all duration-500"
            />

            {/* Subtle Emerald / Mint Laser Scanner Sweep */}
            <motion.div
              animate={{
                top: ["15%", "85%", "15%"],
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_12px_rgba(52,211,153,0.55)] pointer-events-none"
            >
              <div className="absolute -top-4 left-0 right-0 h-8 bg-gradient-to-b from-transparent via-[#047F5B]/15 to-transparent blur-sm" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* 6. AMBIENT EMERALD & MINT PARTICLES */}
      <div className="absolute top-16 left-12 w-2 h-2 rounded-full bg-[#34D399]/60 animate-ping pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-2.5 h-2.5 rounded-full bg-[#047F5B]/50 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-16 w-1.5 h-1.5 rounded-full bg-[#34D399]/40 animate-ping pointer-events-none" />
    </div>
  );
}
