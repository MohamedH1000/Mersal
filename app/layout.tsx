import type { Metadata } from "next";
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import localFont from "@next/font/local";
import Link from "next/link";

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
        <script
          src="https://upload-widget.cloudinary.com/latest/global/all.js"
          type="text/javascript"
        ></script>
      </head>
      <body style={{ fontFamily: "LBC-bold" }}>
        {children}
        <Link href={"https://wa.me/+966580782229"} target="_blank">
          <div className="fixed bottom-20 left-10 z-50">
            {" "}
            <Fab
              aria-label="add"
              className="bg-[#bda069] hover:bg-[#bda069] text-white"
            >
              <WhatsAppIcon />
            </Fab>
          </div>
        </Link>
        <Toaster />
      </body>
    </html>
  );
}
