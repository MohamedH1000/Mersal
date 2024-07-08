import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { redirect } from "next/navigation";
import ReservationNav from "@/components/Reservations/ReservationNav";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
  }
  return (
    <div
      className="min-h-screen mt-[130px] w-full
    px-20 max-md:px-5 flex flex-col items-center"
    >
      <ReservationNav />
    </div>
  );
};

export default page;
