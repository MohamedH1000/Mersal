"use client";
import { Listing, Reservation } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "../ui/button";
import HeartButton from "./HeartButton";
import { motion } from "framer-motion";
import "./listings.css";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-menubar";
import Link from "next/link";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation | any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any;
  typeOfListing?: string;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  typeOfListing,
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
    // console.log(reservation);
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
        <div
          className={
            "aspect-square relative overflow-hidden rounded-xl border-[1px] shadow-md h-full"
          }
        >
          <Carousel
            className="relative w-full h-full"
            opts={{
              loop: true,
            }}
            orientation="horizontal"
          >
            <CarouselContent className="flex-row-reverse">
              {data.imageSrc?.map((image: string, index: number) => (
                <CarouselItem key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Listing Image ${index + 1}`}
                    className="object-cover group-hover:scale-110 transition"
                    fill
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
            <CarouselNext className="absolute top-1/2 right-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
          </Carousel>

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data?.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || ""}
        </div>
        <div className="flex justify-center items-center font-bold text-[18px]">
          {data?.title}
        </div>
        {(typeOfListing === "myReservations" || typeOfListing === "trips") && (
          <div className="flex justify-between items-center font-bold">
            <p>حجز عن</p>
            <p>
              {reservation?.user?.name
                ? reservation?.user?.name
                : reservation?.nameOfReserver}
            </p>
          </div>
        )}
        <div className="flex flex-row items-center gap-1 justify-between">
          <div className="font-semibold">SAR {data.price}</div>
          {!reservation && <div className="font-light">لكل ليلة</div>}
        </div>
        {(typeOfListing === "myReservations" || typeOfListing === "trips") && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-[#bda069] text-white border-[#bda069]
 hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
              >
                عرض تفاصيل الحجز
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[500px] overflow-y-auto">
              <DialogHeader className="flex flex-col items-start mt-4">
                <DialogTitle>بيانات الحجز</DialogTitle>
                <DialogDescription>
                  هذه بيانات الحجز الخاصة بك
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <Label className="text-right">الاسم</Label>
                  <p>
                    {reservation?.user?.name
                      ? reservation?.user?.name
                      : reservation?.nameOfReserver}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">الايميل</Label>
                  <p>
                    {reservation?.user?.email
                      ? reservation?.user?.email
                      : reservation?.email}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">رقم الهاتف</Label>
                  <p>{reservation?.phoneNumber}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">تاريخ الوصول:</Label>
                  <p>{format(new Date(reservation?.startDate), "PP")}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">تاريخ المغادرة:</Label>
                  <p>{format(new Date(reservation?.endDate), "PP")}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">سعر الليلة:</Label>
                  <p className="font-bold">{reservation.listing.price} SAR</p>
                </div>
                <div className="flex justify-between items-center ">
                  {!reservation.servicePrice.chairPrice ||
                  !reservation.servicePrice.sweetPrice ||
                  !reservation.servicePrice.chairPrice ||
                  !reservation.servicePrice.tablePrice ? (
                    <Label className="text-center flex justify-center items-center w-full opacity-60">
                      لا يوجد خدمات اضافية
                    </Label>
                  ) : (
                    <div className="flex flex-col items-start gap-5 w-full">
                      <Label className="text-center flex justify-center items-center w-full">
                        الخدمات الاضافية
                      </Label>
                      <div className="flex justify-between items-center w-full opacity-60">
                        <Label className="text-right">
                          كراسي حفلات (x{reservation.servicePrice.chairPrice})
                        </Label>
                        <p>{reservation.servicePrice.chairPrice * 200} SAR</p>
                      </div>
                      <div className="flex justify-between items-center w-full opacity-60">
                        <Label className="text-right">
                          ضيافة قهوة (x{reservation.servicePrice.coffeePrice})
                        </Label>
                        <p>{reservation.servicePrice.coffeePrice * 250} SAR</p>
                      </div>
                      <div className="flex justify-between items-center w-full opacity-60">
                        <Label className="text-right">
                          ضيافة حلى (x{reservation.servicePrice.sweetPrice})
                        </Label>
                        <p>{reservation.servicePrice.sweetPrice * 150} SAR</p>
                      </div>
                      <div className="flex justify-between items-center w-full opacity-60">
                        <Label className="text-right">
                          سفرة طعام (x{reservation.servicePrice.tablePrice})
                        </Label>
                        <p>{reservation.servicePrice.tablePrice * 100} SAR</p>
                      </div>
                      <div className="flex justify-between items-center w-full opacity-60">
                        <Label className="text-right">
                          مجموع الخدمات الاضافية
                        </Label>
                        <p>
                          {reservation.servicePrice.tablePrice * 100 +
                            reservation.servicePrice.sweetPrice * 150 +
                            reservation.servicePrice.coffeePrice * 250 +
                            reservation.servicePrice.chairPrice * 200}{" "}
                          SAR
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-right">المجموع الكلي:</Label>
                  <p className="font-bold">{reservation.totalPrice} SAR</p>
                </div>
              </div>
              <DialogFooter className="flex justify-center items-center w-full">
                <Button
                  type="submit"
                  className="bg-[#bda069] text-white border-[#bda069]
 hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
                  onClick={() => router.push(`/listings/${data.id}`)}
                >
                  اظهار صفحة الحجز
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {typeOfListing === "reservation" && (
          <Button
            onClick={() => router.push(`/listings/${data.id}`)}
            className="bg-[#bda069] text-white border-[#bda069]
 hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
          >
            قم بالحجز الان
          </Button>
        )}
        {typeOfListing === "favourite" && (
          <Button
            onClick={() => router.push(`/listings/${data.id}`)}
            className="bg-[#bda069] text-white border-[#bda069]
 hover:text-[#bda069] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
          >
            عرض التفاصيل
          </Button>
        )}
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
                  {actionLabel === "الغاء الحجز" && (
                    <div>
                      <h1> هل انت متاكد بالغاء هذا الحجز ؟</h1>
                    </div>
                  )}
                  {actionLabel === "الغاء رحلتي" && (
                    <div>
                      <h1> هل انت متاكد بالغاء هذا الحجز ؟</h1>
                      <p className="opacity-60">
                        سيتم تحويلك الى صفحة واتساب للتواصل معنا لالغاء رحلتك
                      </p>
                    </div>
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {actionLabel === "قم بحذف الشاليه" &&
                    "هذه العملية لا يمكن ارجاعها وسيتم حذف جميع الحجوزات المرتبطه بهذا الشاليه"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {(actionLabel === "الغاء الحجز" ||
                actionLabel === "قم بحذف الشاليه") && (
                <AlertDialogFooter className="gap-3 flex justify-center items-center max-md:flex-col max-md:items-start w-full">
                  <AlertDialogAction onClick={handleCancel}>
                    تاكيد
                  </AlertDialogAction>
                  <AlertDialogCancel>الغاء</AlertDialogCancel>
                </AlertDialogFooter>
              )}
              {actionLabel === "الغاء رحلتي" && (
                <AlertDialogFooter className="gap-3 flex justify-center items-center max-md:flex-col max-md:items-start w-full">
                  <Link href={"https://wa.me/+966580782229"} target="_blank">
                    <AlertDialogAction>تاكيد</AlertDialogAction>
                  </Link>
                  <AlertDialogCancel>الغاء</AlertDialogCancel>
                </AlertDialogFooter>
              )}
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </motion.div>
  );
};

export default ListingCard;
