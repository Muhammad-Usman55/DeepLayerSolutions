"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Loader2 } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface AdminToastContextType {
  toast: (item: Omit<ToastItem, "id">) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  loading: (title: string, description?: string) => string;
  dismiss: (id: string) => void;
}

const AdminToastContext = createContext<AdminToastContextType | null>(null);

export function useAdminToast() {
  const ctx = useContext(AdminToastContext);
  if (!ctx) {
    throw new Error("useAdminToast must be used within an AdminToastProvider");
  }
  return ctx;
}

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, type, duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, description, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (type !== "loading" && duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  const success = useCallback(
    (title: string, description?: string) => toast({ title, description, type: "success" }),
    [toast]
  );

  const error = useCallback(
    (title: string, description?: string) => toast({ title, description, type: "error", duration: 5000 }),
    [toast]
  );

  const warning = useCallback(
    (title: string, description?: string) => toast({ title, description, type: "warning" }),
    [toast]
  );

  const info = useCallback(
    (title: string, description?: string) => toast({ title, description, type: "info" }),
    [toast]
  );

  const loading = useCallback(
    (title: string, description?: string) => toast({ title, description, type: "loading", duration: 0 }),
    [toast]
  );

  return (
    <AdminToastContext.Provider value={{ toast, success, error, warning, info, loading, dismiss }}>
      {children}

      {/* Fixed Toast Viewport (Top Right) */}
      <div
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none px-3 sm:px-0"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 35,
              }}
              className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border shadow-xl p-3.5 flex items-start gap-3 relative overflow-hidden"
              style={{
                borderColor:
                  t.type === "success"
                    ? "#A7F3D0"
                    : t.type === "error"
                    ? "#FECDD3"
                    : t.type === "warning"
                    ? "#FDE68A"
                    : "#DFEDE5",
              }}
            >
              {/* Type Icon */}
              <div className="shrink-0 mt-0.5">
                {t.type === "success" && (
                  <div className="w-6 h-6 rounded-full bg-[#E9FFF2] flex items-center justify-center text-[#008F53]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                {t.type === "error" && (
                  <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
                {t.type === "warning" && (
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                )}
                {t.type === "info" && (
                  <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                    <Info className="w-4 h-4" />
                  </div>
                )}
                {t.type === "loading" && (
                  <div className="w-6 h-6 rounded-full bg-[#E9FFF2] flex items-center justify-center text-[#008F53]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}
              </div>

              {/* Text Details */}
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs font-bold text-[#142A27] leading-tight">{t.title}</p>
                {t.description && (
                  <p className="text-[11px] text-[#64736F] mt-0.5 leading-snug">{t.description}</p>
                )}
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="p-1 rounded-lg text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Animated Progress Bar */}
              {t.duration && t.duration > 0 && (
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: t.duration / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{
                    backgroundColor:
                      t.type === "success"
                        ? "#008F53"
                        : t.type === "error"
                        ? "#E11D48"
                        : t.type === "warning"
                        ? "#D97706"
                        : "#0284C7",
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AdminToastContext.Provider>
  );
}
