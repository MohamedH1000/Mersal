"use client";
import { User } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8 mb-10">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>المضيف: {user?.name}</div>
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <Separator />
        <motion.div
          className="flex flex-row items-center gap-4 font-light text-neutral-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 100, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div>{guestCount} ضيوف</div>
          <div>{roomCount} غرف</div>
          <div>{bathroomCount} حمامات</div>
        </motion.div>
      </motion.div>
      <Separator />
      <motion.div
        className="text-lg font-light text-neutral-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.div>
      <Separator />
      <motion.iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57246.310138776775!2d43.909122!3d26.265091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1581fb9d8c4d2f1f%3A0x856bf7bd59078cbf!2z2YLYsdmK2Kkg2YXYsdiz2KfZhA!5e0!3m2!1sen!2sus!4v1720025132957!5m2!1sen!2sus"
        width="600"
        height="382"
        style={{
          border: 0,
          borderRadius: "10px",
        }}
        loading="lazy"
        className="max-sm:w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      ></motion.iframe>
    </div>
  );
};

export default ListingInfo;
