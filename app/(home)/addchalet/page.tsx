import AddChaletDialog from "@/components/AddChalet/AddChaletDialog";
import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import EmptyState from "@/components/Reservations/EmptyState";
import { getAllChalets } from "@/lib/action/chalet.action";
import ListingCard from "@/components/Lisitng/ListingCard";

const page = async () => {
  const currentUser = await getCurrentUser();
  const allChalets = await getAllChalets();
  const isEmpty = allChalets?.length === 0 ? true : false;

  return (
    <div
      className="min-h-screen mt-[130px] px-20 max-md:px-5 
    flex flex-col max-md:items-center w-full"
    >
      <AddChaletDialog currentUser={currentUser} />
      {isEmpty ? (
        <div className="min-h-screen mt-[130px] flex justify-center text-[40px]">
          <EmptyState />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default page;
