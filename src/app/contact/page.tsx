import type { Metadata } from "next";
import { Mail, Phone, MapPin, Headphones, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact DeepLayer Solutions",
  description:
    "Get in touch with DeepLayer Solutions for custom software development, AI model architecture, and digital engineering partnerships.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      {/* Contact Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#E9FFF2]/50 via-[#FAFCF9] to-transparent border-b border-[#DFEDE5]">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: "Contact", href: "/contact" }]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <Eyebrow variant="chip" className="mb-4">
                Let&apos;s Connect
              </Eyebrow>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#142A27] leading-tight">
                Let&apos;s Build Something <br />
                <span className="text-[#008F53]">Amazing Together.</span>
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-[#64736F] leading-relaxed max-w-2xl font-normal">
                Tell us about your project, system architecture, or machine learning challenges, and let&apos;s explore how DeepLayer Solutions can engineer the right solution.
              </p>
            </div>

            {/* Stylized Headphones / Support Communication Tech Visual */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#E9FFF2] to-[#D5F9E6] p-8 flex items-center justify-center border border-[#DFEDE5] shadow-lg">
                <div className="absolute inset-0 rounded-full bg-radial from-[#00B86B]/20 to-transparent blur-xl" />
                <div className="relative z-10 w-24 h-24 rounded-3xl bg-white shadow-xl border border-[#DFEDE5] flex items-center justify-center text-[#008F53]">
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
                <h2 className="text-2xl font-extrabold text-[#142A27]">
                  Get in Touch Directly
                </h2>
                <p className="mt-2 text-sm text-[#64736F] leading-relaxed">
                  Have an urgent inquiry or prefer discussing via direct channels? Reach out using the verified endpoints below.
                </p>
              </div>

              {/* Office Location Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64736F] block">
                    Our Office
                  </span>
                  <span className="text-base font-bold text-[#142A27] block mt-0.5">
                    {siteConfig.contact.address}
                  </span>
                  <span className="text-xs text-[#64736F] mt-1 block">
                    Engineering Operations & Innovation Hub
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64736F] block">
                    Email Us
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-base font-bold text-[#008F53] hover:underline block mt-0.5"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <span className="text-xs text-[#64736F] mt-1 block">
                    Average response time: &lt; 24 hours
                  </span>
                </div>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#64736F] block">
                      Call & WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#008F53] bg-[#E9FFF2] border border-[#DFEDE5] px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-[2px] bg-[#008F53]" />
                      Active
                    </span>
                  </div>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="text-base font-bold text-[#142A27] hover:text-[#008F53] block mt-0.5"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold shadow-xs hover:bg-[#20ba5a] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                  <span className="text-xs text-[#64736F] mt-2 block">
                    {siteConfig.contact.availability}
                  </span>
                </div>
              </div>

              {/* LinkedIn Direct Connect Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64736F] block">
                    Company LinkedIn
                  </span>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#0077B5] hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <span>DeepLayer Solutions</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-[#64736F] mt-1 block">
                    Official corporate updates & verified enterprise presence
                  </span>
                </div>
              </div>

              {/* Assurance Banner */}
              <div className="p-5 rounded-2xl bg-[#E9FFF2] border border-[#DFEDE5] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#008F53] shrink-0 mt-0.5" />
                <p className="text-xs text-[#008F53] leading-relaxed">
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
