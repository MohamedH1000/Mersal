import React from "react";
import InquiryForm from "./InquiryForm";

const page = () => {
  return (
    <div className="min-h-screen p-[145px] max-md:px-5">
      <h1 className="text-[40px] max-md:text-[30px] font-medium">
        للاستعلام عن الحجز
      </h1>
      <div className="mt-10 flex flex-col items-start max-md:items-center w-full">
        <InquiryForm />
      </div>
    </div>
  );
};

export default page;
