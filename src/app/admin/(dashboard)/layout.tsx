import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminNav } from "@/components/admin/AdminNav";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Admin Console — DeepLayer Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

async function AuthenticatedAdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#142A27] flex flex-col font-sans">
      <AdminHeader email={admin.user.email} role={admin.profile.role} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12 flex-1 flex flex-col">
        <AdminNav />
        <main className="mt-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-8 text-center text-[#64736F]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#008F53] animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#142A27]">
          Verifying Admin Session...
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      <AuthenticatedAdminShell>{children}</AuthenticatedAdminShell>
    </Suspense>
  );
}
