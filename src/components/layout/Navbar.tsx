"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  ArrowRight,
  Globe,
  Gauge,
  Layout,
  Zap,
  Bot,
  Eye,
  Brain,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { headerNavLinks, servicesMegaMenuData, ServiceNavItem } from "@/data/navigation";
import { Container } from "../common/Container";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceNavItem["iconName"], React.ComponentType<{ className?: string }>> = {
  Globe,
  Gauge,
  Layout,
  Zap,
  Bot,
  Eye,
  Brain,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change during render without an effect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setServicesOpen(false);
  }

  // Smooth scroll detection with requestAnimationFrame & zero layout shifts
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside and Escape key handler for Services dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 220);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full h-[72px] sm:h-[78px] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out will-change-[background-color,backdrop-filter]",
          isScrolled
            ? "bg-white/88 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(4,127,91,0.08)] border-b border-[#E3EDE5]"
            : "bg-[#FAFCF9]/80 backdrop-blur-xs border-b border-transparent"
        )}
      >
        <Container size="wide" className="h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: DeepLayer Logo */}
            <div className="flex items-center select-none shrink-0">
              <Logo size="md" variant="navbar" />
            </div>

            {/* Center: Desktop Navigation Floating Pill Container */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-1 xl:gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D8E6DC] shadow-[0_2px_12px_rgba(4,127,91,0.05)]"
            >
              {headerNavLinks.map((item) => {
                const isServices = item.label === "Services";
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (isServices) {
                  return (
                    <div
                      key={item.href}
                      ref={servicesDropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        className={cn(
                          "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 inline-flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B]",
                          isActive
                            ? "text-[#047F5B] font-semibold"
                            : "text-[#101C19] hover:text-[#047F5B] hover:bg-[#E8F5E9]/50"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-navbar-pill"
                            className="absolute inset-0 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/70 shadow-[0_1px_2px_rgba(4,127,91,0.05)] -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 relative z-10 transition-transform duration-250 ease-out text-[#65736D]",
                            servicesOpen && "rotate-180 text-[#047F5B]",
                            isActive && "text-[#047F5B]"
                          )}
                        />
                      </button>

                      {/* Services Mega Menu Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[640px] z-50"
                          >
                            {/* Invisible bridge prevents mouse dropout */}
                            <div className="absolute -top-3 left-0 right-0 h-4 pointer-events-auto" />

                            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-[0_16px_40px_-8px_rgba(4,127,91,0.14),0_4px_16px_rgba(16,28,25,0.06)] border border-[#D8E6DC] overflow-hidden">
                              {/* Header Badge */}
                              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3EDE5]">
                                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#047F5B] flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#159B50]" />
                                  Specialized Capabilities
                                </span>
                                <Link
                                  href="/services"
                                  onClick={() => setServicesOpen(false)}
                                  className="text-xs font-semibold text-[#047F5B] hover:text-[#03684A] transition-colors inline-flex items-center gap-1 group"
                                >
                                  <span>View all services</span>
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                              </div>

                              {/* 7 Services Grid */}
                              <div className="grid grid-cols-2 gap-2">
                                {servicesMegaMenuData.map((service) => {
                                  const IconComponent = serviceIcons[service.iconName];
                                  return (
                                    <Link
                                      key={service.id}
                                      href={service.href}
                                      onClick={() => setServicesOpen(false)}
                                      className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#E8F5E9]/60 transition-all duration-200"
                                    >
                                      <div className="shrink-0 w-9 h-9 rounded-lg bg-[#E8F5E9] group-hover/item:bg-[#047F5B] text-[#047F5B] group-hover/item:text-white flex items-center justify-center transition-colors duration-200 shadow-2xs">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#101C19] group-hover/item:text-[#047F5B] transition-colors flex items-center gap-1">
                                          <span>{service.title}</span>
                                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 text-[#047F5B]" />
                                        </p>
                                        <p className="text-xs text-[#65736D] line-clamp-1 mt-0.5 font-normal">
                                          {service.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B]",
                      isActive
                        ? "text-[#047F5B] font-semibold"
                        : "text-[#101C19] hover:text-[#047F5B] hover:bg-[#E8F5E9]/50"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-navbar-pill"
                        className="absolute inset-0 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/70 shadow-[0_1px_2px_rgba(4,127,91,0.05)] -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Let's Talk CTA & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="group relative hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-[#047F5B] text-white hover:bg-[#03684A] shadow-[0_2px_8px_rgba(4,127,91,0.18)] hover:shadow-[0_4px_16px_rgba(4,127,91,0.26)] transition-all duration-250 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B] focus-visible:ring-offset-2"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Mobile Menu Hamburger Trigger (Only below md: 768px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl text-[#101C19] hover:bg-[#E8F5E9] hover:text-[#047F5B] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B] md:hidden"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Slide-over Mobile Navigation with Services Accordion */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
