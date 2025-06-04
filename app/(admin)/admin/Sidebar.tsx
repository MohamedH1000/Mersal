// components/admin/Sidebar.tsx
"use client";

import {
  FaTimes,
  FaHome,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  activePage,
  isOpen,
  setIsOpen,
}: {
  activePage: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: <FaHome />, path: "/admin" },
    {
      id: "users",
      label: "المستخدمين",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      id: "listings",
      label: "الشاليهات",
      icon: <FaBuilding />,
      path: "/admin/listings",
    },
    {
      id: "reservations",
      label: "الحجوزات",
      icon: <FaCalendarAlt />,
      path: "/admin/reservations",
    },
    {
      id: "settings",
      label: "الإعدادات",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed right-0 top-0 z-30 flex h-screen w-64 flex-col bg-white shadow-lg transition-all duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-[#bda069] w-8 h-8 rounded"></div>
            <span className="text-xl font-bold">إدارة الشاليهات</span>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center w-full px-4 py-3 text-right rounded-lg mb-1 ${
                    pathname === item.path
                      ? "bg-[#f5f0e6] text-[#bda069] font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="ml-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t text-sm text-gray-500">النسخة 1.0.0</div>
      </aside>
    </>
  );
};

export default Sidebar;
