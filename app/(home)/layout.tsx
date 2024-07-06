import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/action/user.action";

export const metadata: Metadata = {
  title: "Mersal",
  description: "حجز شاليهاتي مع خدمات اضافية",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <NavBar currentUser={currentUser} />
      {children}
      <Footer />
    </>
  );
}
