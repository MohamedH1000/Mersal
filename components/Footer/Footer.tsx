"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className=" py-10 px-20 bg-[#bda069] max-md:px-5">
      <div
        className="flex justify-between items-start max-sm:flex-col
      max-sm:items-center max-md:justify-start max-md:gap-10 max-md:items-center max-md:text-center"
      >
        <motion.div
          className="flex flex-col items-start justify-center max-md:items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-[30px] text-white font-bold">منتجع مرسال</h1>
          <p className="mt-5 text-white">
            موقع يتيح للزبائن حجز شاليهات مرسال وخدمات اضافية
          </p>
          <div className="flex justify-center items-center gap-3 mt-5">
            <Link href={""}>
              <Image
                src={"/icons/twitter.svg"}
                alt="twitter"
                width={20}
                height={20}
                className="invert"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/icons/tiktok.svg"}
                alt="twitter"
                width={20}
                height={20}
                className="invert"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/icons/instagram.svg"}
                alt="twitter"
                width={20}
                height={20}
                className="invert"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/icons/facebook.svg"}
                alt="twitter"
                width={20}
                height={20}
                className="invert"
              />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-start justify-center text-white gap-4 max-md:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-bold">معلومات التواصل</h1>
          <p className="font-medium">966580782229</p>
          <p className="font-medium">info@mersalksa.com</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-start justify-center gap-3 max-md:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-bold text-white">
            للاستفسارات عبر البريد الالكتروني
          </h1>
          <Input placeholder="ادخل بريدك الالكتروني هنا" />
          <Button className="bg-[#c7ae81] text-white hover:bg-[#c7ae81] hover:opacity-90">
            ارسل استفسارك
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-white mt-10 font-bold">
          © 2024. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
