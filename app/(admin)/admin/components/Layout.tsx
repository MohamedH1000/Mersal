// components/admin/Layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Extract active page from pathname
    const segments = pathname.split("/");
    const page = segments[segments.length - 1] || "dashboard";
    setActivePage(page);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
