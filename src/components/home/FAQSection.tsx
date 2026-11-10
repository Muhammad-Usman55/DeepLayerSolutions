"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare, Mail, Phone } from "lucide-react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const categories = ["All", "AI & Tech", "Process & Timeline", "Security & IP"] as const;

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null); // All questions closed by default

  const filteredFaqs =
    activeCategory === "All"
      ? faqsData
      : faqsData.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-[#FAFCF9] border-t border-[#DFEDE5]"
      aria-label="Frequently Asked Questions"
    >
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/3 left-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-tr from-[#E9FFF2]/70 via-[#F8FCF9] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 w-[450px] h-[450px] bg-[#00B86B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none -z-10" />

      <Container size="wide">
        {/* Mobile Header Matching Mockup (< lg) */}
        <div className="text-center mb-6 lg:hidden">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142A27] tracking-tight">
            Frequently Asked <span className="text-[#008F53]">Questions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Sticky Column (Cols 1-5 on desktop, hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 lg:sticky lg:top-28 flex-col items-start text-left">
            <Eyebrow variant="chip" className="mb-4">
              Frequently Asked Questions
            </Eyebrow>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-[1.14]">
              Clear Answers. <br />
              <span className="text-[#008F53] relative inline-block mt-1">
                Everything You Need to Know.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#00B86B]/30 -z-10"
                  viewBox="0 0 160 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 11 C 45 4, 115 4, 156 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#64736F] leading-relaxed max-w-xl font-normal">
              Transparent answers regarding our software engineering standards, bespoke AI model integration, intellectual property ownership, and agile delivery cycles.
            </p>

            {/* Direct Contact Support Card */}
            <div className="mt-8 sm:mt-10 w-full p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#DFEDE5] shadow-[0_2px_12px_rgba(0,143,83,0.06)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#142A27]">Still have questions?</h3>
                  <p className="text-xs text-[#64736F]">Speak directly with our senior technical leads.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4 pt-3 border-t border-[#DFEDE5]">
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#008F53] text-white hover:bg-[#007343] transition-colors shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send an Inquiry</span>
                </Link>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-white border border-[#DFEDE5] text-[#142A27] hover:text-[#008F53] hover:border-[#008F53] transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Accordion Column (Cols 6-12 on desktop) */}
          <div className="lg:col-span-7 flex flex-col w-full">
            {/* Category Filter Pills (Desktop Only) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6 select-none">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53]",
                      isActive
                        ? "bg-[#008F53] text-white shadow-xs"
                        : "bg-white text-[#64736F] hover:text-[#142A27] hover:bg-[#E9FFF2]/60 border border-[#DFEDE5]"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3.5 w-full">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={cn(
                      "rounded-xl sm:rounded-2xl transition-all duration-200 border bg-white overflow-hidden",
                      isOpen
                        ? "border-[#008F53]/50 shadow-[0_4px_16px_rgba(0,143,83,0.08)] ring-1 ring-[#008F53]/15"
                        : "border-[#DFEDE5] hover:border-[#008F53]/40 shadow-2xs"
                    )}
                  >
                    <button
                      id={`faq-question-${faq.id}`}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53] faq-accordion-trigger"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <span className="shrink-0 w-6 h-6 rounded-md bg-[#E9FFF2] text-[#008F53] font-mono text-xs font-bold flex items-center justify-center">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-lg font-bold text-[#142A27] leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-250",
                          isOpen
                            ? "bg-[#008F53] text-white rotate-180"
                            : "bg-[#E9FFF2] text-[#008F53] hover:bg-[#008F53] hover:text-white"
                        )}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-question-${faq.id}`}
                          aria-label={`Frequently Asked Questions Answers — ${faq.question}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: {
                                duration: 0.25,
                                delay: 0.05,
                              },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: {
                                duration: 0.25,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: { duration: 0.15 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 border-t border-[#DFEDE5]/60 mt-1">
                            <p className="text-sm sm:text-base text-[#64736F] leading-relaxed pt-3.5 font-normal">
                              {faq.answer}
                            </p>
                            <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#008F53] uppercase tracking-wider bg-[#E9FFF2] px-2.5 py-0.5 rounded-md">
                              <span>Topic: {faq.category}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

