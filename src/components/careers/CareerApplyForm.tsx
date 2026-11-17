"use client";

import React, { useState, useEffect, useRef, FormEvent, DragEvent, ChangeEvent } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  Link2,
  User,
  Mail,
  Phone,
  UploadCloud,
  X,
  FileCheck,
  Check,
} from "lucide-react";
import { Button } from "../common/Button";

interface CareerFormState {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  portfolioOrGithub: string;
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
  coverNote: "",
  botField: "",
};

interface CareerApplyFormProps {
  selectedPosition?: string;
}

export function CareerApplyForm({ selectedPosition }: CareerApplyFormProps) {
  const [form, setForm] = useState<CareerFormState>(initialCareerForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string>("AI/ML Engineer Intern");
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update position if user selects from a job card
  useEffect(() => {
    if (selectedPosition) {
      setForm((prev) => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "doc", "docx"].includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        resumeFile: "Please upload a valid document in PDF, DOC, or DOCX format.",
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resumeFile: "File size exceeds the 10MB limit. Please upload a smaller file.",
      }));
      return;
    }

    setResumeFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.resumeFile;
      return next;
    });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
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
      newErrors.linkedin = "Please provide your valid LinkedIn profile URL.";
    }

    if (!resumeFile) {
      newErrors.resumeFile = "Please upload your Resume / CV (PDF, DOC, or DOCX up to 10MB).";
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
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("position", form.position);
      formData.append("linkedin", form.linkedin);
      formData.append("portfolioOrGithub", form.portfolioOrGithub);
      formData.append("coverNote", form.coverNote);
      formData.append("botField", form.botField);
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data?.message ||
            "Failed to submit application. Please try again or email your CV directly to deeplayersolutions@gmail.com."
        );
        setIsSubmitting(false);
        return;
      }

      setSubmittedRole(form.position);
      setApplicationId(data?.applicationId || null);
      setIsSuccess(true);
      setForm(initialCareerForm);
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors({});
      setServerError(null);
    } catch {
      setServerError(
        "Network error. Please check your connection or email your resume directly to deeplayersolutions@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="apply-form"
      className="p-7 sm:p-10 rounded-3xl bg-white border border-[#DFEDE5] shadow-xl relative scroll-mt-20"
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
          <span>JOIN DEEPLAYER SOLUTIONS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
          Submit Your Application
        </h3>
        <p className="mt-2 text-sm text-[#64736F] leading-relaxed">
          Tell us about your background, ambitions, and upload your resume. We evaluate every application thoroughly.
        </p>
      </div>

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
            <span>APPLICATION SECURED</span>
          </div>

          <h4 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight">
            Application Received
          </h4>

          <p className="mt-2 text-xs sm:text-sm text-[#64736F] max-w-md leading-relaxed">
            Thank you for applying. Your candidate profile and uploaded resume have been securely registered in our Applicant Tracking System.
          </p>

          {/* Application Tracking Ticket */}
          <div className="w-full max-w-md mt-6 p-4 sm:p-5 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] text-left">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#DFEDE5]">
              <div>
                <span className="text-[10px] font-bold text-[#64736F] uppercase tracking-wider block">
                  Target Position
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#008F53]">
                  {submittedRole}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF]">
                Under Review
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#334155]">
              <div className="flex items-center justify-between">
                <span className="text-[#64736F]">Application Status:</span>
                <span className="font-semibold text-[#008F53] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Received &amp; Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64736F]">Evaluation Horizon:</span>
                <span className="font-semibold text-[#142A27]">Within 48 business hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64736F]">Email Receipt:</span>
                <span className="font-semibold text-[#142A27]">Confirmation email dispatched</span>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setApplicationId(null);
            }}
            className="mt-6 text-xs font-semibold text-[#64736F] hover:text-[#008F53] transition-colors cursor-pointer underline decoration-dotted"
          >
            Submit Another Application &rarr;
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
              <label
                htmlFor="cFullName"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  Full Name <span className="text-red-500">*</span>
                </span>
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
              <label
                htmlFor="cEmail"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  Email Address <span className="text-red-500">*</span>
                </span>
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
              <label
                htmlFor="cPhone"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </span>
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
              <label
                htmlFor="cPosition"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  Role Applied For <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                id="cPosition"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-sm text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] transition-colors cursor-pointer"
              >
                <option value="AI/ML Engineer Intern">AI/ML Engineer Intern</option>
                <option value="Digital Marketing Intern">Digital Marketing Intern</option>
                <option value="Lead Generation & Business Development Intern">
                  Lead Generation &amp; Business Development Intern
                </option>
                <option value="Full-Stack Software Engineer Intern">
                  Full-Stack Software Engineer Intern
                </option>
                <option value="General Spontaneous Application">
                  General Spontaneous Application
                </option>
              </select>
            </div>
          </div>

          {/* Row 3: LinkedIn URL & GitHub / Portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="cLinkedIn"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
                <Link2 className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  LinkedIn Profile URL <span className="text-red-500">*</span>
                </span>
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
              <label
                htmlFor="cPortfolio"
                className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center gap-1.5"
              >
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

          {/* Row 4: CV / Resume File Upload (Dropzone) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UploadCloud className="w-3.5 h-3.5 text-[#008F53]" />
                <span>
                  Upload Resume / CV <span className="text-red-500">*</span>
                </span>
              </span>
              <span className="text-[11px] font-normal text-[#64736F] lowercase">
                PDF, DOC, DOCX up to 10MB
              </span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInputChange}
              className="hidden"
              id="cResumeFile"
            />

            {!resumeFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-[#008F53] bg-[#E9FFF2]/60 scale-[1.01]"
                    : errors.resumeFile
                    ? "border-red-300 bg-red-50/20 hover:border-red-400"
                    : "border-[#CFE2D8] bg-[#FAFCF9] hover:border-[#008F53] hover:bg-[#F3F9F6]"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto mb-3">
                  <UploadCloud className="w-6 h-6 text-[#008F53]" />
                </div>
                <p className="text-sm font-semibold text-[#142A27]">
                  Click to upload or drag &amp; drop your CV here
                </p>
                <p className="text-xs text-[#64736F] mt-1">
                  Supported formats: PDF, Microsoft Word (.doc, .docx) &bull; Maximum file size: 10MB
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F0FAF4] border border-[#BCE8CF] flex items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#008F53] text-white flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#142A27] truncate">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-[#008F53] font-medium flex items-center gap-1.5 mt-0.5">
                      <span>{formatFileSize(resumeFile.size)}</span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#008F53]" />
                        Ready to upload
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-semibold text-[#008F53] hover:text-[#007343] hover:bg-[#E9FFF2] rounded-lg transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    aria-label="Remove uploaded CV"
                    className="p-1.5 text-[#64736F] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {errors.resumeFile && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.resumeFile}</span>
              </p>
            )}
          </div>

          {/* Row 5: Brief Cover Note */}
          <div>
            <label
              htmlFor="cNote"
              className="block text-xs font-bold uppercase tracking-wider text-[#142A27] mb-2"
            >
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
              className="w-full justify-center shadow-md shadow-[#008F53]/20 font-bold cursor-pointer"
            >
              {isSubmitting ? "Uploading CV & Submitting..." : "Submit Application"}
            </Button>
            <p className="mt-3 text-center text-xs text-[#64736F]">
              Your resume is securely encrypted &bull; 100% confidential recruitment review
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
