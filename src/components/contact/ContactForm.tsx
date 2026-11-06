"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../common/Button";
import { siteConfig } from "@/config/site";

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
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-lg relative">
      {isSuccess ? (
        <div className="py-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-extrabold text-[#142A27]">
            Inquiry Received!
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#64736F] max-w-md leading-relaxed">
            Thank you for reaching out to DeepLayer Solutions. One of our technical architects will review your project requirements and respond within 24 business hours.
          </p>

          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-8 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53]"
          >
            Send Another Message
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
