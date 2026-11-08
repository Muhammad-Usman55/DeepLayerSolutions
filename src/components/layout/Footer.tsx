"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "../common/Container";
import { FooterNewsletter } from "./FooterNewsletter";
import { footerQuickLinks, footerServiceLinks, footerLegalLinks } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { openCookiePreferences } from "@/components/consent/ConsentContext";

// Clean vector social icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
    </svg>
  );
}

export function Footer() {
  const currentYear = 2026;

  return (
    <footer
      className="relative overflow-hidden select-none"
      aria-label="Site Footer"
    >
      {/* Background Volumetric Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-[500px] h-[400px] bg-gradient-to-tr from-[#E9FFF2]/70 via-[#F3FFF7] to-transparent rounded-full blur-3xl pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 right-10 -z-10 w-[400px] h-[400px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none hidden lg:block" />

      {/* Top Newsletter Section - Mint on Mobile, Integrated on Desktop */}
      <div className="bg-[#FAFCF9] lg:bg-white pt-8 pb-4 lg:pt-10 lg:pb-0">
        <Container size="wide">
          <FooterNewsletter />
        </Container>
      </div>

      {/* Main Footer Container: Dark Emerald on Mobile, Clean White on Desktop */}
      <div className="bg-[#0A251D] text-white lg:bg-white lg:text-[#142A27] pt-10 sm:pt-12 pb-6 sm:pb-8 border-t border-white/10 lg:border-[#DFEDE5]">
        <Container size="wide" className="relative z-10">
          {/* Main 4-Column Balanced Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-8 items-start">
            {/* Column 1: Company Branding & Socials (Cols 1-3) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <Logo variant="default" size="md" className="hidden lg:inline-flex" />
                <Logo variant="light" size="md" className="inline-flex lg:hidden" />
                <p className="mt-3 text-xs sm:text-[13px] text-white/80 lg:text-[#64736F] leading-relaxed max-w-sm font-normal">
                  {siteConfig.description}
                </p>
                <p className="mt-2 text-[11px] text-[#34D399] lg:text-[#008F53] font-semibold tracking-wide">
                  Build • Innovate • Scale
                </p>
              </div>

              {/* Social Icons Row */}
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#12382C] hover:bg-[#00B86B] text-white lg:bg-[#F0FAF4] lg:text-[#142A27] lg:hover:text-white border border-white/10 lg:border-[#DFEDE5] hover:border-[#00B86B] transition-all duration-200 flex items-center justify-center shadow-2xs"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#12382C] hover:bg-[#1877F2] text-white lg:bg-[#F0FAF4] lg:text-[#142A27] lg:hover:text-white border border-white/10 lg:border-[#DFEDE5] hover:border-[#1877F2] transition-all duration-200 flex items-center justify-center shadow-2xs"
                  aria-label="Facebook Page"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#12382C] hover:bg-[#25D366] text-white lg:bg-[#F0FAF4] lg:text-[#142A27] lg:hover:text-white border border-white/10 lg:border-[#DFEDE5] hover:border-[#25D366] transition-all duration-200 flex items-center justify-center shadow-2xs"
                  aria-label="WhatsApp Contact"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (Cols 4-5) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-3.5 rounded-full bg-[#00B86B]" />
                <h4 className="text-xs sm:text-sm font-bold text-white lg:text-[#142A27] tracking-tight">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-1.5">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs sm:text-[13px] text-white/80 hover:text-[#34D399] lg:text-[#64736F] lg:hover:text-[#00B86B] transition-colors py-0.5"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold uppercase rounded bg-[#12382C] text-[#34D399] border border-white/10 lg:bg-[#E9FFF2] lg:text-[#008F53] lg:border-[#BCE8CF]">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-3 h-3 opacity-25 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#34D399] lg:text-[#00B86B]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Capabilities (Cols 6-9) - 2-Column Responsive Subgrid */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-3.5 rounded-full bg-[#00B86B]" />
                <h4 className="text-xs sm:text-sm font-bold text-white lg:text-[#142A27] tracking-tight">
                  Our Capabilities
                </h4>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 footer-capabilities-grid">
                {footerServiceLinks.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex items-center justify-between text-xs sm:text-[13px] text-white/80 hover:text-[#34D399] lg:text-[#64736F] lg:hover:text-[#00B86B] transition-colors py-0.5"
                    >
                      <span className="truncate">{service.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-25 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#34D399] lg:text-[#00B86B] shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get In Touch (Cols 10-12) */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-3.5 rounded-full bg-[#00B86B]" />
                <h4 className="text-xs sm:text-sm font-bold text-white lg:text-[#142A27] tracking-tight">
                  Get In Touch
                </h4>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-white/80 lg:text-[#64736F]">
                {/* Location */}
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#12382C] text-[#34D399] border-white/10 lg:bg-[#F0FAF4] lg:text-[#00B86B] lg:border-[#DFEDE5] flex items-center justify-center shrink-0 border">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="truncate">{siteConfig.contact.address}</span>
                </li>

                {/* Email */}
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#12382C] text-[#34D399] border-white/10 lg:bg-[#F0FAF4] lg:text-[#00B86B] lg:border-[#DFEDE5] flex items-center justify-center shrink-0 border">
                    <Mail className="w-3 h-3" />
                  </div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-[#34D399] lg:hover:text-[#00B86B] transition-colors truncate"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#12382C] text-[#34D399] border-white/10 lg:bg-[#F0FAF4] lg:text-[#00B86B] lg:border-[#DFEDE5] flex items-center justify-center shrink-0 border">
                    <Phone className="w-3 h-3" />
                  </div>
                  <a
                    href="tel:+923166007316"
                    className="hover:text-[#34D399] lg:hover:text-[#00B86B] transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>

                {/* WhatsApp */}
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#12382C] text-[#25D366] border-white/10 lg:bg-[#F0FAF4] lg:text-[#25D366] lg:border-[#DFEDE5] flex items-center justify-center shrink-0 border">
                    <WhatsAppIcon className="w-3 h-3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#34D399] lg:hover:text-[#00B86B] transition-colors font-medium text-white lg:text-[#142A27]"
                    >
                      Chat on WhatsApp
                    </a>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#00B86B] text-white tracking-wider">
                      DIRECT
                    </span>
                  </div>
                </li>
              </ul>

              {/* Office Hours Minimal Card */}
              <div className="mt-3 p-2 rounded-lg bg-[#12382C] border border-white/10 text-white/80 lg:bg-[#F0FAF4] lg:border-[#DFEDE5] lg:text-[#64736F] text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-[#34D399] lg:text-[#00B86B] mb-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Office Hours</span>
                </div>
                <p className="font-medium leading-tight">
                  Monday – Friday: 9:00 AM – 6:00 PM (PKT)
                </p>
              </div>
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="border-t border-white/15 lg:border-[#DFEDE5] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 lg:text-[#64736F]">
            {/* Left: Copyright */}
            <p className="font-normal text-center sm:text-left">
              © {currentYear} <span className="font-semibold text-[#34D399] lg:text-[#008F53]">DeepLayer Solutions</span>. All rights reserved.
            </p>

            {/* Right: Legal Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
              {footerLegalLinks.map((legal) => (
                <React.Fragment key={legal.href}>
                  <Link
                    href={legal.href}
                    className="hover:text-[#34D399] lg:hover:text-[#00B86B] transition-colors"
                  >
                    {legal.label}
                  </Link>
                  <span className="text-white/20 lg:text-[#DFEDE5]">|</span>
                </React.Fragment>
              ))}
              <button
                type="button"
                onClick={openCookiePreferences}
                className="hover:text-[#34D399] lg:hover:text-[#00B86B] transition-colors cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Decorative Bottom Ambient Soft Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-10 pointer-events-none opacity-40 -z-10 hidden lg:block"
        viewBox="0 0 1440 40"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20 C360 40 720 0 1080 20 C1260 30 1380 15 1440 25 L1440 40 L0 40 Z"
          fill="url(#footerWaveGrad)"
        />
        <defs>
          <linearGradient id="footerWaveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E9FFF2" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#86EFAC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E9FFF2" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </footer>
  );
}
