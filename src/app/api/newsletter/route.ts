import { NextRequest, NextResponse } from "next/server";

const newsletterRateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const now = Date.now();
    const rateData = newsletterRateMap.get(ip);

    if (rateData && now < rateData.resetAt) {
      if (rateData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many subscription attempts. Please wait a few minutes.",
          },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      newsletterRateMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_REGEX.test(email) || email.length > 100) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    // Server-side logging / ready for CRM or webhook integration
    console.info(`[Newsletter Subscription] New subscriber: ${email} at ${new Date().toISOString()}`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! You'll receive our latest updates and tech insights.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred while subscribing. Please try again." },
      { status: 500 }
    );
  }
}
