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
    // Skip on touch/mobile devices to keep CPU 100% idle
    if (window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
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
        "relative w-full aspect-square max-w-[340px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[520px] mx-auto flex items-center justify-center select-none group perspective-[1200px]",
        className
      )}
    >
      {/* 1. ATMOSPHERIC VOLUMETRIC RADIAL LIGHTING (Controlled Emerald & Mint Ambient Glow) */}
      <div className="absolute inset-0 bg-radial from-[#00B86B]/20 via-[#008F53]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-4 w-64 h-64 bg-[#008F53]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 -left-4 w-64 h-64 bg-[#00B86B]/16 rounded-full blur-3xl pointer-events-none" />

      {/* 2. ISOMETRIC CYBERNETIC GROUND GRID & SONAR PEDESTAL (Emerald & Mint) */}
      <div className="absolute bottom-2 sm:bottom-4 inset-x-4 sm:inset-x-8 h-28 sm:h-32 flex items-center justify-center pointer-events-none">
        <div className="absolute w-64 sm:w-80 h-20 sm:h-24 rounded-[100%] border border-[#008F53]/30 animate-ping opacity-25" />
        <svg viewBox="0 0 400 120" className="w-full h-full opacity-55">
          <ellipse cx="200" cy="60" rx="180" ry="48" fill="none" stroke="#008F53" strokeWidth="1" strokeDasharray="6 6" opacity="0.35" />
          <ellipse cx="200" cy="60" rx="130" ry="34" fill="none" stroke="#008F53" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" />
          <ellipse cx="200" cy="60" rx="75" ry="20" fill="none" stroke="#00B86B" strokeWidth="1.2" opacity="0.6" />
          <line x1="20" y1="60" x2="380" y2="60" stroke="#008F53" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="200" y1="12" x2="200" y2="108" stroke="#008F53" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        </svg>
      </div>

      {/* 3. ROTATING DUAL HOLOGRAPHIC ORBITAL RINGS (Defined Emerald & Mint Trails) */}
      <div className="absolute inset-2 sm:inset-4 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 520 520" className="w-full h-full animate-[spin_50s_linear_infinite]">
          <defs>
            <linearGradient id="orbTrailGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008F53" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#00B86B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#008F53" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="orbTrailGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00B86B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#008F53" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#075B3E" stopOpacity="0.35" />
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
          <circle cx="490" cy="235" r="5" fill="#00B86B" stroke="#008F53" strokeWidth="1.5" />
          <circle cx="100" cy="335" r="4.5" fill="#008F53" stroke="#00B86B" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 4. DYNAMIC SYNCHRONIZED GROUND SHADOW (Green-Tinted Ambient, Compositor Thread) */}
      <div className="absolute bottom-6 sm:bottom-8 w-44 sm:w-56 lg:w-64 xl:w-72 h-10 sm:h-12 rounded-[100%] bg-gradient-to-r from-[#075B3E]/25 via-[#008F53]/35 to-[#075B3E]/25 blur-xl pointer-events-none animate-pulse-shadow" />

      {/* 5. MAIN 3D ANIMATED WIREFRAME STRUCTURE (EMERALD, MINT & TRANSLUCENT PALE-MINT GLASS) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: depthX,
          y: depthY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[430px] xl:max-w-[460px] aspect-square flex items-center justify-center p-1 sm:p-2 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Floating Levitation wrapper (Hardware-accelerated CSS float) */}
        <div className="relative w-full h-full flex items-center justify-center animate-float-gentle">
          {/* Central Translucent Emerald Glass Nucleus with Controlled Inner Lighting */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full bg-gradient-to-tr from-[#008F53]/25 via-[#00B86B]/20 to-[#D5F9E6]/50 backdrop-blur-sm border border-[#00B86B]/40 shadow-[inset_0_0_30px_rgba(0,143,83,0.3),0_0_24px_rgba(0,143,83,0.18)] pointer-events-none" />

          {/* Controlled Inner Luminescent Core */}
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-38 lg:h-38 xl:w-44 xl:h-44 rounded-full bg-gradient-to-tr from-[#008F53]/35 via-[#00B86B]/30 to-transparent blur-md pointer-events-none" />

          {/* Static Ambient Glow behind SVG (Zero runtime filter overhead) */}
          <div className="absolute w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full bg-radial from-[#008F53]/30 via-[#00B86B]/15 to-transparent blur-2xl pointer-events-none -z-10" />

          {/* Animated 3D Generative Sculpture */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/koeRHQn0tk.svg"
              alt="DeepLayer Solutions Neural Architecture"
              width={640}
              height={640}
              priority
              unoptimized
              className="w-full h-full object-contain transition-all duration-500 scale-100"
            />

            {/* Subtle Emerald / Mint Laser Scanner Sweep (Compositor Thread) */}
            <div className="absolute left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#00B86B] to-transparent shadow-[0_0_12px_rgba(0,184,107,0.55)] pointer-events-none animate-laser-sweep">
              <div className="absolute -top-3 left-0 right-0 h-6 bg-gradient-to-b from-transparent via-[#008F53]/15 to-transparent blur-xs" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6. AMBIENT EMERALD & MINT PARTICLES */}
      <div className="absolute top-16 left-12 w-2 h-2 rounded-full bg-[#00B86B]/60 animate-ping pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-2.5 h-2.5 rounded-full bg-[#008F53]/50 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-16 w-1.5 h-1.5 rounded-full bg-[#00B86B]/40 animate-ping pointer-events-none" />
    </div>
  );
}
