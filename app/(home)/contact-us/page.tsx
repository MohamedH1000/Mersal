"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="mt-[180px] mb-10">
      <div
        className="flex items-start justify-evenly max-md:flex-col
      max-md:items-center max-md:gap-6 max-md:px-5 mb-[200px] max-md:items-center max-md:text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-[50px] font-bold max-sm:text-[30px]">
            تواصل معنا
          </h1>
          <p className="opacity-90">
            اتصل بنا اليوم لحجز شاليهاتك وخدمات إضافية مميزة لإقامة مريحة
            وممتعة.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div>
            <label htmlFor="name">الاسم الكريم</label>
            <Input
              name="name"
              type="name"
              placeholder="اكتب اسمك هنا"
              className="w-[350px] max-sm:w-[300px]"
            />
          </div>
          <div>
            <label htmlFor="email">البريد الالكتروني</label>
            <Input
              name="email"
              type="email"
              required
              placeholder="ادخل بريدك الالكتروني"
              className="w-[350px] max-sm:w-[300px]"
            />
          </div>
          <div className="flex flex-col items-start gap-2 ">
            <label htmlFor="details">تفاصيل استفسارك</label>
            <textarea
              name="details"
              placeholder="اكتب تفاصيل استفسارك"
              className="w-[350px] max-sm:w-[300px] 
              border-gray border-[1px] rounded-md p-2"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#bda069] text-white rounded-3xl p-6"
          >
            ارسال الحجز
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="mt-20 flex justify-evenly items-start gap-10 max-md:flex-col
      max-md:items-center max-md:px-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div>
          <h1 className="font-bold text-[40px]">منتجع مرسال</h1>
          <p>احجز شاليهات مع خدمات اضافية معها لتجربة مريحة ومميزة.</p>
          <p className="font-bold">القصيم بريده</p>
          <p className="font-bold">ساعات</p>
          <p className="font-bold">مفتوح طوال الأسبوع</p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57246.310138776775!2d43.909122!3d26.265091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1581fb9d8c4d2f1f%3A0x856bf7bd59078cbf!2z2YLYsdmK2Kkg2YXYsdiz2KfZhA!5e0!3m2!1sen!2sus!4v1720025132957!5m2!1sen!2sus"
            width="600"
            height="382"
            style={{ border: 0, borderRadius: "10px" }}
            allowfullscreen=""
            loading="lazy"
            className="max-sm:w-[300px] max-sm:h-[200px]"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
