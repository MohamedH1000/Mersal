"use client";
import React, { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Reservation, User } from "@prisma/client";
import {
  cancelReservation,
  confirmReservation,
  deleteReservation,
} from "@/lib/action/reservations.action";
import ListingCard from "@/components/Lisitng/ListingCard";
interface ReservationClientProps {
  reservations: Reservation | null;
  currentUser: User | null;
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [cancelId, setCancelId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setCancelId(id);
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
        setCancelId("");
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
  const onDeleted = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await deleteReservation({ reservationId: id });
        toast({
          title: "تم حذف الحجز",
          className: "bg-[green] text-white",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "حدثت مشكلة اثناء حذف الحجز",
          className: "bg-[red] text-white",
        });
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );
  return (
    <div>
      <h1 className="text-[40px] max-md:text-[30px] font-medium">الحجوزات</h1>
      <p className="opacity-60">الحجوزات الخاصة بوحداتك</p>
      <div className="mt-10 grid  sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
        {reservations
          ?.filter((res: any) => res.status === "canceled")
          .map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              onConfirmed={onConfirmed}
              onDeleted={onDeleted}
              disabled={
                deleteId === reservation?.id ||
                confirmedId === reservation?.id ||
                cancelId === reservation?.id
              }
              actionLabel="حذف الحجز"
              currentUser={currentUser}
              typeOfListing="myReservations"
            />
          ))}
      </div>
    </div>
  );
};

export default ReservationClient;
