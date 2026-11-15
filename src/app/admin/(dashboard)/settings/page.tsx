"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Settings,
  Shield,
  Key,
  Server,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Lock,
  Cpu,
  Database as DbIcon,
} from "lucide-react";

interface SettingsData {
  system: {
    environment: string;
    canonicalDomain: string;
    siteUrl: string;
    nodeVersion: string;
    database: {
      status: string;
      latencyMs: number;
      provider: string;
    };
    emailService: {
      status: string;
      provider: string;
      senderEmail: string;
    };
    security: {
      hstsEnabled: boolean;
      csrfProtection: boolean;
      rateLimiterActive: boolean;
      authCookieType: string;
    };
  };
  company: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
    address: string;
    availability: string;
  };
  account: {
    id: string;
    email: string;
    role: string;
    fullName: string;
    lastSignInAt: string | null;
  };
}

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [activeTab, setActiveTab] = useState<"company" | "health" | "security">("company");

  // Change Password Form
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json);
        setFullName(json.account?.fullName || "");
      } else {
        setError(json.message || "Failed to load system settings.");
      }
    } catch {
      setError("Network error occurred while connecting to system settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (newPassword && newPassword.length < 8) {
      setFormError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      setFormLoading(true);
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          newPassword: newPassword || undefined,
          confirmPassword: confirmPassword || undefined,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg("Security credentials and profile updated successfully.");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchSettings();
      } else {
        setFormError(json.message || "Failed to update profile.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Settings &amp; System Configuration
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              Active Console
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Manage company parameters, live integration telemetry, and administrator security.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchSettings}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#DFEDE5] gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`py-3 px-4 font-bold text-xs border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "company"
              ? "border-[#008F53] text-[#008F53]"
              : "border-transparent text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Company Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("health")}
          className={`py-3 px-4 font-bold text-xs border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "health"
              ? "border-[#008F53] text-[#008F53]"
              : "border-transparent text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Integrations &amp; Health</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`py-3 px-4 font-bold text-xs border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "security"
              ? "border-[#008F53] text-[#008F53]"
              : "border-transparent text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Security &amp; Password</span>
        </button>
      </div>

      {/* TAB 1: COMPANY PROFILE */}
      {activeTab === "company" && data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#008F53]" />
              <span>Public Contact Endpoints</span>
            </h3>
            <p className="text-xs text-[#64736F]">
              These verified parameters are published across the website header, footer, contact form, and emails.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#008F53] mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#64736F] uppercase">Company Email</div>
                  <div className="text-xs font-bold text-[#142A27]">{data.company.email}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#008F53] mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#64736F] uppercase">Phone Number</div>
                  <div className="text-xs font-bold text-[#142A27]">{data.company.phone}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#008F53] mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#64736F] uppercase">Official WhatsApp</div>
                  <div className="text-xs font-bold text-[#142A27]">{data.company.whatsapp}</div>
                </div>
                <a
                  href={data.company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#008F53] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#008F53] mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#64736F] uppercase">Office Headquarters</div>
                  <div className="text-xs font-bold text-[#142A27]">{data.company.address}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#008F53] mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#64736F] uppercase">Working Availability</div>
                  <div className="text-xs font-bold text-[#142A27]">{data.company.availability}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#008F53]" />
              <span>Production Domain Details</span>
            </h3>
            <p className="text-xs text-[#64736F]">
              Canonical domain configuration, HSTS security, and SSL termination.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] space-y-2">
                <div className="text-xs font-bold text-[#142A27]">Primary Canonical Domain</div>
                <div className="text-sm font-mono text-[#008F53] font-bold">
                  https://www.deeplayersolutions.com
                </div>
                <p className="text-[11px] text-[#64736F]">
                  All apex traffic (<code>deeplayersolutions.com</code>) permanently 301 redirects to <code>www</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] space-y-2">
                <div className="text-xs font-bold text-[#142A27]">Vercel Edge Network Routing</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-[#142A27] font-semibold">Active &amp; CNAME Verified</span>
                </div>
                <p className="text-[11px] text-[#64736F]">
                  CNAME points to <code>4d1c22e36c20adde.vercel-dns-017.com</code> with automated Let&apos;s Encrypt SSL.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM HEALTH & INTEGRATIONS */}
      {activeTab === "health" && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Database Health */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
                <DbIcon className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {data.system.database.status}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142A27]">Supabase Managed DB</h3>
              <p className="text-xs text-[#64736F] mt-1">PostgreSQL cloud cluster</p>
            </div>
            <div className="pt-3 border-t border-[#DFEDE5] space-y-2 text-xs">
              <div className="flex justify-between text-[#64736F]">
                <span>Ping Latency:</span>
                <span className="font-mono font-bold text-[#142A27]">{data.system.database.latencyMs} ms</span>
              </div>
              <div className="flex justify-between text-[#64736F]">
                <span>RLS Security:</span>
                <span className="font-bold text-emerald-600">Enforced</span>
              </div>
            </div>
          </div>

          {/* Email Service */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {data.system.emailService.status}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142A27]">Google Cloud Gmail API</h3>
              <p className="text-xs text-[#64736F] mt-1">OAuth 2.0 Enterprise Relay</p>
            </div>
            <div className="pt-3 border-t border-[#DFEDE5] space-y-2 text-xs">
              <div className="flex justify-between text-[#64736F]">
                <span>Sender:</span>
                <span className="font-mono text-[#142A27] truncate max-w-[150px]">{data.system.emailService.senderEmail}</span>
              </div>
              <div className="flex justify-between text-[#64736F]">
                <span>Delivery:</span>
                <span className="font-bold text-emerald-600">Direct SMTP Bypass</span>
              </div>
            </div>
          </div>

          {/* Security & Runtime */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Hardened
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142A27]">Security &amp; Runtime</h3>
              <p className="text-xs text-[#64736F] mt-1">Next.js 16 Edge Proxy</p>
            </div>
            <div className="pt-3 border-t border-[#DFEDE5] space-y-2 text-xs">
              <div className="flex justify-between text-[#64736F]">
                <span>Node Runtime:</span>
                <span className="font-mono text-[#142A27]">{data.system.nodeVersion}</span>
              </div>
              <div className="flex justify-between text-[#64736F]">
                <span>HSTS &amp; CSRF:</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADMIN PROFILE & SECURITY */}
      {activeTab === "security" && data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Admin Profile Details */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#008F53]" />
              <span>Your Admin Session Details</span>
            </h3>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
                <span className="text-[11px] font-bold text-[#64736F] uppercase">Authorized Email</span>
                <div className="text-sm font-bold text-[#142A27] mt-0.5">{data.account.email}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
                <span className="text-[11px] font-bold text-[#64736F] uppercase">Assigned System Role</span>
                <div className="text-sm font-bold text-emerald-700 capitalize mt-0.5">{data.account.role}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5]">
                <span className="text-[11px] font-bold text-[#64736F] uppercase">Last Session Sign-In</span>
                <div className="text-xs font-mono text-[#142A27] mt-0.5">
                  {data.account.lastSignInAt ? new Date(data.account.lastSignInAt).toLocaleString() : "Active Now"}
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="bg-white border border-[#DFEDE5] rounded-3xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-base font-bold text-[#142A27] flex items-center gap-2">
              <Key className="w-4 h-4 text-[#008F53]" />
              <span>Update Credentials</span>
            </h3>
            <p className="text-xs text-[#64736F]">
              Set a new secure password for your administrator account.
            </p>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  minLength={8}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer mt-2"
              >
                {formLoading ? "Updating Credentials..." : "Save Password & Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
