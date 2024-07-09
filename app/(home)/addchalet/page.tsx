import AddChaletDialog from "@/components/AddChalet/AddChaletDialog";
import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div
      className="min-h-screen mt-[130px] px-20 max-md:px-5 
    flex flex-col max-md:items-center"
    >
      <AddChaletDialog currentUser={currentUser} />
    </div>
  );
};

export default page;
