// components/admin/DeleteConfirmation.tsx
"use client";

import { useState } from "react";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  resourceName: string;
}

export default function DeleteConfirmation({
  onConfirm,
  onCancel,
  resourceName,
}: DeleteConfirmationProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
        <p className="mb-6">
          هل أنت متأكد أنك تريد حذف {resourceName}؟ لا يمكن التراجع عن هذا
          الإجراء.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
            disabled={loading}
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
