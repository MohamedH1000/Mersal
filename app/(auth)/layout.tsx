import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
}
