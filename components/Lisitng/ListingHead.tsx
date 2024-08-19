"use client";
import { User } from "@prisma/client";
import React, { Suspense } from "react";
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
      className="w-full h-full relative overflow-hidden rounded-xl border-[1px] shadow-md"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Suspense>
        <Carousel
          className="relative w-full h-full"
          opts={{
            loop: true,
          }}
          orientation="horizontal"
        >
          <CarouselContent className="flex-row-reverse aspect-video h-full w-full">
            {imageSrc?.map((image: string, index: number) => (
              <CarouselItem key={index} className="h-full w-full relative">
                <Image
                  src={image}
                  alt={`Listing Image ${index + 1}`}
                  objectFit="cover"
                  fill
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageSrc.length > 1 && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
              <CarouselNext className="absolute top-1/2 right-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
            </>
          )}
        </Carousel>
      </Suspense>

      <div className="absolute top-3 right-3">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </motion.div>
  );
};

export default ListingHead;
