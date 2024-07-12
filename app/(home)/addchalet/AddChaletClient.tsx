"use client";
import ListingCard from "@/components/Lisitng/ListingCard";
import { useToast } from "@/components/ui/use-toast";
import { removeChaletById } from "@/lib/action/chalet.action";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const AddChaletClient = ({ allChalets, currentUser }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await removeChaletById({ listingId: id });
        toast({
          title: "تم حذف الشاليه بنجاح",
          className: "bg-[green] text-white",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "حدثت مشكله اثناء حذف الشاليه",
          className: "bg-[red] text-white",
        });
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );
  return (
    <div
      className="mt-10 grid gap-8 w-full lg:grid-cols-4 
max-md:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 mb-10"
    >
      {allChalets?.map((chalet: any) => {
        return (
          <ListingCard
            data={chalet}
            key={chalet.id}
            actionId={chalet.id}
            currentUser={currentUser}
            actionLabel="قم بحذف الحجز"
            onAction={onCancel}
            disabled={deleteId === chalet.id}
          />
        );
      })}
    </div>
  );
};

export default AddChaletClient;
