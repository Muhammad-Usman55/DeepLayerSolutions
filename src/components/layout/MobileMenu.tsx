"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  ArrowRight,
  ChevronDown,
  Globe,
  Gauge,
  Layout,
  Zap,
  Bot,
  Eye,
  Brain,
  SearchCheck,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Compass,
  ShoppingCart,
  Store,
  Workflow,
  Activity,
  BarChart3,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Factory,
  Truck,
  Building2,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import {
  headerNavLinks,
  servicesMegaMenuData,
  ServiceNavItem,
  industriesMegaMenuData,
  IndustryNavItem,
} from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceIcons: Record<ServiceNavItem["iconName"], React.ComponentType<{ className?: string }>> = {
  Brain,
  Bot,
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Compass,
  SearchCheck,
  Gauge,
  Layout,
  Zap,
  Eye,
  ShoppingCart,
  Store,
  Workflow,
};

const industryIcons: Record<IndustryNavItem["iconName"], React.ComponentType<{ className?: string }>> = {
  Activity,
  BarChart3,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Factory,
  Truck,
  Building2,
  Briefcase,
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);

  // Prevent background scrolling while open and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] sm:max-w-sm bg-[#FAFCF9] border-l border-[#DFEDE5] p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transform-gpu will-change-transform lg:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#DFEDE5]">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-[#64736F] hover:text-[#142A27] hover:bg-[#E9FFF2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links + Accordions */}
              <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation">
                {headerNavLinks.map((item) => {
                  const isServices = item.label === "Services";
                  const isIndustries = item.label === "Industries";
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  // Services Accordion Item
                  if (isServices) {
                    return (
                      <div key={item.href} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setServicesExpanded((prev) => !prev)}
                          aria-expanded={servicesExpanded}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors text-left",
                            isActive || servicesExpanded
                              ? "bg-[#E9FFF2] text-[#008F53] font-semibold"
                              : "text-[#142A27] hover:bg-[#E9FFF2]/60"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-250 ease-out",
                              servicesExpanded ? "rotate-180 text-[#008F53]" : "text-[#64736F]"
                            )}
                          />
                        </button>

                        {/* Services Accordion List */}
                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden pl-2 pr-1 pt-1 pb-2 flex flex-col gap-1 border-l-2 border-[#008F53] ml-4 mt-1"
                            >
                              {servicesMegaMenuData.map((service) => {
                                const IconComponent = serviceIcons[service.iconName];
                                return (
                                  <Link
                                    key={service.id}
                                    href={service.href}
                                    onClick={onClose}
                                    className="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-[#E9FFF2]/60 transition-colors group"
                                  >
                                    <div className="w-7 h-7 rounded-md bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#008F53] group-hover:text-white transition-colors">
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-[#142A27] group-hover:text-[#008F53] transition-colors">
                                        {service.title}
                                      </p>
                                      <p className="text-[11px] text-[#64736F] line-clamp-1">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Industries Accordion Item
                  if (isIndustries) {
                    return (
                      <div key={item.href} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setIndustriesExpanded((prev) => !prev)}
                          aria-expanded={industriesExpanded}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors text-left",
                            isActive || industriesExpanded
                              ? "bg-[#E9FFF2] text-[#008F53] font-semibold"
                              : "text-[#142A27] hover:bg-[#E9FFF2]/60"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-250 ease-out",
                              industriesExpanded ? "rotate-180 text-[#008F53]" : "text-[#64736F]"
                            )}
                          />
                        </button>

                        {/* Industries Accordion List */}
                        <AnimatePresence>
                          {industriesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden pl-2 pr-1 pt-1 pb-2 flex flex-col gap-1 border-l-2 border-[#008F53] ml-4 mt-1"
                            >
                              {industriesMegaMenuData.map((industry) => {
                                const IconComponent = industryIcons[industry.iconName];
                                return (
                                  <Link
                                    key={industry.id}
                                    href={industry.href}
                                    onClick={onClose}
                                    className="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-[#E9FFF2]/60 transition-colors group"
                                  >
                                    <div className="w-7 h-7 rounded-md bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#008F53] group-hover:text-white transition-colors">
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-[#142A27] group-hover:text-[#008F53] transition-colors">
                                        {industry.title}
                                      </p>
                                      <p className="text-[11px] text-[#64736F] line-clamp-1">
                                        {industry.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Regular Nav Links
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        isActive
                          ? "bg-[#E9FFF2] text-[#008F53] font-semibold"
                          : "text-[#142A27] hover:bg-[#E9FFF2]/60 hover:text-[#008F53]"
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#A8C7B0]" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer with Let's Talk CTA & Contact Details */}
            <div className="pt-6 border-t border-[#DFEDE5] flex flex-col gap-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#008F53] text-white font-semibold text-sm hover:bg-[#007343] shadow-md transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs text-[#64736F] hover:text-[#008F53] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
