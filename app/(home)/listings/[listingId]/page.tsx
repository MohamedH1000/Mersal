import { getCurrentUser } from "@/lib/action/user.action";
import { getChaletById } from "@/lib/action/chalet.action";
import React from "react";
import IndividualListing from "@/components/Lisitng/IndividualListing";
import { getReservations } from "@/lib/action/reservations.action";

const page = async ({ params }: any) => {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  const listing = await getChaletById({ listingId });
  const reservations = await getReservations(params);
  console.log(reservations);

  if (!listing) {
    return <div>حدثت مشكلة اثناء عرض هذا الشاليه</div>;
  }
  return (
    <div>
      <IndividualListing
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default page;
