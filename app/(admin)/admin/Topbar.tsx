// components/admin/Topbar.tsx
"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBell,
  FaCaretDown,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const Topbar = ({
  setSidebarOpen,
  user,
}: {
  setSidebarOpen: (isOpen: boolean) => void;
  user: User;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/sign-in" }); // Redirect to homepage after sign-out
  };
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="text-xl" />
          </button>
          <div className="ml-4 hidden md:block">
            <h1 className="text-xl font-bold">لوحة تحكم إدارة الشاليهات</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <FaBell className="text-xl" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button> */}

          <div className="relative" ref={menuRef}>
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* User avatar */}
              {user?.avatar ? (
                <img
                  src={user.avatar || ""}
                  alt="User profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                  <FaUser />
                </div>
              )}

              {/* User info */}
              <div className="mr-2 hidden md:block">
                <p className="font-medium">{user?.name || ""}</p>
                <p className="text-sm text-gray-500">{user?.role || ""}</p>
              </div>

              <FaCaretDown className="text-gray-500" />
            </div>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm 
                  text-gray-700 hover:bg-gray-100 gap-2"
                >
                  <FaSignOutAlt className="mr-3" />
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
