import { User } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import HeartButton from "./HeartButton";
import { motion } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import { Carousel } from "react-bootstrap";
interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  id: string;
  currentUser: User | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <motion.div
        className="w-full h-[60vh] relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Carousel
          className="relative w-full h-full"
          activeIndex={index}
          onSelect={handleSelect}
        >
          {imageSrc?.map((image: string, i: number) => (
            <Carousel.Item key={i} className="w-full h-full">
              <Image
                src={image}
                alt={`Listing Image ${i + 1}`}
                className="object-cover"
                fill
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="absolute top-3 right-3">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </motion.div>
    </div>
  );
};

export default ListingHead;
