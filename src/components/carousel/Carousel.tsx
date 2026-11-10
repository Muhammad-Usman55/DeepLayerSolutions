"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { CarouselControls } from "./CarouselControls";
import { CarouselDots } from "./CarouselDots";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: React.ReactNode[];
  desktopVisible?: number; // default 3
  tabletVisible?: number; // default 2
  mobileVisible?: number; // default 1
  autoSlide?: boolean;
  interval?: number; // default 6000ms
  showControls?: boolean;
  showDots?: boolean;
  gap?: number; // in pixels, default 24
  className?: string;
  ariaLabel?: string;
}

/**
 * Recursively ensures all interactive elements (links, buttons, inputs)
 * inside a slide receive tabIndex={-1} when the slide is hidden, and tabIndex={0}
 * when the slide is visible, resolving Lighthouse accessibility errors.
 */
function injectTabIndex(node: React.ReactNode, isHidden: boolean): React.ReactNode {
  if (!React.isValidElement(node)) return node;

  const tabIndex = isHidden ? -1 : 0;
  const isInteractiveTag =
    typeof node.type === "string" &&
    ["a", "button", "input", "select", "textarea"].includes(node.type);

  const nodeProps = node.props as Record<string, unknown> | undefined;
  const isInteractive =
    isInteractiveTag ||
    Boolean(nodeProps?.href) ||
    Boolean(nodeProps?.onClick) ||
    nodeProps?.tabIndex !== undefined;

  const extraProps: Record<string, unknown> = {};
  if (isInteractive) {
    extraProps.tabIndex = tabIndex;
  }

  const children = (nodeProps as { children?: React.ReactNode } | undefined)?.children;
  if (children) {
    if (Array.isArray(children)) {
      extraProps.children = React.Children.map(children, (c) =>
        injectTabIndex(c, isHidden)
      );
    } else if (React.isValidElement(children)) {
      extraProps.children = injectTabIndex(children, isHidden);
    }
  }

  return Object.keys(extraProps).length > 0
    ? React.cloneElement(node, extraProps)
    : node;
}

export function Carousel({
  children,
  desktopVisible = 3,
  tabletVisible = 2,
  mobileVisible = 1,
  autoSlide = false,
  interval = 6000,
  showControls = true,
  showDots = true,
  gap = 24,
  className = "",
  ariaLabel = "Featured showcase",
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(desktopVisible);
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = React.Children.count(children);

  // Responsive breakpoint observer
  const updateVisibleItems = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleItems(mobileVisible);
    } else if (width < 1024) {
      setVisibleItems(tabletVisible);
    } else {
      setVisibleItems(desktopVisible);
    }
  }, [desktopVisible, tabletVisible, mobileVisible]);

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [updateVisibleItems]);

  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Keep index within bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const handleSelectDot = (idx: number) => {
    // Map dot index to corresponding slide
    const target = Math.min(idx, maxIndex);
    setCurrentIndex(target);
  };

  // Autoplay handler
  useEffect(() => {
    if (!autoSlide || isPaused || maxIndex <= 0) return;

    const timer = setInterval(() => {
      // Pause if tab is in background
      if (typeof document !== "undefined" && document.hidden) return;
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, isPaused, maxIndex, interval, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch drag swipe state
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && canPrev) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold && canNext) {
      handleNext();
    }
  };

  // Percentage width per item: accounting for gaps
  // itemWidth = calc((100% - (gap * (visibleItems - 1))) / visibleItems)
  const itemWidthPercentage = 100 / visibleItems;
  const offsetPercentage = currentIndex * itemWidthPercentage;

  // Number of pagination dots: 1 dot per visible page
  const totalPages = maxIndex + 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn("relative outline-hidden", className)}
    >
      {/* Viewport Mask */}
      <div className="overflow-hidden py-4 -my-4 px-1 -mx-1">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{
            x: `-${offsetPercentage}%`,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
            duration: 0.55,
          }}
          className="flex cursor-grab active:cursor-grabbing"
          style={{
            gap: `${gap}px`,
          }}
        >
          {React.Children.map(children, (child, idx) => {
            const isSlideActive = idx >= currentIndex && idx < currentIndex + visibleItems;
            const isHidden = !isSlideActive;
            const slideContent = injectTabIndex(child, isHidden);

            return (
              <div
                key={idx}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${totalItems}`}
                aria-hidden={isHidden}
                inert={isHidden ? true : undefined}
                className="shrink-0 transition-opacity duration-300"
                style={{
                  width: `calc(${itemWidthPercentage}% - ${(gap * (visibleItems - 1)) / visibleItems}px)`,
                }}
              >
                {slideContent}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Controls & Dots Bar */}
      {(showControls || showDots) && (
        <div className="mt-8 pt-4 flex items-center justify-between gap-4">
          {showDots && (
            <CarouselDots
              total={totalPages}
              current={currentIndex}
              onSelect={handleSelectDot}
            />
          )}

          {showControls && (
            <div className="ml-auto">
              <CarouselControls
                onPrev={handlePrev}
                onNext={handleNext}
                canPrev={canPrev}
                canNext={canNext}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

