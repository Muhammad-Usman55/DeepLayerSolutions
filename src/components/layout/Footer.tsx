import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "../common/Container";
import { footerQuickLinks, footerServiceLinks, footerLegalLinks } from "@/data/navigation";
import { siteConfig } from "@/config/site";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#101C19] text-white pt-16 md:pt-20 pb-12 border-t border-[#1a2d28]">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Logo variant="footer" size="lg" />
              <p className="mt-4 text-sm text-[#A0AEA7] leading-relaxed max-w-sm">
                {siteConfig.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#34D399] font-medium tracking-wide">
                <span>{siteConfig.tagline}</span>
                <span>•</span>
                <span>{siteConfig.subtitle}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#047F5B] hover:border-[#047F5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#047F5B] hover:border-[#047F5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#047F5B] hover:border-[#047F5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                aria-label="X (Twitter)"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#047F5B] hover:border-[#047F5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 5-6) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#A0AEA7] hover:text-[#34D399] transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services (Cols 7-9) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              Our Capabilities
            </h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#A0AEA7] hover:text-[#34D399] transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Cols 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-[#A0AEA7]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#34D399] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#34D399] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#A0AEA7]">
              <span className="text-[#34D399] font-medium block mb-1">Office Hours</span>
              <span>{siteConfig.contact.availability}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B8B84]">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#34D399] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
