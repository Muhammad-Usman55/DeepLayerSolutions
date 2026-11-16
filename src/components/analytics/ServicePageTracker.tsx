"use client";

import { useEffect } from "react";
import { trackServicePageView } from "@/lib/analytics";

interface ServicePageTrackerProps {
  serviceName: string;
  serviceSlug: string;
  category?: string;
}

export function ServicePageTracker({
  serviceName,
  serviceSlug,
  category,
}: ServicePageTrackerProps) {
  useEffect(() => {
    trackServicePageView(serviceName, serviceSlug, category);
  }, [serviceName, serviceSlug, category]);

  return null;
}
