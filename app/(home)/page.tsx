"use client";
import Link from "next/link";
import "./main.css";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative mt-[121px] h-[615px] max-md:h-[850px] max-md:pt-[120px]">
      <div
        className="absolute inset-0 bg-[url('/assets/mainbackground.jpg')] 
      bg-scroll bg-cover bg-center bg-no-repeat brightness-50 main-background "
        style={{ zIndex: -1 }}
      ></div>
      <div
        className="relative flex flex-col items-start justify-center 
      gap-5 px-[200px] h-full max-md:px-5 max-md:justify-start 
    max-md:items-center max-sm:items-center max-md:text-center"
      >
        <motion.h1
          className="text-white font-black text-[65px] max-md:text-[40px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          حجز شاليهات منتجع مرسال
        </motion.h1>
        <motion.p
          className="text-white text-[17.5px] max-md:mt-[150px] font-bold max-sm:mt-[100px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          احجز شاليه مع خدمات اضافية مميزة على موقعنا الجديد الان
        </motion.p>
        <Link href={"/reservation"}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              className="bg-[#bda069] text-white max-md:text-[17px]
          text-[25px] px-[45px] rounded-full font-bold py-8 mt-5 max-md:py-6"
            >
              احجز الان
            </Button>
          </motion.div>
        </Link>
      </div>
    </main>
  );
}
