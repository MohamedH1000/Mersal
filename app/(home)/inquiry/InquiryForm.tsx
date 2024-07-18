"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const InquiryForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[60%] border-[1px] border-[#bda069] rounded-md shadow-md p-4 max-md:w-full">
      <h1 className="font-bold text-[20px] max-sm:text-[15px]">
        برجاء ادخال رقم هاتفك للاستعلام عن الحجز
      </h1>
      <form action="" className="w-full mt-5 mb-5" onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">رقم الهاتف</label>
        <Input
          name="phoneNumebr"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="رقم هاتفك"
          className="w-[50%] max-md:w-[80%] max-sm:w-full mt-3"
          required
        />
        <Button
          type="submit"
          className="w-[30%] mt-5 max-sm:w-full text-white bg-[#bda069] border-[#bda069]
        hover:border-[1px] hover:bg-white hover:text-[#bda069] transition duration-300 font-bold text-[15px]"
        >
          استعلام
        </Button>
      </form>
    </div>
  );
};

export default InquiryForm;
