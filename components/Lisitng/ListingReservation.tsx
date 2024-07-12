"use client";
import { Range } from "react-date-range";

import React from "react";
import Calender from "./Calender";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
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
interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disableDates: Date[] | any;
  isLoading: Boolean;
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disableDates,
  isLoading,
}) => {
  console.log(dateRange);
  return (
    <motion.div
      className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 100, y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">SAR {price}</div>
        <div className="font-light text-neutral-600">لكل ليلة</div>
      </div>
      <Separator />
      <Calender
        value={dateRange}
        disabledDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <Separator />
      <div className="p-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isLoading ? true : false}
              label="Reserve"
              className="w-full rounded-md bg-[#bda069]
        text-white border-[#bda069] hover:border-[1px] hover:bg-white 
        hover:text-[#bda069] transtion duration-300 font-bold"
            >
              {isLoading ? "برجاء الانتظار" : "قم بالحجز"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col items-start">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-start">
                بيانات الحجز
              </AlertDialogTitle>
              <AlertDialogDescription className="flex justify-between items-center gap-5">
                <div>
                  <h1>:من تاريخ</h1>
                  <p>{dateRange?.startDate?.toString()}</p>
                </div>
                <div>
                  <h1>الى تاريخ:</h1>
                  <p>{dateRange?.endDate?.toString()}</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-5">
              <AlertDialogAction onClick={onSubmit}>تاكيد</AlertDialogAction>
              <AlertDialogCancel>الغاء</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="p-4 flex flex-row  items-center justify-between font-semibold text-lg">
        <div>المجموع:</div>
        <div>SAR {totalPrice}</div>
      </div>
    </motion.div>
  );
};

export default ListingReservation;
