import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";

export const instant = false;

export const metadata = {
  title: "Admin Console — DeepLayer Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
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
