"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Listing, User } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cancelReservation,
  confirmReservation,
  getReservations,
} from "@/lib/action/reservations.action";
import ListingCard from "@/components/Lisitng/ListingCard";
import ReactBigCalender from "./components/react-big-calender";
interface ReservationClientProps {
  currentUser: User | null;
  chalets: Listing | any;
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  currentUser,
  chalets,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState("");
  const [confirmedId, setConfirmedId] = useState("");
  const [listingId, setListingId] = useState("");
  const [allReservations, setAllReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations({
        listingId,
      });
      setAllReservations(response);
    };

    fetchReservations();
  }, [listingId, router, deleteId, confirmedId]);
  const reservations = allReservations?.filter(
    (reservation: any) => reservation.status !== "canceled"
  );
  // console.log(listingId);
  // console.log(allReservations);
  const onCancel = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await cancelReservation({ reservationId: id });
        toast({
          title: "تم الغاء الحجز ",
          className: "bg-[green] text-white",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "حدثت مشكلة اثناء الغاء الحجز",
          className: "bg-[red] text-white",
        });
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );
  const onConfirmed = useCallback(
    async (id: string) => {
      setConfirmedId(id);
      try {
        await confirmReservation({ reservationId: id });
        toast({
          title: "تم تاكيد الحجز",
          className: "bg-[green] text-white",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "حدثت مشكلة اثناء تاكيد الحجز",
          className: "bg-[red] text-white",
        });
      } finally {
        setConfirmedId("");
      }
    },
    [router]
  );
  // console.log(chalets);
  return (
    <div>
      <h1 className="text-[40px] max-md:text-[30px] font-medium">الحجوزات</h1>
      <p className="opacity-60">الحجوزات الخاصة بوحداتك</p>
      <div className="mt-10 flex justify-start items-center gap-2">
        <label htmlFor="chaletSelection">اختر الشاليه</label>
        <Select onValueChange={(value: any) => setListingId(value)} dir="rtl">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر" />
          </SelectTrigger>
          <SelectContent>
            {chalets.map((chalet: any, i: any) => (
              <SelectItem value={chalet.id} key={i}>
                {chalet.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ReactBigCalender allReservations={allReservations} />
      <div className="mt-10 grid  sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
        {reservations
          ?.filter((res: any) => res.status !== "canceled")
          .map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              onConfirmed={onConfirmed}
              disabled={
                deleteId === reservation?.id || confirmedId === reservation?.id
              }
              actionLabel="الغاء الحجز"
              currentUser={currentUser}
              typeOfListing="myReservations"
            />
          ))}
      </div>
    </div>
  );
};

export default ReservationClient;
