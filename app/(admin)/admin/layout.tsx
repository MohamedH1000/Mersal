// app/admin/layout.tsx
import AdminLayout from "./components/Layout";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
