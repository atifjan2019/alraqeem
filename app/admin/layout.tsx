import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper lg:flex">
      <AdminSidebar />
      <div className="flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
}
