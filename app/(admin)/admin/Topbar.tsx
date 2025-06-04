// components/admin/Topbar.tsx
"use client";

import { FaBars, FaBell, FaUser } from "react-icons/fa";

const Topbar = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (isOpen: boolean) => void;
}) => {
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

          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
              <FaUser />
            </div>
            <div className="mr-2 hidden md:block">
              <p className="font-medium">مدير النظام</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
