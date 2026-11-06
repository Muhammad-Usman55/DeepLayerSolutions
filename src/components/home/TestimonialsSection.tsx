"use client";

import React from "react";
import { Quote } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { testimonialsData } from "@/data/testimonials";
import { Carousel } from "../carousel/Carousel";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F4FAF3]/50 border-t border-[#E3EDE5]">
      <Container size="wide">
        <SectionHeading
          badge="Testimonials"
          title="Trusted by Innovators Worldwide."
          highlight="Innovators Worldwide"
          subtitle="Hear what our engineering and enterprise partners say about collaborating with DeepLayer Solutions."
        />

        {/* Testimonials Carousel (Auto-slide 6s, 3 Desktop, 2 Tablet, 1 Mobile) */}
        <div className="mt-8">
          <Carousel
            desktopVisible={3}
            tabletVisible={2}
            mobileVisible={1}
            autoSlide={true}
            interval={6000}
            gap={24}
            showControls={true}
            showDots={true}
            ariaLabel="Client testimonials carousel"
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#047F5B] flex items-center justify-center mb-5">
                    <Quote className="w-5 h-5" />
                  </div>
                  <p className="text-base sm:text-lg text-[#101C19] font-medium leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E3EDE5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#047F5B] to-[#34D399] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                    {item.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#101C19]">{item.clientName}</h4>
                    <p className="text-xs text-[#65736D]">
                      {item.clientRole}, <span className="text-[#047F5B] font-medium">{item.companyName}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
