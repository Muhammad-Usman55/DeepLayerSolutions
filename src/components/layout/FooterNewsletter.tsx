"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you! You're subscribed to DeepLayer Solutions insights.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error occurred. Please check your connection.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E9FFF2]/95 via-[#F3FFF7] to-[#E9FFF2]/95 border border-[#DFEDE5] shadow-[0_4px_28px_-6px_rgba(0,184,107,0.08)] p-6 sm:p-8 lg:p-9 mb-12 sm:mb-16">
      {/* Decorative Light Radial Ambience */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#34D399]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 relative z-10">
        {/* Left Side: 3D Paper Plane & Heading */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* 3D Paper Plane Illustration */}
          <div className="shrink-0 relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <svg
              viewBox="0 0 80 80"
              className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,184,107,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dotted Flight Trail */}
              <path
                d="M10 58 C 16 64, 26 62, 34 50 C 40 40, 48 38, 56 42"
                stroke="#00B86B"
                strokeWidth="2"
                strokeDasharray="3 3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.65"
              />
              {/* 3D Origami Paper Plane */}
              <g transform="translate(18, 12)">
                {/* Main Body Wing Left */}
                <path
                  d="M48 6 L6 32 L22 36 L48 6 Z"
                  fill="url(#planeGradLeft)"
                />
                {/* Main Body Wing Right */}
                <path
                  d="M48 6 L22 36 L30 46 L48 6 Z"
                  fill="url(#planeGradRight)"
                />
                {/* Fold Underbody */}
                <path
                  d="M22 36 L26 44 L30 38 Z"
                  fill="#008F53"
                />
              </g>
              <defs>
                <linearGradient id="planeGradLeft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="50%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#00B86B" />
                </linearGradient>
                <linearGradient id="planeGradRight" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#008F53" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
              Stay Updated with <span className="text-[#00B86B]">DeepLayer Solutions</span>
            </h3>
            <p className="text-sm text-[#64736F] mt-1 font-normal">
              Get the latest updates, tech insights and exclusive offers.
            </p>
          </div>
        </div>

        {/* Right Side: Subscription Input Field */}
        <div className="w-full lg:max-w-md">
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
            <div className="flex items-center bg-white border border-[#DFEDE5] rounded-full p-1.5 pl-4 shadow-2xs focus-within:border-[#00B86B] focus-within:ring-2 focus-within:ring-[#00B86B]/20 transition-all">
              <Mail className="w-4 h-4 text-[#64736F] mr-2 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                disabled={status === "loading"}
                className="w-full bg-transparent text-sm text-[#142A27] placeholder:text-[#64736F]/70 focus:outline-none disabled:opacity-50"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#00B86B] hover:bg-[#008F53] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all shrink-0 active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>

            {/* Validation Feedback Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#008F53] px-3 pt-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-rose-600 px-3 pt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}

