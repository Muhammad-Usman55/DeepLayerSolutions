import type { Metadata } from "next";
import { Mail, Phone, MapPin, Headphones, ShieldCheck } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact DeepLayer Solutions",
  description:
    "Get in touch with DeepLayer Solutions for custom software development, AI model architecture, and digital engineering partnerships.",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      {/* Contact Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E8F5E9]/50 via-[#FAFCF9] to-transparent border-b border-[#E3EDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Contact", href: "/contact" }]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F5E9] text-[#075C32] border border-[#C4D9C8] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#159B50] animate-pulse" />
                Let&apos;s Connect
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101C19] leading-tight">
                Let&apos;s Build Something <br />
                <span className="text-[#087A3D]">Amazing Together.</span>
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-[#65736D] leading-relaxed max-w-2xl font-normal">
                Tell us about your project, system architecture, or machine learning challenges, and let&apos;s explore how DeepLayer Solutions can engineer the right solution.
              </p>
            </div>

            {/* Stylized Headphones / Support Communication Tech Visual */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#E8F5E9] to-[#D4EBD6] p-8 flex items-center justify-center border border-[#C4D9C8] shadow-lg">
                <div className="absolute inset-0 rounded-full bg-radial from-[#34D399]/20 to-transparent blur-xl" />
                <div className="relative z-10 w-24 h-24 rounded-3xl bg-white shadow-xl border border-[#E3EDE5] flex items-center justify-center text-[#087A3D]">
                  <Headphones className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Contact Grid (Info Cards + Form) */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Contact Details (Cols 1-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#101C19]">
                  Get in Touch Directly
                </h2>
                <p className="mt-2 text-sm text-[#65736D] leading-relaxed">
                  Have an urgent inquiry or prefer discussing via direct channels? Reach out using the verified endpoints below.
                </p>
              </div>

              {/* Office Location Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A0AEA7] block">
                    Our Office
                  </span>
                  <span className="text-base font-bold text-[#101C19] block mt-0.5">
                    {siteConfig.contact.address}
                  </span>
                  <span className="text-xs text-[#65736D] mt-1 block">
                    Engineering Operations & Innovation Hub
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A0AEA7] block">
                    Email Us
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-base font-bold text-[#087A3D] hover:underline block mt-0.5"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <span className="text-xs text-[#65736D] mt-1 block">
                    Average response time: &lt; 24 hours
                  </span>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#087A3D] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A0AEA7] block">
                    Call Us
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="text-base font-bold text-[#101C19] hover:text-[#087A3D] block mt-0.5"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <span className="text-xs text-[#65736D] mt-1 block">
                    {siteConfig.contact.availability}
                  </span>
                </div>
              </div>

              {/* Assurance Banner */}
              <div className="p-5 rounded-2xl bg-[#F4FAF3] border border-[#C4D9C8] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#159B50] shrink-0 mt-0.5" />
                <p className="text-xs text-[#075C32] leading-relaxed">
                  <strong>Strict Confidentiality:</strong> All shared technical blueprints, designs, and inquiries are protected under strict non-disclosure obligations.
                </p>
              </div>
            </div>

            {/* Contact Form (Cols 6-12) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
