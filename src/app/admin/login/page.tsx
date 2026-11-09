"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(nextUrl);
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials or unauthorized account.");
      }
    } catch {
      setError("Network error occurred while connecting to authentication service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.4)] text-[#142A27]">
      <div className="mb-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Admin Portal
        </h1>
        <p className="text-xs sm:text-sm text-white/70 mt-1">
          Sign in with your authorized DeepLayer Solutions credentials.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-1.5">
            Staff Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@deeplayersolutions.com"
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#34D399] focus:ring-2 focus:ring-[#34D399]/20 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/80 mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#34D399] focus:ring-2 focus:ring-[#34D399]/20 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00B86B] hover:bg-[#008F53] text-white font-semibold text-sm transition-all shadow-md active:scale-98 disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Authorization...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security Disclaimer Notice */}
      <div className="mt-6 pt-5 border-t border-white/10 text-center">
        <p className="text-[11px] text-white/50 leading-relaxed">
          Restricted system. Access is strictly limited to authorized personnel. Public registration is disabled. Unauthorized access attempts are monitored and recorded.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A251D] via-[#0D2E24] to-[#0A251D] flex flex-col justify-center items-center p-4 sm:p-6 text-white select-none">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00B86B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo variant="light" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#34D399] tracking-wider uppercase mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Operations Center</span>
          </div>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-white/70">Loading authentication portal...</div>}>
          <LoginForm />
        </Suspense>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            &larr; Return to DeepLayer Solutions Website
          </Link>
        </div>
      </div>
    </div>
  );
}
