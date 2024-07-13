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
  servicePrice: any;
  setServicePrice: any;
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
  servicePrice,
  setServicePrice,
}) => {
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
      <div className="flex flex-col items-start p-2 mt-5 gap-2">
        <h1 className="font-bold">هل ترغب في خدمات اضافية؟</h1>
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <h1> كراسي حفلات - 200 ريال</h1>
          <div className="flex justify-center items-center">
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() =>
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  chairPrice: prevState.chairPrice + 1,
                }))
              }
            >
              +
            </Button>
            <input
              type="number"
              value={servicePrice.chairPrice}
              onChange={(e) =>
                setServicePrice({ ...servicePrice, chairPrice: e.target.value })
              }
              className="text-center border-[#bda069] border-[1px] h-[34.5px] w-[50px]"
            />
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() => {
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  chairPrice:
                    prevState.chairPrice > 0 ? prevState.chairPrice - 1 : 0,
                }));
              }}
            >
              -
            </Button>{" "}
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <h1> ضيافة قهوة - 250 ريال</h1>
          <div className="flex justify-center items-center">
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() =>
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  coffeePrice: prevState.coffeePrice + 1,
                }))
              }
            >
              +
            </Button>
            <input
              type="number"
              value={servicePrice.coffeePrice}
              onChange={(e) =>
                setServicePrice({
                  ...servicePrice,
                  coffeePrice: e.target.value,
                })
              }
              className="text-center border-[#bda069] border-[1px] h-[34.5px] w-[50px]"
            />
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() => {
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  coffeePrice:
                    prevState.coffeePrice > 0 ? prevState.coffeePrice - 1 : 0,
                }));
              }}
            >
              -
            </Button>{" "}
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <h1> ضيافة حلى - 150 ريال</h1>
          <div className="flex justify-center items-center">
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() =>
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  sweetPrice: prevState.sweetPrice + 1,
                }))
              }
            >
              +
            </Button>
            <input
              type="number"
              value={servicePrice.sweetPrice}
              onChange={(e) =>
                setServicePrice({ ...servicePrice, sweetPrice: e.target.value })
              }
              className="text-center border-[#bda069] border-[1px] h-[34.5px] w-[50px]"
            />
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() => {
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  sweetPrice:
                    prevState.sweetPrice > 0 ? prevState.sweetPrice - 1 : 0,
                }));
              }}
            >
              -
            </Button>{" "}
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <h1> سفرة طعام - 100 ريال</h1>
          <div className="flex justify-center items-center">
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() =>
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  tablePrice: prevState.tablePrice + 1,
                }))
              }
            >
              +
            </Button>
            <input
              type="number"
              value={servicePrice.tablePrice}
              onChange={(e) =>
                setServicePrice({ ...servicePrice, tablePrice: e.target.value })
              }
              className="text-center border-[#bda069] border-[1px] h-[34.5px] w-[50px]"
            />
            <Button
              className="h-[35px] bg-[#bda069] text-white font-bold rounded-none"
              onClick={() => {
                setServicePrice((prevState: any) => ({
                  ...prevState,
                  tablePrice:
                    prevState.tablePrice > 0 ? prevState.tablePrice - 1 : 0,
                }));
              }}
            >
              -
            </Button>{" "}
          </div>
        </div>
      </div>
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
              <AlertDialogDescription>
                <div className="flex justify-between items-center gap-5">
                  <div className="text-right">
                    <h1>من تاريخ:</h1>
                    <p>{dateRange?.startDate?.toString()}</p>
                  </div>
                  <div className="text-right">
                    <h1>الى تاريخ:</h1>
                    <p>{dateRange?.endDate?.toString()}</p>
                  </div>
                </div>
                <Separator className="mt-5" />
                <div className="flex flex-col items-start w-full">
                  <div className="flex justify-between items-center w-full mt-2">
                    {servicePrice.chairPrice > 0 && (
                      <>
                        <h1>كراسي حفلات</h1>
                        <p>{servicePrice.chairPrice * 200} SAR</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center w-full mt-2">
                    {servicePrice.coffeePrice > 0 && (
                      <>
                        <h1>ضيافة قهوة</h1>
                        <p>{servicePrice.coffeePrice * 250} SAR</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center w-full mt-2">
                    {servicePrice.sweetPrice > 0 && (
                      <>
                        <h1>ضيافة حلى</h1>
                        <p>{servicePrice.sweetPrice * 150} SAR</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center w-full mt-2">
                    {servicePrice.tablePrice > 0 && (
                      <>
                        <h1>سفرة طعام</h1>
                        <p>{servicePrice.tablePrice * 100} SAR</p>
                      </>
                    )}
                  </div>
                  {servicePrice.chairPrice === 0 &&
                    servicePrice.sweetPrice === 0 &&
                    servicePrice.tablePrice === 0 &&
                    servicePrice.coffeePrice === 0 && (
                      <div className="mb-5">لم يتم اضافة خدمات اضافية</div>
                    )}
                  <Separator />
                  <div className="mt-5 flex justify-between items-center w-full">
                    <h1>المجموع</h1>
                    <p>{totalPrice} SAR</p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-5 max-md:flex-col max-md:gap-2 rounded-md">
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
