"use client";
import React, { useCallback, useState } from "react";
import { format, formatISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ReservationNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [arriveDate, setArriveDate] = useState<Date>();
  const [leaveDate, setLeaveDate] = useState<Date>();
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [baby, setBaby] = useState(0);
  const guestCount = parseInt(adult) + parseInt(children) + parseInt(baby);
  // console.log(guestCount);
  // console.log(children);
  // console.log(adult);
  // console.log(arriveDate, leaveDate);
  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      let currentQuery = {};

      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        guestCount,
      };
      if (arriveDate) {
        updatedQuery.startDate = formatISO(arriveDate);
      }
      if (leaveDate) {
        updatedQuery.endDate = formatISO(leaveDate);
      }

      const url = qs.stringifyUrl(
        {
          url: "/reservation/system",
          query: updatedQuery,
        },
        { skipNull: true }
      );
      router.push(url);
    },
    [router, guestCount, leaveDate, arriveDate, searchParams]
  );
  return (
    <div className="flex flex-col max-md:items-center md:items-start">
      <motion.h1
        className="text-[40px] font-bold max-md:text-center max-md:text-[30px]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.2 }}
      >
        اهلا بك في نظام حجز شاليهات مرسال
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full mt-[20px] bg-[white] h-[200px] border-[#bda069] cursor-pointer
max-md:w-[500px] max-sm:w-full px-5 py-2 border-[1px] shadow-lg 
flex justify-between items-center rounded-md max-lg:flex-col max-lg:h-auto"
      >
        <div className="flex flex-col gap-3 max-sm:w-full">
          <h1>حدد تاريخ الوصول :</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal max-md:w-[200px] max-sm:w-full",
                  !arriveDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {arriveDate ? (
                  format(arriveDate, "PPP")
                ) : (
                  <span>اختر معاد الوصول</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={arriveDate}
                onSelect={setArriveDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3 mr-5 max-md:mr-0 max-sm:w-full">
          <h1>حدد تاريخ المغادرة :</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal max-md:w-[200px] max-sm:w-full",
                  !leaveDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {leaveDate ? (
                  format(leaveDate, "PPP")
                ) : (
                  <span>اختر معاد المغادرة</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={leaveDate}
                onSelect={setLeaveDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <div className="flex flex-col gap-3 mr-5 max-md:mr-0">
          <div className="flex justify-center items-center gap-4 max-md:flex-col">
            <div className="flex flex-col">
              <label htmlFor="adults" className="mb-2">
                عدد البالغين:
              </label>
              <Input
                name="adults"
                type="number"
                placeholder="البالغين"
                value={adult}
                onChange={(e: any) => setAdult(e.target.value)}
                className="focus:outline-none outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="children" className="mb-2">
                عدد الاطفال:
              </label>
              <Input
                name="children"
                type="number"
                placeholder="الاطفال"
                value={children}
                onChange={(e: any) => setChildren(e.target.value)}
                className="focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="baby" className="mb-2">
                عدد الرضع:
              </label>
              <Input
                name="baby"
                type="number"
                placeholder="الرضع"
                value={baby}
                onChange={(e: any) => setBaby(e.target.value)}
                className="focus:outline-none"
              />
            </div>
          </div>
        </div> */}
        <div className="max-sm:w-full flex justify-center items-center">
          <Button
            className="mt-9 bg-[#bda069] text-white max-sm:w-full
          hover:text-[#bda069] hover:border-[#bda069] border-[1px] 
                hover:bg-white transition duration-300 font-bold sm:mr-5"
            type="submit"
          >
            بحث
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default ReservationNav;
