"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DeleteButton({
  id,
  action,
  confirmMessage = "Are you sure?",
}: {
  id: string;
  action: (id: string) => Promise<any>;
  confirmMessage?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(confirmMessage)) {
      startTransition(async () => {
        await action(id);
        router.refresh();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:underline disabled:opacity-50"
    >
      {isPending ? "جاري الحذف..." : "حذف"}
    </button>
  );
}
