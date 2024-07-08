import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import MyReservations from "@/components/Reservations/MyReservations";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="mt-[130px] min-h-screen w-full">
      <MyReservations currentUser={currentUser} />
    </div>
  );
};

export default page;
