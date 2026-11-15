import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient();

    // 1. Sign out from Supabase Auth service
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("[ADMIN LOGOUT] Supabase signOut notice:", e);
    }

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );

    // 2. Explicitly wipe every Supabase and session cookie from the cookie store & response headers
    const allCookies = cookieStore.getAll();
    allCookies.forEach((cookie) => {
      if (
        cookie.name.startsWith("sb-") ||
        cookie.name.includes("auth-token") ||
        cookie.name.includes("supabase") ||
        cookie.name.includes("session")
      ) {
        try {
          cookieStore.delete(cookie.name);
        } catch {}

        response.cookies.set(cookie.name, "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
      }
    });

    // 3. Fallback explicit deletion for standard Supabase cookie patterns
    const commonPatterns = ["sb-access-token", "sb-refresh-token", "supabase-auth-token"];
    commonPatterns.forEach((name) => {
      response.cookies.set(name, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
        httpOnly: true,
        sameSite: "lax",
      });
    });

    // 4. Enforce strict anti-caching so browsers and proxies never retain an authenticated state
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error: any) {
    console.error("[ADMIN LOGOUT ERROR]:", error?.message || error);
    const errRes = NextResponse.json(
      { success: false, message: "Failed to sign out." },
      { status: 500 }
    );
    errRes.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return errRes;
  }
}
