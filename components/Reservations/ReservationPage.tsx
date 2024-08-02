"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Suspense } from "react";

const ReservationPage = () => {
  return (
    <>
      <div className="mt-20 flex flex-col items-center w-full">
        <motion.h1
          className="font-bold text-[50px] max-md:text-[30px] max-sm:text-[30px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
        >
          شاليه مرسال
        </motion.h1>
        <motion.p
          className="w-[50%] font-bold mt-5 max-sm:w-[88%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          viewport={{ once: true }}
        >
          يمكن وصف منتجع مرسال في الصيف بأنه مكان مثالي للاسترخاء والاستمتاع
          والمناظر الخلابة. يقع المنتجع في منطقة هادئة ومنعزلة بعيداً عن صخب
          المدينة، مما يوفر للزوار جوًا هادئًا ومريحًا.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href={"/reservation/system"}>
            <Button
              className="bg-white text-black rounded-3xl font-bold hover:text-white transition
              w-[164px] h-[56px] mt-5 text-[20px] border-[black] border-[1px] duration-300"
            >
              احجز الان
            </Button>
          </Link>
        </motion.div>
      </div>
      <Suspense>
        <div
          className="mt-20 flex justify-center items-start gap-3 flex-wrap
        max-sm:flex-col max-sm:items-center max-md:px-5 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/assets/1.jpg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/assets/mainbackground.jpg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/assets/2.jpeg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {" "}
            <Image
              src={"/assets/3.jpeg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {" "}
            <Image
              src={"/assets/4.jpeg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {" "}
            <Image
              src={"/assets/5.jpeg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/assets/6.jpeg"}
              alt="1"
              width={400}
              height={416}
              unoptimized
              className="rounded-3xl w-[400px]
            h-[416px] max-sm:w-auto
            max-sm:h-auto"
            />
          </motion.div>
        </div>
      </Suspense>
      <motion.div
        className="mt-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h1 className="font-bold text-[50px] text-center max-md:text-[30px] max-sm:text-[20px]">
          مرسال تهتم بأدق التفاصيل وأجملها
        </h1>
        <div className="flex justify-center">
          <iframe
            src="https://player.vimeo.com/video/969955200"
            className="mt-10
            max-md:aspect-video max-md:w-full max-md:px-5
            rounded-md max-sm:mt-0
           "
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            width={800}
            height={504}
          />
        </div>
      </motion.div>
      <motion.div
        className="mt-20 flex justify-between items-start gap-[50px] max-md:flex-col
        max-md:items-center max-md:px-5 w-full px-[145px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div>
          <h1 className="font-bold text-[40px]">منتجع مرسال</h1>
          <p>احجز شاليهات مع خدمات اضافية معها لتجربة مريحة ومميزة.</p>
          <p className="max-md:block md:hidden mt-20 font-bold text-xl">
            العنوان
          </p>
          <p className="font-bold">القصيم بريده</p>
          <p className="font-bold mt-10 text-xl">ساعات</p>
          <p className="font-bold">مفتوح طوال الأسبوع</p>
        </div>
        <div className="h-full w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57246.310138776775!2d43.909122!3d26.265091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1581fb9d8c4d2f1f%3A0x856bf7bd59078cbf!2z2YLYsdmK2Kkg2YXYsdiz2KfZhA!5e0!3m2!1sen!2sus!4v1720025132957!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "10px" }}
            allow="fullscreen"
            loading="lazy"
            className="aspect-video w-[100%] h-[100%]"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </>
  );
};

export default ReservationPage;
