"use client";
import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { use, useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ListingCard from "@/components/Lisitng/ListingCard";
import { deleteReservation } from "@/lib/action/reservations.action";
interface TripClientProps {
  reservations: Reservation;
  currentUser: User | null;
}
const TripsClient: React.FC<TripClientProps> = ({
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
        });
        router.refresh();
      } catch (error) {
        console.log(error);
        toast({
          title: "حدث خطا اثناء الغاء الحجز",
        });
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );
  return (
    <div className="px-[145px] max-md:px-5">
      <h1 className="text-[40px] max-md:text-[30px] font-medium">رحلاتي</h1>
      <p className="opacity-60">اين كنت واين ستذهب</p>
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
          />
        ))}
      </div>
    </div>
  );
};

export default TripsClient;
