import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    const { supabaseResponse, user } = await updateSession(request);

    const isLoginPage = pathname === "/admin/login";

    // If already logged in and visiting login page, redirect to overview
    if (isLoginPage) {
      if (user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
      return supabaseResponse;
    }

    // For all other /admin routes, unauthenticated visitors are redirected to /admin/login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      if (pathname !== "/admin") {
        url.searchParams.set("next", pathname);
      }
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // Session refresh for non-admin requests
  const { supabaseResponse } = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
