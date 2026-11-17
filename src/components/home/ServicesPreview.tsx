"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { ServiceCard } from "./services-preview/ServiceCard";
import { previewServices } from "./services-preview/types";

// Desktop-only dynamic import: zero bundle and SVG filter overhead on mobile devices
const Central3DVisual = dynamic(
  () => import("./services-preview/Central3DVisual").then((mod) => mod.Central3DVisual),
  { ssr: false }
);

export function ServicesPreview() {
  // Group into sets of 4 services per slide (2x2 grid on mobile, 4-in-a-row on desktop)
  const serviceChunks = useMemo(() => {
    const chunks: (typeof previewServices)[] = [];
    for (let i = 0; i < previewServices.length; i += 4) {
      chunks.push(previewServices.slice(i, i + 4));
    }
    return chunks;
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 35,
    skipSnaps: false,
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-sync the carousel when it mounts.
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(0);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi, serviceChunks]);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAFCF9] via-[#F4FAF6] to-[#FAFCF9] border-t border-[#E3EDE5]"
      aria-label="Our Services Preview"
    >
      {/* Background accents are deliberately restrained on small screens. */}
      <div className="services-preview-glow absolute top-0 left-1/6 -z-10 w-[600px] h-[500px] bg-gradient-to-br from-[#E8F5E9]/70 via-[#F4FAF6] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="services-preview-glow absolute bottom-10 right-10 -z-10 w-[450px] h-[450px] bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Orbital Background Grid Pattern */}
      <div
        className="services-preview-pattern absolute inset-0 -z-10 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#087A3D 0.75px, transparent 0.75px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <Container size="wide">
        {/* Mobile Section Heading */}
        <div className="services-preview-heading mb-6 lg:hidden">
          <span className="block text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#008F53]">
            What we do
          </span>
          <h2 className="mt-2 text-[28px] sm:text-3xl font-bold text-[#142A27] tracking-tight leading-[1.12] max-w-[18ch]">
            Technology that moves your business forward.
          </h2>
          <p className="text-sm text-[#64736F] mt-2 leading-relaxed max-w-lg">
            Explore the ways we help teams build, improve, and grow.
          </p>
        </div>

        {/* Upper Zone: Left 3D Central Visual & Right Content Block (Desktop Only) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 3D Visualization Area */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex items-center justify-center relative">
            <Central3DVisual />
          </div>

          {/* Right Content Area */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow variant="chip" className="mb-6">
                Our Services
              </Eyebrow>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#142A27] leading-[1.12]"
            >
              Technology That Moves Your{" "}
              <span className="text-[#008F53] relative inline-block">
                Business
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#34D399]/40 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>{" "}
              Forward.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 sm:mt-10"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#F4FAF6] border border-[#087A3D]/30 hover:border-[#087A3D] text-[#101C19] hover:text-[#087A3D] font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-300 w-fit"
              >
                <span>Explore All Services</span>
                <span
                  className="w-7 h-7 rounded-full bg-[#E8F5E9] border border-[#C4D9C8]/60 text-[#087A3D] group-hover:bg-[#087A3D] group-hover:text-white group-hover:border-[#087A3D] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Lower Zone: Premium Horizontal Card Carousel */}
        <div className="lg:mt-16">
          {/* Service count and route to the full catalog */}
          <div className="services-preview-controls mt-8 sm:mt-10 mb-5 sm:mb-7 flex items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-[#65736D]">
              {previewServices.length} services
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#008F53] hover:text-[#075B3E] transition-colors"
              >
                <span>View all services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Embla Carousel Viewport & Track */}
          <div
            className="relative overflow-hidden py-2 touch-pan-y"
            ref={emblaRef}
            data-lenis-prevent-horizontal="true"
          >
            <div className="flex touch-pan-y transform-gpu">
              {serviceChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className="flex-[0_0_100%] min-w-0 px-0.5 sm:px-1"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
                    {chunk.map((service, index) => (
                      <div key={service.id} className="h-full">
                        <ServiceCard
                          service={service}
                          index={chunkIndex * 4 + index}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls: Horizontal Prev / Next Buttons Directly Below Cards (Desktop & Mobile) */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous services slide"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
                canScrollPrev
                  ? "bg-white hover:bg-[#008F53] text-[#142A27] hover:text-white border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  : "bg-[#F4FAF6] text-[#A0AEC0] border-[#DFEDE5]/60 cursor-not-allowed opacity-40 shadow-none"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {scrollSnaps.length > 0 && (
              <span className="services-preview-slide-count hidden sm:inline font-mono text-xs tabular-nums text-[#65736D]" aria-live="polite">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(scrollSnaps.length).padStart(2, "0")}
              </span>
            )}
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next services slide"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
                canScrollNext
                  ? "bg-white hover:bg-[#008F53] text-[#142A27] hover:text-white border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  : "bg-[#F4FAF6] text-[#A0AEC0] border-[#DFEDE5]/60 cursor-not-allowed opacity-40 shadow-none"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          {scrollSnaps.length > 1 && (
            <div className="services-preview-dots mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2" aria-label="Slide navigation">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-carousel-dot
                  onClick={() => scrollTo(idx)}
                  aria-label={`Go to services slide ${idx + 1}`}
                  className="h-6 flex items-center justify-center cursor-pointer p-1 focus:outline-none group"
                  style={{ minHeight: "unset", minWidth: "unset" }}
                >
                  <span
                    className="block transition-all duration-300 rounded-full"
                    style={{
                      width: selectedIndex === idx ? "22px" : "6px",
                      height: "6px",
                      backgroundColor: selectedIndex === idx ? "#008F53" : "#DFEDE5",
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Bottom Custom Architecture Banner */}
          <div className="services-preview-architecture mt-10 sm:mt-14 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#DFEDE5] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
            <div className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#142A27]">
                Need a bespoke multi-service architecture?
              </h3>
              <p className="text-xs sm:text-sm text-[#64736F] mt-1 max-w-2xl">
                We design integrated platforms pairing autonomous AI models, modern headless e-commerce, cloud DevOps, and ERP workflows engineered for your enterprise requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#008F53] hover:bg-[#075B3E] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
