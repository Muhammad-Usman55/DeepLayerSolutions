import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Admin Console — DeepLayer Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminDashboardShell
      email={admin.user.email}
      role={admin.profile.role}
      fullName={admin.profile.full_name}
    >
      {children}
    </AdminDashboardShell>
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
      <AuthenticatedAdminLayout>{children}</AuthenticatedAdminLayout>
    </Suspense>
  );
}
