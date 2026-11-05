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

  // Scroll detection (Top ~88px -> Scrolled ~70px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 15);
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
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "h-[70px] bg-white/90 backdrop-blur-[12px] shadow-[0_4px_24px_-4px_rgba(7,132,66,0.08)] border-b border-[#E5F7ED]/80"
            : "h-[88px] bg-[#F8FCF9] border-b border-transparent"
        )}
      >
        <Container size="wide" className="h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: DeepLayer Logo (Subtly scales without distortion) */}
            <div
              className={cn(
                "flex items-center transition-transform duration-300 origin-left select-none",
                isScrolled ? "scale-95" : "scale-100"
              )}
            >
              <Logo size="md" variant="navbar" />
            </div>

            {/* Center: Desktop Navigation Links Pill Container */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D5EADB] shadow-[0_2px_12px_rgba(7,132,66,0.06)]"
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
                          "group relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 inline-flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078442]",
                          isActive
                            ? "bg-[#E5F7ED] text-[#078442] font-semibold shadow-xs"
                            : "text-[#101C18] hover:text-[#078442] hover:bg-[#E5F7ED]/50"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200 text-[#61756B] group-hover:text-[#078442]",
                            servicesOpen && "rotate-180 text-[#078442]"
                          )}
                        />
                        {/* Hover Underline Micro-interaction */}
                        <span
                          className={cn(
                            "absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[#078442] transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100",
                            isActive && "hidden"
                          )}
                        />
                      </button>

                      {/* Services Mega Menu Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[640px] z-50"
                          >
                            <div className="bg-white rounded-2xl p-5 shadow-[0_16px_40px_-8px_rgba(7,132,66,0.14),0_4px_16px_rgba(16,28,24,0.06)] border border-[#D5EADB] overflow-hidden">
                              {/* Header Badge */}
                              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5F7ED]/80">
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#078442] flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#32C995]" />
                                  Specialized Capabilities
                                </span>
                                <Link
                                  href="/services"
                                  onClick={() => setServicesOpen(false)}
                                  className="text-xs font-semibold text-[#078442] hover:text-[#066834] transition-colors inline-flex items-center gap-1 group"
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
                                      className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#E5F7ED]/50 transition-all duration-200"
                                    >
                                      <div className="shrink-0 w-9 h-9 rounded-lg bg-[#E5F7ED] group-hover/item:bg-[#078442] text-[#078442] group-hover/item:text-white flex items-center justify-center transition-colors duration-200 shadow-xs">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#101C18] group-hover/item:text-[#078442] transition-colors flex items-center gap-1">
                                          <span>{service.title}</span>
                                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 text-[#078442]" />
                                        </p>
                                        <p className="text-xs text-[#61756B] line-clamp-1 mt-0.5 font-normal">
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
                      "group relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078442]",
                      isActive
                        ? "bg-[#E5F7ED] text-[#078442] font-semibold shadow-xs"
                        : "text-[#101C18] hover:text-[#078442] hover:bg-[#E5F7ED]/50"
                    )}
                  >
                    <span>{item.label}</span>
                    {/* Hover Underline Micro-interaction */}
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[#078442] transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100",
                        isActive && "hidden"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Let's Talk CTA & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="group relative hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-[#078442] text-white hover:bg-[#066834] shadow-sm hover:shadow-md hover:shadow-[#078442]/20 transition-all duration-200 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078442] focus-visible:ring-offset-2"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Mobile Menu Hamburger Trigger (Only below md: 768px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-[#101C18] hover:bg-[#E5F7ED] hover:text-[#078442] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078442] md:hidden"
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
