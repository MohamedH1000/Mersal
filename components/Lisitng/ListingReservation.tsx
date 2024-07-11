"use client";
import { Range } from "react-date-range";

import React from "react";
import Calender from "./Calender";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
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
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
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
        <Button
          disabled={isLoading ? true : false}
          label="Reserve"
          onClick={onSubmit}
          className="w-full rounded-md bg-[#bda069]
        text-white border-[#bda069] hover:border-[1px] hover:bg-white 
        hover:text-[#bda069] transtion duration-300 font-bold"
        >
          {isLoading ? "برجاء الانتظار" : "قم بالحجز"}
        </Button>
      </div>
      <div className="p-4 flex flex-row  items-center justify-between font-semibold text-lg">
        <div>المجموع:</div>
        <div>SAR {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
