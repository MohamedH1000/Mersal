import ReservationPage from "@/components/Reservations/ReservationPage";
import React from "react";

const page = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center 
    justify-start py-[150px] w-full"
    >
      <ReservationPage />
    </section>
  );
};

export default page;
