import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { getReservations } from "@/lib/action/reservations.action";
import ReservationClient from "./ReservationClient";

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

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5">
        <h1 className="text-[40px] max-md:[30px] font-medium">
          لا يوجد حجوزات
        </h1>
        <p className="opacity-60">يبدو انه لا يوجد حجوزات حتى الان</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5 mb-10">
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default page;
