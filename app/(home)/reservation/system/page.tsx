import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { redirect } from "next/navigation";
import ReservationNav from "@/components/Reservations/ReservationNav";
import { getAllChalets } from "@/lib/action/chalet.action";
import ListingCard from "@/components/Lisitng/ListingCard";

const page = async () => {
  const currentUser = await getCurrentUser();
  const allChalets = await getAllChalets();
  if (!currentUser) {
    redirect("/sign-in");
  }
  return (
    <div
      className="min-h-screen mt-[130px] w-full
    px-[150px] max-md:px-5 flex flex-col items-center"
    >
      <ReservationNav />
      <div
        className="mt-10 grid gap-8 w-full lg:grid-cols-4 
        max-md:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 mb-10"
      >
        {allChalets?.map((chalet: any, i) => {
          return (
            <ListingCard data={chalet} key={i} currentUser={currentUser} />
          );
        })}
      </div>
    </div>
  );
};

export default page;
