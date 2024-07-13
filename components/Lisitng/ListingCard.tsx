"use client";
import { Listing, Reservation } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "../ui/button";
import HeartButton from "./HeartButton";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation | any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );
  // console.log(data.imageSrc);
  const price = useMemo(() => {
    if (reservation) {
      return reservation?.totalPrice;
    }
    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation?.startDate);
    const end = new Date(reservation?.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <motion.div
      className="col-span-1 cursor-default group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Carousel className="relative w-full">
            <CarouselContent>
              {data.imageSrc?.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square w-full h-full">
                    <Image
                      src={image}
                      alt={`Listing Image ${index + 1}`}
                      className="object-cover h-full w-full group-hover:scale-110 transition"
                      layout="fill"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
            <CarouselNext className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
          </Carousel>

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data?.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || ""}
        </div>
        <div className="flex flex-row items-center gap-1 justify-between">
          <div className="font-semibold">SAR {data.price}</div>
          {!reservation && <div className="font-light">لكل ليلة</div>}
        </div>
        <Button
          onClick={() => router.push(`/listings/${data.id}`)}
          className="bg-[#bda069] text-white border-[#bda069]
 hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
        >
          قم بالحجز الان
        </Button>
        {onAction && actionLabel && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={disabled}
                className="bg-[#bda069] text-white border-[#bda069]
          hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
              >
                {actionLabel}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              dir="rtl"
              className="flex flex-col items-start rounded-md"
            >
              <AlertDialogHeader dir="rtl">
                <AlertDialogTitle className="text-start">
                  {actionLabel === "قم بحذف الشاليه" &&
                    "هل انت متاكد من اتمام عملية الحذف"}
                  {actionLabel === "الغاء الحجز" &&
                    "هل انت متاكد بالغاء هذا الحجز ؟"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {actionLabel === "قم بحذف الشاليه" &&
                    "هذه العملية لا يمكن ارجاعها وسيتم حذف جميع الحجوزات المرتبطه بهذا الشاليه"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-3 flex justify-center items-center max-md:flex-col max-md:items-start w-full">
                <AlertDialogAction onClick={handleCancel}>
                  تاكيد
                </AlertDialogAction>
                <AlertDialogCancel>الغاء</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </motion.div>
  );
};

export default ListingCard;
