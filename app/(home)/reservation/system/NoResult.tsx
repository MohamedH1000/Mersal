"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NoResult = () => {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col items-center w-full gap-5 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 100, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-[40px] max-md:text-[30px] font-medium mt-20">
        لا يوجد نتائج للبحث
      </div>
      <Button
        className="mt-5 bg-[#bda069] text-white transition duration-300 border-[#bda069]
      hover:text-[#bda069] hover:bg-[white] hover:border-[1px] font-bold"
        onClick={() => router.back()}
      >
        العودة
      </Button>
    </motion.div>
  );
};

export default NoResult;
