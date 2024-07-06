import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import localFont from "@next/font/local";

// const tajawal = Tajawal({
//   subsets: ["arabic"],
//   weight: ["200", "300", "400", "500", "700", "800", "900"],
// });
export const metadata: Metadata = {
  title: "Mersal",
  description: "حجز شاليهاتي نع خدمات اضافية",
};
const lbc = localFont({
  src: [
    {
      path: "../public/fonts/LBC.otf",
    },
  ],
  variable: "--font-LBC",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/assets/icon.png" sizes="any" />
      </head>
      <body style={{ fontFamily: "LBC-bold" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
