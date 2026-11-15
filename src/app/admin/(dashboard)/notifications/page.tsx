"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bell,
  Inbox,
  Users,
  Mail,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "inquiry" | "application" | "subscriber" | "alert";
  title: string;
  message: string;
  link: string;
  createdAt: string;
  isRead: boolean;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/notifications");
      const json = await res.json();
      if (res.ok && json.success) {
        setNotifications(json.notifications || []);
      } else {
        setError(json.message || "Failed to load notifications.");
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllRead = () => {
    const all = new Set(notifications.map((n) => n.id));
    setReadIds(all);
  };

  const markSingleRead = (id: string) => {
    const updated = new Set(readIds);
    updated.add(id);
    setReadIds(updated);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead && !readIds.has(n.id);
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead && !readIds.has(n.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Notification Center
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-xs">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Real-time operational alerts for contact submissions, candidate applications, and dispatch health.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchNotifications}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
            title="Refresh stream"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#DFEDE5] bg-white text-xs font-semibold text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#008F53]" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "all"
              ? "bg-[#008F53] text-white shadow-xs"
              : "bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "unread"
              ? "bg-[#008F53] text-white shadow-xs"
              : "bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          type="button"
          onClick={() => setFilter("application")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "application"
              ? "bg-[#008F53] text-white shadow-xs"
              : "bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          Applications
        </button>

        <button
          type="button"
          onClick={() => setFilter("inquiry")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "inquiry"
              ? "bg-[#008F53] text-white shadow-xs"
              : "bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          Inquiries
        </button>

        <button
          type="button"
          onClick={() => setFilter("subscriber")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "subscriber"
              ? "bg-[#008F53] text-white shadow-xs"
              : "bg-white border border-[#DFEDE5] text-[#64736F] hover:text-[#142A27]"
          }`}
        >
          Subscribers
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs divide-y divide-[#DFEDE5]">
        {loading ? (
          <div className="py-16 text-center text-[#64736F]">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#008F53] animate-spin" />
              <span className="text-xs">Loading operational alerts...</span>
            </div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-16 text-center text-[#64736F] space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#142A27]">All Caught Up</h3>
            <p className="text-xs text-[#64736F]">No notifications match your active filter.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isUnread = !notif.isRead && !readIds.has(notif.id);

            let Icon = Inbox;
            let iconBg = "bg-[#E9FFF2] text-[#008F53]";
            if (notif.type === "application") {
              Icon = Users;
              iconBg = "bg-indigo-50 text-indigo-600";
            } else if (notif.type === "subscriber") {
              Icon = Mail;
              iconBg = "bg-teal-50 text-teal-600";
            } else if (notif.type === "alert") {
              Icon = AlertCircle;
              iconBg = "bg-rose-50 text-rose-600";
            }

            return (
              <div
                key={notif.id}
                className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                  isUnread ? "bg-[#FAFCF9]" : "hover:bg-neutral-50/50"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#142A27] truncate">
                      {notif.title}
                    </h4>
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#64736F] leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[11px] text-[#A0AEA7] font-mono mt-2 block">
                    {new Date(notif.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={notif.link}
                    onClick={() => markSingleRead(notif.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#DFEDE5] text-xs font-semibold text-[#142A27] hover:border-[#008F53] hover:text-[#008F53] transition-colors"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
