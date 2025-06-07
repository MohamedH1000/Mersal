"use client";
import {
  deleteReservation,
  getReservations,
} from "@/lib/action/reservations.action";
import DataTable from "../DataTable";
import { useEffect, useState } from "react";
import EditReservationModal from "./EditReservationModal";

// Client component wrapper
function ReservationActions({ reservationId }: { reservationId: any }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // console.log("Reservation", reservation);

  const handleDelete = async () => {
    if (confirm("هل أنت متأكد من حذف هذا الحجز؟")) {
      setIsDeleting(true);
      const result = await deleteReservation(reservationId);

      if (result.success) {
        window.location.reload();
      } else {
        alert(result.error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setShowEditModal(true)}
          className="text-[#bda069] hover:underline"
        >
          تعديل
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:underline disabled:opacity-50"
        >
          {isDeleting ? "جاري الحذف..." : "حذف"}
        </button>
      </div>

      {showEditModal && (
        <EditReservationModal
          reservationId={reservationId}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

// Main page component
export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations: any = await getReservations({});
      // const serializedReservations = reservations.map((res:any) => ({
      //   ...res,
      //   startDate: res?.startDate?.toISOString(),
      //   endDate: res?.endDate?.toISOString(),
      // }));
      setReservations(reservations);
    };
    fetchReservations();
  }, []);

  return (
    <DataTable
      title="إدارة الحجوزات"
      columns={[
        {
          header: "المستخدم",
          accessor: "user",
          render: (user) => user?.name || "غير معرف",
        },
        {
          header: "العقار",
          accessor: "listing",
          render: (listing) => listing?.title,
        },
        { header: "من", accessor: "startDate" },
        { header: "إلى", accessor: "endDate" },
        {
          header: "السعر الإجمالي",
          accessor: "totalPrice",
          render: (value) => `${value} درهم`,
        },
        { header: "الحالة", accessor: "status" },
        {
          header: "الإجراءات",
          accessor: "actions",
          render: (id) => <ReservationActions reservationId={id} />,
        },
      ]}
      data={reservations}
    />
  );
}
