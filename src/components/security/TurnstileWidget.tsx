"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: (errorCode?: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          action?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error?: string) => void;
  action?: string;
  className?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  action = "submit",
  className = "",
  theme = "light",
  size = "flexible",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // If no site key is configured, do not attempt to load script
    if (!siteKey) {
      return;
    }

    if (window.turnstile) {
      setIsScriptReady(true);
      return;
    }

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const handleLoaded = () => setIsScriptReady(true);

    if (window.turnstile) {
      setIsScriptReady(true);
    } else {
      script.addEventListener("load", handleLoaded);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", handleLoaded);
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (!isScriptReady || !window.turnstile || !containerRef.current || !siteKey) {
      return;
    }

    // Render Turnstile explicitly
    try {
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme,
        size,
        callback: (token: string) => {
          onVerify(token);
        },
        "expired-callback": () => {
          if (onExpire) onExpire();
        },
        "error-callback": (errCode?: string) => {
          if (onError) onError(errCode);
        },
      });

      widgetIdRef.current = widgetId;
    } catch (e) {
      console.error("[Turnstile] Render failed:", e);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors on unmount
        }
        widgetIdRef.current = null;
      }
    };
  }, [isScriptReady, siteKey, action, theme, size, onVerify, onExpire, onError]);

  if (!siteKey) {
    return null;
  }

  return (
    <div
      className={`min-h-[65px] flex items-center justify-center overflow-hidden my-2 ${className}`}
      aria-label="Cloudflare Turnstile Verification"
    >
      <div ref={containerRef} className="max-w-full" />
    </div>
  );
}

