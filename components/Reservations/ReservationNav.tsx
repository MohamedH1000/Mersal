"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

const ReservationNav = () => {
  const [arriveDate, setArriveDate] = useState<Date>();
  const [leaveDate, setLeaveDate] = useState<Date>();
  return (
    <div className="flex flex-col max-md:items-center">
      <motion.h1
        className="text-[40px] font-bold max-md:text-center max-md:text-[30px]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.2 }}
      >
        اهلا بك في نظام حجز شاليهات مرسال
      </motion.h1>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full mt-[20px] bg-[white] h-[200px] border-[#bda069] cursor-pointer
max-md:w-[500px] max-sm:w-[250px] px-5 py-2 border-[1px] 
flex justify-between items-center rounded-md max-lg:flex-col max-lg:h-auto"
      >
        <div className="flex flex-col gap-3">
          <h1>حدد تاريخ الوصول :</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal max-md:w-[200px]",
                  !arriveDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {arriveDate ? (
                  format(arriveDate, "PPP")
                ) : (
                  <span>Pick a date</span>
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
        <div className="flex flex-col gap-3 mr-5 max-md:mr-0">
          <h1>حدد تاريخ المغادرة :</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal max-md:w-[200px]",
                  !leaveDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {leaveDate ? (
                  format(leaveDate, "PPP")
                ) : (
                  <span>Pick a date</span>
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
        <div className="flex flex-col gap-3 mr-5 max-md:mr-0">
          <h1>عدد الأفراد :</h1>
          <div className="flex justify-center items-center gap-4 max-md:flex-col">
            <Input
              type="number"
              placeholder="البالغين"
              className="focus:outline-none outline-none"
            />
            <Input
              type="number"
              placeholder="الاطفال"
              className="focus:outline-none"
            />
            <Input
              type="number"
              placeholder="الرضع"
              className="focus:outline-none"
            />
          </div>
        </div>
        <Button
          className="mt-9 bg-[#bda069] text-white 
        hover:text-[#bda069] hover:border-[#bda069] border-[1px] 
      hover:bg-white transition duration-300 font-bold mr-5"
        >
          بحث
        </Button>
      </motion.div>
    </div>
  );
};

export default ReservationNav;
