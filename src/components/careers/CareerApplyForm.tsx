"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { CheckCircle2, AlertCircle, Send, Sparkles, FileText, Link2, User, Mail, Phone } from "lucide-react";
import { Button } from "../common/Button";

interface CareerFormState {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  portfolioOrGithub: string;
  resumeUrl: string;
  coverNote: string;
  botField: string;
}

const initialCareerForm: CareerFormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "AI/ML Engineer Intern",
  linkedin: "",
  portfolioOrGithub: "",
  resumeUrl: "",
  coverNote: "",
  botField: "",
};

interface CareerApplyFormProps {
  selectedPosition?: string;
}

export function CareerApplyForm({ selectedPosition }: CareerApplyFormProps) {
  const [form, setForm] = useState<CareerFormState>(initialCareerForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CareerFormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update position if user selects from a job card
  useEffect(() => {
    if (selectedPosition) {
      setForm((prev) => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CareerFormState, string>> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim() || form.phone.trim().length < 7) {
      newErrors.phone = "Please provide a valid phone or WhatsApp number.";
    }

    if (!form.position.trim()) {
      newErrors.position = "Please select a target position.";
    }

    if (!form.linkedin.trim() || !form.linkedin.includes("linkedin.com")) {
      newErrors.linkedin = "Please provide your LinkedIn profile URL.";
    }

    if (!form.resumeUrl.trim()) {
      newErrors.resumeUrl = "Please provide a link to your Resume / CV (Google Drive, Dropbox, or PDF link).";
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
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data?.message || "Failed to submit application. Please try again or email us directly at deeplayersolutions@gmail.com."
        );
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setForm(initialCareerForm);
      setErrors({});
      setServerError(null);
    } catch {
      setServerError("Network error. Please check your connection or email your resume directly to deeplayersolutions@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="apply-form" className="p-7 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-xl relative scroll-mt-20">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
          <span>JOIN DEEPLAYER SOLUTIONS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
          Submit Your Application
        </h3>
        <p className="mt-2 text-sm text-[#64736F] leading-relaxed">
          Tell us about your background, ambitions, and link your resume. We evaluate every application thoroughly.
        </p>
      </div>

      {isSuccess ? (
        <div className="py-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-[#008F53]" />
          </div>

          <h4 className="text-2xl font-extrabold text-[#142A27]">
            Application Received!
          </h4>

          <p className="mt-3 text-sm sm:text-base text-[#64736F] max-w-md leading-relaxed">
            Thank you for applying to DeepLayer Solutions. Our technical and recruitment leads will review your profile and reach out within 48 business hours.
          </p>

          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-8 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008F53] text-white hover:bg-[#007343] transition-colors cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {serverError && (
            <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="careerBot">Leave empty</label>
            <input
              id="careerBot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.botField}
              onChange={(e) => setForm({ ...form, botField: e.target.value })}
            />
          </div>

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cFullName" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#008F53]" />
                <span>Full Name <span className="text-red-500">*</span></span>
              </label>
              <input
                id="cFullName"
                type="text"
                placeholder="e.g. Usman Tariq"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.fullName ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cEmail" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#008F53]" />
                <span>Email Address <span className="text-red-500">*</span></span>
              </label>
              <input
                id="cEmail"
                type="email"
                placeholder="you@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.email ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cPhone" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#008F53]" />
                <span>Phone / WhatsApp <span className="text-red-500">*</span></span>
              </label>
              <input
                id="cPhone"
                type="text"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.phone ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cPosition" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#008F53]" />
                <span>Role Applied For <span className="text-red-500">*</span></span>
              </label>
              <select
                id="cPosition"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors cursor-pointer"
              >
                <option value="AI/ML Engineer Intern">AI/ML Engineer Intern</option>
                <option value="Digital Marketing Intern">Digital Marketing Intern</option>
                <option value="Lead Generation & Business Development Intern">Lead Generation &amp; Business Development Intern</option>
                <option value="Full-Stack Software Engineer Intern">Full-Stack Software Engineer Intern</option>
                <option value="General Spontaneous Application">General Spontaneous Application</option>
              </select>
            </div>
          </div>

          {/* Row 3: LinkedIn URL & GitHub / Portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cLinkedIn" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#008F53]" />
                <span>LinkedIn Profile URL <span className="text-red-500">*</span></span>
              </label>
              <input
                id="cLinkedIn"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                  errors.linkedin ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
                }`}
              />
              {errors.linkedin && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.linkedin}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cPortfolio" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#008F53]" />
                <span>GitHub / Portfolio / Project Link</span>
              </label>
              <input
                id="cPortfolio"
                type="url"
                placeholder="https://github.com/username or your portfolio"
                value={form.portfolioOrGithub}
                onChange={(e) => setForm({ ...form, portfolioOrGithub: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors"
              />
            </div>
          </div>

          {/* Row 4: Resume Link (Drive / Dropbox / Public PDF) */}
          <div>
            <label htmlFor="cResume" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#008F53]" />
              <span>Resume / CV Link <span className="text-red-500">*</span></span>
            </label>
            <input
              id="cResume"
              type="url"
              placeholder="Google Drive, Dropbox, or public PDF link (ensure link sharing is ON)"
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors ${
                errors.resumeUrl ? "border-red-400 bg-red-50/20" : "border-[#DFEDE5]"
              }`}
            />
            <p className="mt-1 text-[11px] text-[#64736F]">
              Paste a viewable link to your PDF (e.g. Google Drive with &ldquo;Anyone with the link can view&rdquo; enabled).
            </p>
            {errors.resumeUrl && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.resumeUrl}</span>
              </p>
            )}
          </div>

          {/* Row 5: Brief Cover Note */}
          <div>
            <label htmlFor="cNote" className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2">
              Why DeepLayer Solutions? (Optional Cover Note)
            </label>
            <textarea
              id="cNote"
              rows={3}
              placeholder="Tell us what excites you about this role, relevant projects you've built, or your career goals..."
              value={form.coverNote}
              onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors"
            />
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
              Submit Internship Application
            </Button>
            <p className="mt-3 text-center text-xs text-[#64736F]">
              100% remote evaluation • Equal opportunity • Feedback on verified submissions
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

