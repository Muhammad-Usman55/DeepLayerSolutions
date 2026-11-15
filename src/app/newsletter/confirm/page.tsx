import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  MailQuestion,
  Home,
  Loader2,
  Sparkles,
  Cpu,
  Layers,
  Check,
  ExternalLink,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Container } from "@/components/common/Container";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken } from "@/lib/email/tokens";
import { sendNewsletterWelcomeEmail } from "@/lib/email/dispatch";

export const metadata: Metadata = {
  title: "Subscription Confirmed — DeepLayer Solutions",
  description: "Your email subscription to DeepLayer Solutions engineering insights has been confirmed.",
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
      description: "No confirmation token was found in the link. Please verify you opened the full link from your email.",
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
      description: "A database error occurred while verifying your subscription. Please refresh the page.",
    };
  }

  if (!subscriber) {
    return {
      status: "invalid",
      title: "Link Already Verified or Invalid",
      description: "This verification link has already been used to activate your subscription or is invalid. If you already verified, your subscription is active and all set.",
    };
  }

  // Check expiration (48 hours)
  if (subscriber.token_expires_at) {
    const expiresAt = new Date(subscriber.token_expires_at).getTime();
    if (Date.now() > expiresAt) {
      return {
        status: "expired",
        title: "Confirmation Link Expired",
        description: `This verification link for ${subscriber.email} has expired. Please re-enter your email on our website to receive a fresh verification link.`,
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
      description: "Could not activate your subscription. Please contact support or try again.",
    };
  }

  // Dispatch Welcome Email via Gmail API
  await sendNewsletterWelcomeEmail({
    email: subscriber.email,
    subscriberId: subscriber.id,
  });

  return {
    status: "success",
    title: "Subscription Verified",
    description: `Your subscription is active for ${subscriber.email}. We have sent your welcome briefing to your inbox.`,
    email: subscriber.email,
  };
}

function ConfirmLoadingSkeleton() {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#DFEDE5] rounded-[32px] p-8 sm:p-14 shadow-[0_24px_64px_-12px_rgba(0,143,83,0.10)] text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-[#142A27] mb-2">Verifying Security Token...</h2>
      <p className="text-sm text-[#64736F]">Please wait a moment while we validate your credentials.</p>
    </div>
  );
}

async function ConfirmContent({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const result = await verifyAndActivateToken(token);

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#DFEDE5] rounded-[32px] p-8 sm:p-12 md:p-14 shadow-[0_24px_64px_-12px_rgba(0,143,83,0.12),0_4px_16px_rgba(0,0,0,0.02)] text-center max-w-2xl mx-auto relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#008F53] via-[#00B86B] to-[#34D399]" />

      {result.status === "success" && (
        <>
          {/* Animated Glowing Success Orb */}
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
            <div className="absolute inset-0 rounded-full bg-[#008F53]/15 animate-ping opacity-75 pointer-events-none" />
            <div className="absolute inset-1 rounded-full bg-[#E9FFF2] border border-[#BCE8CF]" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#008F53] to-[#00B86B] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(0,143,83,0.35)]">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
          </div>

          {/* Glowing Top Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E9FFF2] text-[#008F53] border border-[#BCE8CF] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00B86B]" />
            <span>VERIFICATION COMPLETE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>

          {result.email && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0FAF4] border border-[#BCE8CF] text-xs font-mono text-[#008F53] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#008F53] animate-pulse" />
              <span className="font-semibold text-[#142A27]">{result.email}</span>
              <span className="text-[#64736F]">&bull;</span>
              <span className="text-[#008F53] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" />
                Active Subscriber
              </span>
            </div>
          )}

          <p className="text-sm sm:text-base text-[#4B5E59] leading-relaxed max-w-lg mx-auto mb-8">
            {result.description}
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 text-left">
            <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#008F53] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-2.5">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#142A27] mb-1">AI Systems</h4>
              <p className="text-[11px] text-[#64736F] leading-relaxed">
                Autonomous agents, LLM evaluations, and latency tactics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#008F53] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-2.5">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#142A27] mb-1">Architecture</h4>
              <p className="text-[11px] text-[#64736F] leading-relaxed">
                Scalable Next.js setups, resilient APIs, and data models.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-[#DFEDE5] hover:border-[#008F53] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#142A27] mb-1">Zero Spam</h4>
              <p className="text-[11px] text-[#64736F] leading-relaxed">
                Bi-weekly high-signal drops with 1-click unsubscribe.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#008F53]/20 cursor-pointer"
            >
              <span>Read Latest Publications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] text-[#142A27] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#008F53]" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </>
      )}

      {result.status === "expired" && (
        <>
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center shadow-md shadow-amber-500/10">
              <AlertTriangle className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200 mb-4">
            <span>LINK EXPIRED</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142A27] tracking-tight mb-3">
            {result.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5E59] leading-relaxed mb-8 max-w-lg mx-auto">
            {result.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#newsletter"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#008F53] hover:bg-[#007443] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#008F53]/20 cursor-pointer"
            >
              <span>Request New Verification Link</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFCF9] hover:bg-white border border-[#DFEDE5] text-[#142A27] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Return to Homepage</span>
            </Link>
          </div>
        </>
      )}

      {result.status === "invalid" && (
        <>
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center shadow-md shadow-rose-500/10">
              <MailQuestion className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-200 mb-4">
            <span>VERIFICATION STATUS</span>
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

export default function NewsletterConfirmPage(props: PageProps) {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#E9FFF2]/70 via-[#FAFCF9] to-white min-h-[75vh] flex items-center">
        {/* Ambient background lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00B86B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#34D399]/10 rounded-full blur-2xl pointer-events-none" />

        <Container size="sm" className="relative z-10">
          <Suspense fallback={<ConfirmLoadingSkeleton />}>
            <ConfirmContent {...props} />
          </Suspense>
        </Container>
      </section>
    </PageWrapper>
  );
}
