import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { getReservations } from "@/lib/action/reservations.action";
import ReservationClient from "./ReservationClient";
import { getAllChalets } from "@/lib/action/chalet.action";
export const revalidate = 0;

const page = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "admin") {
    return (
      <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5">
        <h1 className="text-[40px] max-md:[30px] font-medium">
          لا يسمح لك بزيارة هذه الصفحة
        </h1>
        <p className="opacity-60">هذه صفحة خاصة بالادارة</p>
      </div>
    );
  }
  const allChalets = await getAllChalets();

  return (
    <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5 mb-10">
      <ReservationClient
        // reservations={reservations}
        currentUser={currentUser}
        chalets={allChalets}
      />
    </div>
  );
};

export default page;
