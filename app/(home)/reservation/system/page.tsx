import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { redirect } from "next/navigation";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
  }
  return <div className="min-h-screen mt-[130px]">نظام الحجز</div>;
};

export default page;
