import React from "react";
import type { Metadata } from "next";
import Login from "@/components/Login/Login";
import { getCurrentUser } from "@/lib/action/user.action";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "قم بتسجيل الدخول للحجز معنا في شاليهاتنا",
};
const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-center min-h-screen">
      {currentUser ? redirect("/") : <Login />}
    </div>
  );
};

export default page;
