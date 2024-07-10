import { getCurrentUser } from "@/lib/action/user.action";
import { getChaletById } from "@/lib/action/chalet.action";
import React from "react";
import IndividualListing from "@/components/Lisitng/IndividualListing";

const page = async ({ params }: any) => {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  const listing = await getChaletById({ listingId });

  if (!listing) {
    return <div>حدثت مشكلة اثناء عرض هذا الشاليه</div>;
  }
  return (
    <div>
      <IndividualListing listing={listing} currentUser={currentUser} />
    </div>
  );
};

export default page;
