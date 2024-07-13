import ListingCard from "@/components/Lisitng/ListingCard";
import { Listing, User } from "@prisma/client";
import React from "react";
interface FavouriteClientProps {
  listings: Listing | null;
  currentUser: User | null;
}
const FavouriteClient: React.FC<FavouriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div className="min-h-screen mt-[145px] px-[145px] max-md:px-5">
      <h1 className="text-[40px] max-md:text-[30px] font-medium">المفضلات</h1>
      <p>قائمة بالاماكن التي تفضلها</p>
      <div className="mt-10 grid  sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            typeOfListing={"favourite"}
          />
        ))}
      </div>
    </div>
  );
};

export default FavouriteClient;
