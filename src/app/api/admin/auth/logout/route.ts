import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    return NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[ADMIN LOGOUT ERROR]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to sign out." },
      { status: 500 }
    );
  }
}

