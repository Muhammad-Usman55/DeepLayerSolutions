import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle, Home, MailX, Loader2, Sparkles, ExternalLink } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Container } from "@/components/common/Container";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUnsubscribeToken } from "@/lib/email/tokens";

export const metadata: Metadata = {
  title: "Unsubscribe — DeepLayer Solutions",
  description: "Unsubscribe from DeepLayer Solutions newsletter updates.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{ email?: string; key?: string }>;
}

interface UnsubscribeResult {
  status: "success" | "invalid";
  title: string;
  description: string;
  email?: string;
}

async function processUnsubscribe(rawEmail?: string, rawKey?: string): Promise<UnsubscribeResult> {
  const email = rawEmail?.toLowerCase().trim();
  const key = rawKey?.trim();

  if (!email || !key) {
    return {
      status: "invalid",
      title: "Missing Unsubscribe Parameters",
      description:
        "Please use the personalized unsubscribe link provided at the bottom of our emails to unsubscribe automatically.",
    };
  }

  const isValid = verifyUnsubscribeToken(email, key);
  if (!isValid) {
    return {
      status: "invalid",
      title: "Invalid Unsubscribe Link",
      description:
        "The authentication key for this unsubscribe request is invalid or has expired. If you need assistance, please contact support.",
      email,
    };
  }

  const supabase = createAdminClient();
  const nowIso = new Date().toISOString();

  const { error } = await supabase
    .from("subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: nowIso,
      confirmation_token_hash: null,
      token_expires_at: null,
    })
    .eq("email", email);

  if (error) {
    console.error("[UNSUBSCRIBE PAGE DB ERROR]:", error);
    return {
      status: "invalid",
      title: "Unsubscribe Error",
      description: "A database error occurred while updating your preferences. Please try again or reach out directly.",
    };
  }

  return {
    status: "success",
    title: "You Have Been Unsubscribed",
    description: `We've removed ${email} from our newsletter list. You will not receive any further marketing or newsletter emails from DeepLayer Solutions.`,
    email,
  };
}

function UnsubscribeLoadingSkeleton() {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#DFEDE5] rounded-[32px] p-8 sm:p-14 shadow-[0_24px_64px_-12px_rgba(0,143,83,0.10)] text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-[#142A27] mb-2">Processing Unsubscribe Request...</h2>
      <p className="text-sm text-[#64736F]">Please wait a moment while we update your preferences.</p>
    </div>
  );
}

async function UnsubscribeContent({ searchParams }: PageProps) {
  const { email, key } = await searchParams;
  const result = await processUnsubscribe(email, key);

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#DFEDE5] rounded-[32px] p-8 sm:p-12 md:p-14 shadow-[0_24px_64px_-12px_rgba(0,143,83,0.10),0_4px_16px_rgba(0,0,0,0.02)] text-center max-w-2xl mx-auto relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gray-400 via-[#008F53] to-gray-400" />

      {result.status === "success" ? (
        <>
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 border border-gray-200 text-[#142A27] flex items-center justify-center shadow-sm">
              <MailX className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gray-100 text-gray-700 border border-gray-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gray-500" />
            <span>PREFERENCES UPDATED</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>

          {result.email && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAFCF9] border border-[#DFEDE5] text-xs font-mono text-[#64736F] mb-6">
              <span>{result.email}</span>
              <span>&bull;</span>
              <span>Unsubscribed</span>
            </div>
          )}

          <p className="text-sm sm:text-base text-[#4B5E59] leading-relaxed mb-8 max-w-lg mx-auto">
            {result.description}
          </p>

          <div className="bg-[#FAFCF9] border border-[#DFEDE5] rounded-2xl p-5 mb-8 text-left text-xs sm:text-sm text-[#4B5E59] leading-relaxed">
            <p className="font-bold text-[#142A27] mb-1">
              Change your mind later?
            </p>
            <p className="text-xs text-[#64736F]">
              You can re-subscribe anytime simply by submitting your email on our website. We will send a confirmation link to reactivate your subscription.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#008F53]/20 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] text-[#142A27] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Contact Us</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center shadow-md shadow-rose-500/10">
              <AlertCircle className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-200 mb-4">
            <span>UNSUBSCRIBE STATUS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5E59] leading-relaxed mb-8 max-w-lg mx-auto">
            {result.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#008F53]/20 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] text-[#142A27] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Contact Support</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function NewsletterUnsubscribePage(props: PageProps) {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#FAFCF9] via-white to-[#FAFCF9] min-h-[75vh] flex items-center">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

        <Container size="sm" className="relative z-10">
          <Suspense fallback={<UnsubscribeLoadingSkeleton />}>
            <UnsubscribeContent {...props} />
          </Suspense>
        </Container>
      </section>
    </PageWrapper>
  );
}
