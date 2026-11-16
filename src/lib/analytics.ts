"use client";

/**
 * Google Analytics 4 (GA4) Analytics & Event Tracking Engine
 * Measurement ID: G-VD708J25D8
 * DeepLayer Solutions (https://www.deeplayersolutions.com)
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Safely dispatches a custom event to Google Analytics 4 (via gtag or dataLayer).
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  } catch (err) {
    // Fail silently in production
    console.debug("[GA4 Dispatch]", err);
  }
}

/**
 * 1. Contact Form Submissions
 * Triggered when a visitor successfully submits the contact / consultation form.
 */
export function trackContactFormSubmit(details?: {
  service?: string;
  hasCompany?: boolean;
  referenceNumber?: string;
}): void {
  trackEvent("contact_form_submit", {
    service: details?.service || "General Inquiry",
    has_company: details?.hasCompany ?? false,
    reference_number: details?.referenceNumber || "unknown",
    timestamp: new Date().toISOString(),
  });

  // Recommended GA4 standard conversion event
  trackEvent("generate_lead", {
    currency: "USD",
    value: 1,
    lead_type: "contact_form",
    service: details?.service,
  });
}

/**
 * 2. Email Button Clicks
 * Triggered whenever a visitor clicks any mailto link.
 */
export function trackEmailClick(source: string, emailAddress?: string): void {
  trackEvent("email_click", {
    source_location: source,
    email: emailAddress || "deeplayersolutions@gmail.com",
    timestamp: new Date().toISOString(),
  });
}

/**
 * 3. WhatsApp Button Clicks
 * Triggered whenever a visitor clicks any WhatsApp contact link.
 */
export function trackWhatsAppClick(source: string): void {
  trackEvent("whatsapp_click", {
    source_location: source,
    contact_method: "whatsapp",
    timestamp: new Date().toISOString(),
  });
}

/**
 * 4. Get a Quote / Consultation Button Clicks
 * Triggered when a visitor clicks key action buttons to request a quote or book a consultation.
 */
export function trackQuoteButtonClick(buttonText: string, source: string): void {
  trackEvent("quote_button_click", {
    button_text: buttonText,
    source_location: source,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 5. Service Page Visits
 * Triggered when a visitor loads a service hub or service detail page.
 */
export function trackServicePageView(
  serviceName: string,
  serviceSlug: string,
  category?: string
): void {
  trackEvent("service_page_view", {
    service_name: serviceName,
    service_slug: serviceSlug,
    category: category || "Engineering",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Global Document Click Listener
 * Automatically captures Email clicks, WhatsApp clicks, and Quote button clicks
 * without requiring manual click bindings across dozens of scattered files.
 */
export function initGlobalAnalyticsListeners(): () => void {
  if (typeof document === "undefined") return () => {};

  const handleClick = (e: MouseEvent) => {
    const el = (e.target as HTMLElement)?.closest("a, button");
    if (!el) return;

    const href = el.getAttribute("href") || "";
    const text = el.textContent?.trim().replace(/\s+/g, " ") || "";

    // 1. Email click detection (mailto:)
    if (href.startsWith("mailto:")) {
      const email = href.replace("mailto:", "").split("?")[0];
      trackEmailClick("document_link", email);
      return;
    }

    // 2. WhatsApp click detection (wa.me or api.whatsapp.com)
    if (href.includes("wa.me") || href.includes("whatsapp.com")) {
      trackWhatsAppClick("document_link");
      return;
    }

    // 3. Get a Quote / Consultation CTA click detection
    const isQuoteAction =
      /get a quote|book a consultation|book a technical consultation|let's talk|let's discuss|schedule consultation|schedule sector consultation|start your project|start a project|request quote/i.test(
        text
      );

    if (isQuoteAction) {
      trackQuoteButtonClick(text, href || "button");
    }
  };

  document.addEventListener("click", handleClick, { capture: true, passive: true });

  return () => {
    document.removeEventListener("click", handleClick, { capture: true });
  };
}
