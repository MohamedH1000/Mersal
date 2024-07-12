import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import EmptyState from "@/components/Reservations/EmptyState";
import { getAllChalets } from "@/lib/action/chalet.action";
import { redirect } from "next/navigation";
import AddChaletClient from "./AddChaletClient";
import AddChaletDialog from "@/components/AddChalet/AddChaletDialog";

const page = async () => {
  const currentUser = await getCurrentUser();
  const allChalets = await getAllChalets();
  const isEmpty = allChalets?.length === 0 ? true : false;
  if (currentUser?.role !== "admin") redirect("/");
  return (
    <div
      className="min-h-screen mt-[130px] px-[150px] max-md:px-5 
    flex flex-col max-md:items-center w-full"
    >
      <AddChaletDialog currentUser={currentUser} />
      {isEmpty ? (
        <div className="min-h-screen mt-[130px] flex justify-center text-[40px]">
          <EmptyState />
        </div>
      ) : (
        <AddChaletClient allChalets={allChalets} currentUser={currentUser} />
      )}
    </div>
  );
};

export default page;
