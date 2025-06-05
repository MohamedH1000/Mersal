"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaHome,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/lib/action/user.action";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [user, setUser] = useState<User | null>(null);
  // Mock user data based on your schema

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchCurrentUser();
  }, []);
  // const userData = {
  //   id: params.id,
  //   name: "محمد أحمد",
  //   email: "mohammed@example.com",
  //   phoneNumber: "+966 50 123 4567",
  //   createdAt: new Date("2023-01-15"),
  //   role: "مستخدم مميز",
  //   image: "/user-avatar.jpg",
  //   favoriteIds: ["1", "2", "3"],
  //   listings: [
  //     { id: "1", title: "شالية بحري فاخر", location: "جدة", price: 800 },
  //     { id: "2", title: "شالية جبلي هادئ", location: "الطائف", price: 650 },
  //   ],
  //   reservations: [
  //     {
  //       id: "101",
  //       property: "فيلا بحرية",
  //       date: "2023-05-15",
  //       status: "مكتمل",
  //     },
  //     {
  //       id: "102",
  //       property: "شالية جبلي",
  //       date: "2023-06-20",
  //       status: "قيد الانتظار",
  //     },
  //   ],
  //   stats: {
  //     totalBookings: 12,
  //     totalSpent: 12500,
  //     favoriteCategory: "شاليهات بحرية",
  //   },
  // };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#f0ebe3] pt-[100px] pb-10 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#eee5d4]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-[#bda069] to-[#d4c190] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end px-6 pb-6 -mt-16">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                </motion.div>
                {user?.role.includes("مستخدم") && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#bda069] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <FaCrown className="ml-1" /> {user?.role}
                  </div>
                )}
              </div>

              <div className="md:ml-6 mt-5 md:mt-0 text-center md:text-right">
                <motion.h1
                  className="text-3xl font-bold text-[#2c3e50] mt-5"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {user?.name}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-2 mt-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-[#f5f0e6] text-[#bda069] px-3 py-1 rounded-full text-sm flex items-center">
                    <FaEnvelope className="ml-1" /> {user?.email}
                  </div>
                  <div className="bg-[#f5f0e6] text-[#bda069] px-3 py-1 rounded-full text-sm flex items-center">
                    <FaPhone className="ml-1" /> {user?.phoneNumber}
                  </div>
                  <div className="bg-[#f5f0e6] text-[#bda069] px-3 py-1 rounded-full text-sm flex items-center">
                    <FaCalendarAlt className="ml-1" /> عضو منذ{" "}
                    {new Date(user?.createdAt).toLocaleDateString("ar-SA")}
                  </div>
                </motion.div>
              </div>

              <div className="md:ml-auto mt-4 md:mt-0">
                <motion.button
                  className="bg-[#bda069] hover:bg-[#a8905e] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  تعديل الملف الشخصي
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eee5d4]">
            <div className="text-3xl font-bold text-[#bda069]">
              {user?.stats?.totalBookings}
            </div>
            <div className="text-gray-600 mt-2">إجمالي الحجوزات</div>
            <div className="h-1 bg-gradient-to-r from-[#bda069] to-[#d4c190] mt-4 rounded-full"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eee5d4]">
            <div className="text-3xl font-bold text-[#bda069]">
              {user?.stats?.totalSpent.toLocaleString("ar-SA")}{" "}
              <span className="text-lg">ر.س</span>
            </div>
            <div className="text-gray-600 mt-2">إجمالي الإنفاق</div>
            <div className="h-1 bg-gradient-to-r from-[#bda069] to-[#d4c190] mt-4 rounded-full"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eee5d4]">
            <div className="text-xl font-bold text-[#bda069]">
              {user?.stats?.favoriteCategory}
            </div>
            <div className="text-gray-600 mt-2">التصنيف المفضل</div>
            <div className="h-1 bg-gradient-to-r from-[#bda069] to-[#d4c190] mt-4 rounded-full"></div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mt-8 flex border-b border-[#eee5d4]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <button
            className={`py-3 px-6 font-medium relative ${
              activeTab === "personal" ? "text-[#bda069]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            المعلومات الشخصية
            {activeTab === "personal" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#bda069]"
                layoutId="tabIndicator"
              />
            )}
          </button>

          {/* <button
            className={`py-3 px-6 font-medium relative ${
              activeTab === "listings" ? "text-[#bda069]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("listings")}
          >
            العقارات المضافة
            {activeTab === "listings" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#bda069]"
                layoutId="tabIndicator"
              />
            )}
          </button> */}

          <button
            className={`py-3 px-6 font-medium relative ${
              activeTab === "reservations" ? "text-[#bda069]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reservations")}
          >
            الحجوزات السابقة
            {activeTab === "reservations" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#bda069]"
                layoutId="tabIndicator"
              />
            )}
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#eee5d4]">
              <h2 className="text-xl font-bold text-[#2c3e50] mb-6">
                المعلومات الشخصية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-[#f5f0e6] p-3 rounded-full text-[#bda069]">
                    <FaUser className="text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium text-gray-600">الاسم الكامل</h3>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#f5f0e6] p-3 rounded-full text-[#bda069]">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium text-gray-600">
                      البريد الإلكتروني
                    </h3>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#f5f0e6] p-3 rounded-full text-[#bda069]">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium text-gray-600">رقم الجوال</h3>
                    <p className="font-medium">{user?.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#f5f0e6] p-3 rounded-full text-[#bda069]">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium text-gray-600">تاريخ التسجيل</h3>
                    <p className="font-medium">
                      {new Date(user?.createdAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-lg text-[#2c3e50] mb-4">
                  المفضلات
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user?.favoriteIds.map((fav, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#f5f0e6] text-[#bda069] px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      شاليه #{fav}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Listings Tab */}
          {/* {activeTab === "listings" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user?.listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#eee5d4]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 bg-gradient-to-r from-[#bda069] to-[#d4c190] relative">
                      <div className="absolute top-4 left-4 bg-[#bda069] text-white px-3 py-1 rounded-full">
                        {listing.price} ر.س / ليلة
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-[#2c3e50]">
                        {listing.title}
                      </h3>
                      <div className="flex items-center mt-2 text-gray-600">
                        <FaHome className="ml-1" /> {listing.location}
                      </div>
                      <div className="flex mt-4">
                        <div className="flex text-[#f1c40f]">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <span className="mr-2 text-gray-600">(12 تقييم)</span>
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <button className="text-[#bda069] font-medium">
                          عرض التفاصيل
                        </button>
                        <button className="bg-[#bda069] hover:bg-[#a8905e] text-white px-4 py-2 rounded-full text-sm transition-colors">
                          تعديل العقار
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button className="bg-white border border-[#bda069] text-[#bda069] hover:bg-[#f5f0e6] font-bold py-3 px-8 rounded-full transition-all">
                  إضافة عقار جديد
                </button>
              </motion.div>
            </div>
          )} */}

          {/* Reservations Tab */}
          {activeTab === "reservations" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#eee5d4]">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-[#f8f5f0]">
                    <tr>
                      <th className="py-3 px-6 text-right">رقم الحجز</th>
                      <th className="py-3 px-6 text-right">العقار</th>
                      <th className="py-3 px-6 text-right">التاريخ</th>
                      <th className="py-3 px-6 text-right">الحالة</th>
                      <th className="py-3 px-6 text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.reservations?.map((reservation, index) => (
                      <motion.tr
                        key={reservation.id}
                        className="border-b border-[#eee5d4] hover:bg-[#fcfaf7]"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <td className="py-4 px-6 font-medium">
                          #{reservation.id}
                        </td>
                        <td className="py-4 px-6">{reservation.property}</td>
                        <td className="py-4 px-6">{reservation.date}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              reservation.status === "مكتمل"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-[#bda069] hover:text-[#a8905e] font-medium">
                            التفاصيل
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-[#eee5d4]">
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    عرض 1-2 من {user?.reservations?.length} نتائج
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#bda069] text-white w-10 h-10 rounded-full flex items-center justify-center">
                      1
                    </button>
                    <button className="border border-[#eee5d4] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f8f5f0]">
                      2
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
