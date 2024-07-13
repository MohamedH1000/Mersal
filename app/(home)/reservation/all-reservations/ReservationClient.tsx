"use client";
import React, { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Reservation, User } from "@prisma/client";
import { deleteReservation } from "@/lib/action/reservations.action";
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
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await deleteReservation({ reservationId: id });
        toast({
          title: "تم الغاء الحجز بنجاح",
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
  return (
    <div>
      <h1 className="text-[40px] max-md:text-[30px] font-medium">الحجوزات</h1>
      <p className="opacity-60">الحجوزات الخاصة بوحداتك</p>
      <div className="mt-10 grid  sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
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
