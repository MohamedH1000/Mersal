import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { getReservations } from "@/lib/action/reservations.action";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservations({ userId: currentUser?.id });
  const totalReservations = reservation.filter(
    (res) => res.status !== "canceled"
  );
  if (!currentUser) {
    return (
      <div className="min-h-screen mt-[145px] px-[150px]">
        <h1 className="text-[40px] max-md:text-[30px]">
          قم بتسجيل الدخول اولا لعرض الصفحة
        </h1>
      </div>
    );
  }
  if (reservation?.length === 0) {
    return (
      <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5">
        <h1 className="text-[40px] max-md:text-[30px]">لا يوجد رحلات</h1>
        <p className="opacity-60">يبدو انك لم تقم بحجز اي رحلة</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen mt-[145px] mb-10">
      <TripsClient reservations={reservation} currentUser={currentUser} />
    </div>
  );
};

export default page;
