import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() || "";
  const isLocalhost =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.startsWith("192.168.") ||
    host.startsWith("10.");

  // 1. Canonical Domain Normalization (Permanent 301 Redirect to www.deeplayersolutions.com)
  if (!isLocalhost) {
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const isApex = host === "deeplayersolutions.com";
    const isVercelSubdomain = host.endsWith(".vercel.app");
    const isHttp = proto === "http";

    if (isApex || isVercelSubdomain || (host === "www.deeplayersolutions.com" && isHttp)) {
      const redirectUrl = new URL(request.url);
      redirectUrl.protocol = "https:";
      redirectUrl.host = "www.deeplayersolutions.com";
      return NextResponse.redirect(redirectUrl, { status: 301 });
    }
  }

  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    const { supabaseResponse, user } = await updateSession(request);

    const isAuthPage =
      pathname === "/admin/login" ||
      pathname === "/admin/forgot-password" ||
      pathname === "/admin/reset-password";

    // Allow unauthenticated and auth pages without redirect loops
    if (isAuthPage) {
      return supabaseResponse;
    }

    // For protected /admin routes, unauthenticated visitors are redirected to /admin/login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      if (pathname !== "/admin") {
        url.searchParams.set("next", pathname);
      }
      const redirectRes = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach((c) => redirectRes.cookies.set(c));
      return redirectRes;
    }

    return supabaseResponse;
  }

  // Session refresh for non-admin requests
  const { supabaseResponse } = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|txt|xml)$).*)",
  ],
};

