"use client";
import { Button } from "@/components/ui/button";
import { getReservations, sendSMS } from "@/lib/action/reservations.action";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { motion } from "framer-motion";
import { format } from "date-fns";
const InquiryForm = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const reservation = await getReservations(phoneNumber);
      if (!reservation) {
        throw new Error("لا يوجد حجوزات خاصة بهذا الرقم");
      }
      const message = `
      اهلا بك ${
        reservation[0].nameOfReserver || reservation[0].user.name
      } معنا في منتجع مرسال
      بيانات الحجز الخاصة بك :
      تاريخ الوصول : ${format(reservation[0]?.startDate, "PP")}
      تاريخ المغادرة: ${format(reservation[0].endDate, "PP")}
      الخدمات الاضافية:
      ${
        !reservation[0].servicePrice.chairPrice ||
        !reservation[0].servicePrice.coffeePrice ||
        !reservation[0].servicePrice.sweetPrice ||
        !reservation[0].servicePrice.tablePrice
          ? "لا يوجد خدمات اضافية"
          : `${
              reservation[0].servicePrice.chairPrice &&
              `كراسي حفلات: ${reservation[0].servicePrice.chairPrice * 200}`
            }
        ${
          reservation[0].servicePrice.coffeePrice &&
          `ضيافة قهوة: ${reservation[0].servicePrice.coffeePrice * 250}`
        }
        ${
          reservation[0].servicePrice.sweetPrice &&
          `ضيافة حلى: ${reservation[0].servicePrice.sweetPrice * 150}`
        }
        ${
          reservation[0].servicePrice.tablePrice &&
          `سهرة طعام: ${reservation[0].servicePrice.tablePrice * 100}`
        }`
      }
      السعر: ${reservation[0].totalPrice} ريال`;

      const response = await sendSMS({ phoneNumber, message });
      // console.log("SMS response", response);
      if (!response.success) {
        throw new Error("حدث خطا اثناء الاستعلام عن الحجز");
      }
      toast({
        title: "تم ارسال رساله نصية الى هاتفك ببيانات الحجز الخاصة بك",
        className: "bg-[#bda069] text-white",
      });
    } catch (error) {
      console.log(error);
      // toast({
      //   title: error?.message,
      //   className: "bg-[red] text-white",
      // });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      className="w-[60%] border-[1px] border-[#bda069] rounded-md shadow-md p-4 max-md:w-full"
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 100 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-bold text-[20px] max-sm:text-[15px]">
        برجاء ادخال رقم هاتفك للاستعلام عن الحجز
      </h1>
      <form action="" className="w-full mt-5 mb-5" onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">رقم الهاتف</label>
        <div dir="ltr" className="w-[60%] max-sm:w-full mt-5">
          <PhoneInput
            name="phoneNumber"
            value={phoneNumber}
            defaultCountry="US"
            international
            withCountryCallingCode
            onChange={setPhoneNumber}
            placeholder="رقم هاتفك"
            required
            className="border-[1px] border-[#bda069] p-3 rounded-md focus:outline-none !important"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading ? true : false}
          className="w-[30%] mt-5 max-sm:w-full text-white bg-[#bda069] border-[#bda069]
        hover:border-[1px] hover:bg-white hover:text-[#bda069] transition duration-300 font-bold text-[15px]"
        >
          {isLoading ? "برجاء الانتظار" : "استعلام"}
        </Button>
      </form>
    </motion.div>
  );
};

export default InquiryForm;
