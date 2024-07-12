import React from "react";
import { getCurrentUser } from "@/lib/action/user.action";
import { getFavouriteListing } from "@/lib/action/favourite.action";
import FavouriteClient from "./FavouriteClient";

const page = async () => {
  const listings = await getFavouriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5">
        <h1 className="text-[40px] max-md:text-[30px] font-medium">
          لا يوجد شاليه بالمفضلة
        </h1>
        <p className="opacity-60">
          يبدو انه لا يوجد لديك اي قائمة بالمفضل لديك
        </p>
      </div>
    );
  }
  return <FavouriteClient listings={listings} currentUser={currentUser} />;
};

export default page;
