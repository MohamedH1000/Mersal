"use client";
import { Button } from "@/components/ui/button";
import { getReservations, sendSMS } from "@/lib/action/reservations.action";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { motion } from "framer-motion";
const InquiryForm = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const reservation = await getReservations(phoneNumber);
      const message = `Hi ${reservation[0]?.nameOfReserver}`;

      const response = await sendSMS({ phoneNumber, message });
      // console.log("SMS response", response);
      if (!response.success) {
        throw new Error("لا يوجد حجوزات خاصة بهذا الرقم");
      }
      toast({
        title: "تم ارسال رساله نصية الى هاتفك ببيانات الحجز الخاصة بك",
        className: "bg-[#bda069] text-white",
      });
    } catch (error) {
      toast({
        title: error?.message,
        className: "bg-[red] text-white",
      });
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
