import React from "react";
import type { Metadata } from "next";
import Register from "@/components/Register/Register";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/action/user.action";

export const metadata: Metadata = {
  title: "التسجيل",
  description: "قم بالتسجيل للحجز معنا في شاليهاتنا",
};
const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex justify-center items-center min-h-screen">
      {currentUser ? redirect("/") : <Register />}
    </div>
  );
};

export default page;
