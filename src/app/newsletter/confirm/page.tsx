import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, MailQuestion, Home, Loader2 } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Container } from "@/components/common/Container";
import { Eyebrow } from "@/components/common/Eyebrow";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken } from "@/lib/email/tokens";
import { sendNewsletterWelcomeEmail } from "@/lib/email/dispatch";

export const metadata: Metadata = {
  title: "Subscription Confirmation — DeepLayer Solutions",
  description: "Confirm your email subscription to DeepLayer Solutions engineering insights.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

interface ConfirmResult {
  status: "success" | "expired" | "already_active" | "invalid";
  title: string;
  description: string;
  email?: string;
}

async function verifyAndActivateToken(rawToken?: string): Promise<ConfirmResult> {
  if (!rawToken || typeof rawToken !== "string" || rawToken.trim().length === 0) {
    return {
      status: "invalid",
      title: "Missing Confirmation Token",
      description: "No confirmation token was found in the URL. Please verify you clicked the complete link in your email.",
    };
  }

  const token = rawToken.trim();
  const tokenHash = hashToken(token);
  const supabase = createAdminClient();

  const { data: subscriber, error: queryError } = await supabase
    .from("subscribers")
    .select("id, email, status, token_expires_at")
    .eq("confirmation_token_hash", tokenHash)
    .maybeSingle();

  if (queryError) {
    console.error("[CONFIRM PAGE QUERY ERROR]:", queryError);
    return {
      status: "invalid",
      title: "Verification Error",
      description: "A database error occurred while verifying your subscription. Please try refreshing this page.",
    };
  }

  if (!subscriber) {
    return {
      status: "invalid",
      title: "Invalid or Already Used Link",
      description: "This confirmation link is invalid or has already been used to activate your subscription. If you already confirmed, you are all set!",
    };
  }

  // Check expiration (48 hours)
  if (subscriber.token_expires_at) {
    const expiresAt = new Date(subscriber.token_expires_at).getTime();
    if (Date.now() > expiresAt) {
      return {
        status: "expired",
        title: "Confirmation Link Expired",
        description: `This confirmation token for ${subscriber.email} expired after 48 hours. Please re-enter your email on our website to receive a fresh confirmation link.`,
        email: subscriber.email,
      };
    }
  }

  // Activate subscriber
  const nowIso = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("subscribers")
    .update({
      status: "active",
      subscribed_at: nowIso,
      confirmation_token_hash: null,
      token_expires_at: null,
    })
    .eq("id", subscriber.id);

  if (updateError) {
    console.error("[CONFIRM PAGE UPDATE ERROR]:", updateError);
    return {
      status: "invalid",
      title: "Activation Failed",
      description: "Failed to activate your subscription in the database. Please try again or reach out to our team.",
    };
  }

  // Dispatch Welcome Email via Resend
  await sendNewsletterWelcomeEmail({
    email: subscriber.email,
    subscriberId: subscriber.id,
  });

  return {
    status: "success",
    title: "Subscription Confirmed!",
    description: `Your email (${subscriber.email}) is now verified and active. A welcome briefing has been delivered to your inbox.`,
    email: subscriber.email,
  };
}

function ConfirmLoadingSkeleton() {
  return (
    <div className="bg-white border border-[#DFEDE5] rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,184,107,0.06)] text-center max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-[#142A27] mb-2">Verifying Your Subscription...</h2>
      <p className="text-sm text-[#64736F]">Please wait a moment while we validate your security token.</p>
    </div>
  );
}

async function ConfirmContent({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const result = await verifyAndActivateToken(token);

  return (
    <div className="bg-white border border-[#DFEDE5] rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,184,107,0.06)] text-center max-w-xl mx-auto">
      {result.status === "success" && (
        <>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E9FFF2] border-2 border-[#BCE8CF] text-[#008F53] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5E59] leading-relaxed mb-8">
            {result.description}
          </p>

          <div className="bg-[#F8FBFA] border border-[#DFEDE5] rounded-2xl p-5 mb-8 text-left text-sm text-[#4B5E59] leading-relaxed">
            <div className="flex items-center gap-2 font-semibold text-[#142A27] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#008F53]" />
              <span>What happens next:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-[#64736F]">
              <li>You will receive periodic engineering deep dives and updates.</li>
              <li>Zero spam. Every email includes a one-click unsubscribe option.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#DFEDE5] text-[#142A27] font-semibold text-sm transition-all cursor-pointer"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </>
      )}

      {result.status === "expired" && (
        <>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertTriangle className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5E59] leading-relaxed mb-8">
            {result.description}
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            <span>Request New Confirmation Link</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}

      {result.status === "invalid" && (
        <>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MailQuestion className="w-9 h-9 sm:w-11 sm:h-11" />
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

export default function NewsletterConfirmPage(props: PageProps) {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#E9FFF2]/60 via-[#FAFCF9] to-white min-h-[70vh] flex items-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00B86B]/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="sm" className="relative z-10">
          <div className="text-center mb-8">
            <Eyebrow variant="chip" className="mb-4">
              Newsletter Verification
            </Eyebrow>
          </div>

          <Suspense fallback={<ConfirmLoadingSkeleton />}>
            <ConfirmContent {...props} />
          </Suspense>
        </Container>
      </section>
    </PageWrapper>
  );
}
