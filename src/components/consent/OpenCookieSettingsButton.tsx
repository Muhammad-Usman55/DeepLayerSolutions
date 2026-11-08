"use client";

import React from "react";
import { Settings2 } from "lucide-react";
import { openCookiePreferences } from "./ConsentContext";

export function OpenCookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#E9FFF2] text-[#008F53] hover:bg-[#D5F9E6] border border-[#BCE8CF] transition-colors cursor-pointer shadow-2xs active:scale-98"
      }
    >
      <Settings2 className="w-3.5 h-3.5" />
      <span>{children || "Manage Cookie Preferences"}</span>
    </button>
  );
}
