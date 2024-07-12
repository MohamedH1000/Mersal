"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useToast } from "../ui/use-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import { createReservation } from "@/lib/action/reservations.action";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface ListingClientProps {
  reservations?: Reservation[] | any;
  listing: Listing | any;
  currentUser: User | any;
}
const IndividualListing: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const { toast } = useToast();
  const disableDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservations: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [servicePrice, setServicePrice] = useState({
    chairPrice: 0,
    coffeePrice: 0,
    sweetPrice: 0,
    tablePrice: 0,
  });
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const router = useRouter();

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return toast({
        title: "يجب تسجيل الدخول اولا",
      });
    }
    setIsLoading(true);
    try {
      await createReservation({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });
      toast({
        title: "تم حجز الشاليه",
        description:
          "بامكانك التوجه من خلال قائمة المستخدم الى رحلاتي لرؤية بيانات الحجز",
        className: "bg-[green] text-white",
      });
      setDateRange(initialDateRange);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "حدث خطا اثناء حجز الشاليه",
        className: "bg-[red] text-white",
      });
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, listing?.id, router, currentUser]);
  console.log("listing price", listing?.price);
  console.log("here is the total price", totalPrice);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;

      let newTotalPrice = 0;

      if (dayCount && listing.price) {
        newTotalPrice = dayCount * listing?.price;
      } else {
        newTotalPrice = listing.price;
      }

      if (servicePrice.chairPrice > 0) {
        newTotalPrice += servicePrice.chairPrice * 200;
      }
      if (servicePrice.sweetPrice > 0) {
        newTotalPrice += servicePrice.sweetPrice * 150;
      }
      if (servicePrice.coffeePrice > 0) {
        newTotalPrice += servicePrice.coffeePrice * 250;
      }
      if (servicePrice.tablePrice > 0) {
        newTotalPrice += servicePrice.tablePrice * 100;
      }

      setTotalPrice(newTotalPrice);
    }
  }, [
    dateRange,
    listing?.price,
    servicePrice.chairPrice,
    servicePrice.sweetPrice,
    servicePrice.tablePrice,
    servicePrice.coffeePrice,
  ]);
  return (
    <div className="min-h-screen mt-[140px] px-[150px] max-lg:px-5">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 xl:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
          />
          <div className="order-first mb-10 xl:order-last md:col-span-3">
            <ListingReservation
              servicePrice={servicePrice}
              setServicePrice={setServicePrice}
              isLoading={isLoading}
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disableDates={disableDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualListing;
