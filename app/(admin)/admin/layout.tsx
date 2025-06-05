// app/admin/layout.tsx
import { getCurrentUser } from "@/lib/action/user.action";
import AdminLayout from "./components/Layout";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "admin") redirect("/sign-in");
  return <AdminLayout>{children}</AdminLayout>;
}
