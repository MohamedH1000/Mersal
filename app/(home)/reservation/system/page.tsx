import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { redirect } from "next/navigation";
import ReservationNav from "@/components/Reservations/ReservationNav";
import { getChaletBySearch } from "@/lib/action/chalet.action";
import ListingCard from "@/components/Lisitng/ListingCard";
import NoResult from "./NoResult";

const page = async ({ searchParams }: any) => {
  const currentUser = await getCurrentUser();
  const FilteredChalets = await getChaletBySearch({
    startDate: searchParams?.startDate,
    endDate: searchParams?.endDate,
    guestCount: searchParams?.guestCount,
  });
  console.log(FilteredChalets);
  // console.log(searchParams);
  if (!currentUser) {
    redirect("/sign-in");
  }
  return (
    <div
      className="min-h-screen mt-[130px] w-full
    px-[150px] max-md:px-5 flex flex-col items-center"
    >
      <ReservationNav />

      {FilteredChalets?.length === 0 ? (
        <NoResult />
      ) : (
        <div
          className="mt-10 grid gap-8 w-full lg:grid-cols-4 
          max-md:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 mb-10"
        >
          {" "}
          {FilteredChalets?.map((chalet: any, i) => {
            return (
              <ListingCard
                data={chalet}
                key={i}
                currentUser={currentUser}
                typeOfListing="reservation"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
