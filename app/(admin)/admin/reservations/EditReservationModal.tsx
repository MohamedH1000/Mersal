"use client";

import { useState } from "react";
import { Reservation } from "@prisma/client";
import { updateReservation } from "@/lib/action/reservations.action";

export default function EditReservationModal({
  reservationId,
  onClose,
}: {
  reservationId: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await updateReservation(reservationId, { status });

    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">تعديل الحجز</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">الحالة:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="cancelled">ملغى</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#bda069] text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
