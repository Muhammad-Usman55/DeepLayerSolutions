"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show preloader for exactly half a second (500ms)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 500);

    // Completely unmount from DOM after fade-out transition completes
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFCF9]/90 backdrop-blur-md select-none transition-opacity duration-200 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{ WebkitBackdropFilter: "blur(12px)" }}
      aria-live="polite"
      aria-label="Loading DeepLayer Solutions"
    >
      {/* Scaled Volumetric Ambient Glows */}
      <div className="absolute w-[440px] h-[440px] sm:w-[520px] sm:h-[520px] bg-[#047F5B]/18 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-[#34D399]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Brand Animated Loader SVG (Increased Prominent Size) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 relative flex items-center justify-center">
          <Image
            src="/deeplayer-animated-loader.svg"
            alt="DeepLayer Solutions"
            width={320}
            height={320}
            priority
            unoptimized
            className="w-full h-full object-contain filter drop-shadow-[0_16px_36px_rgba(4,127,91,0.28)]"
          />
        </div>
      </div>
    </div>
  );
}
