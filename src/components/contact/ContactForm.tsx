"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "../common/Button";
import { siteConfig } from "@/config/site";
import { trackContactFormSubmit } from "@/lib/analytics";

interface FormState {
  fullName: string;
  email: string;
  company: string;
  service: string;
  subject: string;
  message: string;
  botField: string;
}

const initialForm: FormState = {
  fullName: "",
  email: "",
  company: "",
  service: "AI & Machine Learning",
  subject: "",
  message: "",
  botField: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyReference = async () => {
    if (!referenceNumber) return;
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid business email.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please describe your project or requirements.";
    } else if (form.message.trim().length < 15) {
      newErrors.message = "Please provide at least 15 characters describing your project.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data?.message ||
            `Unable to submit message at this time. Please try again or reach out directly at ${siteConfig.contact.email}.`
        );
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setReferenceNumber(data?.referenceNumber || null);
      trackContactFormSubmit({
        service: form.service,
        hasCompany: Boolean(form.company.trim()),
        referenceNumber: data?.referenceNumber || undefined,
      });
      setForm(initialForm);
      setErrors({});
      setServerError(null);
    } catch {
      setServerError(
        `Network connection error. Please verify your connection or contact ${siteConfig.contact.email} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#DFEDE5] shadow-lg relative">
      {isSuccess ? (
        <div className="py-6 sm:py-8 flex flex-col items-center text-center">
          {/* Animated Glowing Orb */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-[#008F53]/15 animate-ping opacity-75 pointer-events-none" />
            <div className="absolute inset-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF]" />
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#008F53] to-[#00B86B] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(0,143,83,0.30)]">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>INQUIRY REGISTERED</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            Inquiry Received
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#64736F] max-w-md leading-relaxed">
            Thank you for reaching out. Your inquiry has been routed to our senior engineering architects for technical evaluation.
          </p>

          {/* Official Tracking Ticket Card */}
          {referenceNumber && (
            <div className="w-full max-w-md mt-6 p-4 sm:p-5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] text-left">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#DFEDE5]">
                <div>
                  <span className="text-[10px] font-bold text-[#64736F] uppercase tracking-wider block">
                    Tracking Number
                  </span>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#008F53]">
                    {referenceNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-[#DFEDE5] text-[#142A27] hover:bg-[#E9FFF2] hover:text-[#008F53] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#008F53]" />
                      <span className="text-[#008F53]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#64736F]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status details */}
              <div className="space-y-2 text-xs text-[#334155]">
                <div className="flex items-center justify-between">
                  <span className="text-[#64736F]">Queue Status:</span>
                  <span className="font-semibold text-[#008F53] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#008F53] animate-pulse" />
                    Architectural Triage
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64736F]">Response Window:</span>
                  <span className="font-semibold text-[#142A27]">Within 24 business hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64736F]">Confirmation Dispatch:</span>
                  <span className="font-semibold text-[#142A27]">Delivered to your email</span>
                </div>
              </div>
            </div>
          )}

          {/* Reset / Submit Another button */}
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setReferenceNumber(null);
            }}
            className="mt-6 text-xs font-semibold text-[#64736F] hover:text-[#008F53] transition-colors cursor-pointer underline decoration-dotted"
          >
            Submit Another Inquiry &rarr;
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {serverError && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Honeypot Spam Protection Field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="botField">Leave this field empty</label>
            <input
              id="botField"
              name="botField"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.botField}
              onChange={(e) => setForm({ ...form, botField: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Usman Tariq"
                value={form.fullName}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.fullName ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={form.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.email ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
                Company / Organization
              </label>
              <input
                id="company"
                type="text"
                placeholder="Your company name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors"
              />
            </div>

            {/* Service Required */}
            <div>
              <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
                Service Required
              </label>
              <select
                id="service"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors cursor-pointer"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Cloud Solutions & DevOps">Cloud Solutions & DevOps</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="SEO">SEO &amp; Search Engine Optimization</option>
                <option value="IT Consulting">IT Consulting & Modernization</option>
                <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                <option value="ERP & POS Solutions">ERP & POS Solutions</option>
                <option value="Business Automation">Business Automation</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. AI Architecture Consultation / Custom SaaS Build"
              value={form.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                errors.subject ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
              }`}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about the challenges you're trying to solve, tech requirements, target timeline, or scope..."
              value={form.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                errors.message ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              withArrow
              isLoading={isSubmitting}
              className="w-full justify-center shadow-md shadow-[#008F53]/20 font-bold"
            >
              Send Message
            </Button>

            <p className="mt-3 text-center text-xs text-[#64736F]">
              Strict NDA protection • Direct architect review • Response within 24 business hours
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
