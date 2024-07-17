"use client";
import { User } from "@prisma/client";
import React from "react";
import HeartButton from "./HeartButton";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
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
  return (
    <motion.div
      className="w-full h-[60vh] relative overflow-hidden rounded-xl border-[1px] shadow-md max-sm:h-[40vh]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Carousel
        className="relative w-auto h-full"
        opts={{
          loop: true,
        }}
        orientation="horizontal"
      >
        <CarouselContent>
          {imageSrc?.map((image: string, index: number) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center aspect-video max-sm:aspect-square"
            >
              <Image
                src={image}
                alt={`Listing Image ${index + 1}`}
                className="w-full h-full "
                layout="fill"
                objectFit="cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
        <CarouselNext className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
      </Carousel>
      <div className="absolute top-3 right-3">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </motion.div>
  );
};

export default ListingHead;
