import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle, Home, MailX, Loader2 } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Container } from "@/components/common/Container";
import { Eyebrow } from "@/components/common/Eyebrow";
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
    <div className="bg-white border border-[#DFEDE5] rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,184,107,0.06)] text-center max-w-xl mx-auto">
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
    <div className="bg-white border border-[#DFEDE5] rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,184,107,0.06)] text-center max-w-xl mx-auto">
      {result.status === "success" ? (
        <>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E9FFF2] border-2 border-[#BCE8CF] text-[#008F53] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MailX className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5E59] leading-relaxed mb-8">
            {result.description}
          </p>

          <div className="bg-[#F8FBFA] border border-[#DFEDE5] rounded-2xl p-5 mb-8 text-left text-sm text-[#4B5E59] leading-relaxed">
            <p className="font-semibold text-[#142A27] mb-1">
              Change your mind later?
            </p>
            <p className="text-xs sm:text-sm text-[#64736F]">
              You can re-subscribe anytime simply by submitting your email on our website footer. We will send a confirmation link to reactivate your subscription.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#DFEDE5] text-[#142A27] font-semibold text-sm transition-all cursor-pointer"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5E59] leading-relaxed mb-8">
            {result.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#DFEDE5] text-[#142A27] font-semibold text-sm transition-all cursor-pointer"
            >
              <span>Contact Support</span>
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
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#FAFCF9] via-white to-[#FAFCF9] min-h-[70vh] flex items-center">
        <Container size="sm" className="relative z-10">
          <div className="text-center mb-8">
            <Eyebrow variant="chip" className="mb-4">
              Subscription Management
            </Eyebrow>
          </div>

          <Suspense fallback={<UnsubscribeLoadingSkeleton />}>
            <UnsubscribeContent {...props} />
          </Suspense>
        </Container>
      </section>
    </PageWrapper>
  );
}
