import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import HeartButton from "./HeartButton";
import { motion } from "framer-motion";
interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser: User | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <div>
      <motion.div
        className="w-full h-[60vh] overflow-hidden rounded-xl relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Image
          alt="image"
          src={imageSrc ? imageSrc : "/assets/1.jpg"}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </motion.div>
    </div>
  );
};

export default ListingHead;
