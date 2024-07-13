import { User } from "@prisma/client";
import Image from "next/image";
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
    <div>
      <motion.div
        className="w-full h-[60vh] relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Carousel className="relative w-full h-full">
          <CarouselContent className="w-full h-full absolute">
            {imageSrc?.map((image: string, index: number) => (
              <CarouselItem key={index} className="w-full h-full">
                <Image
                  src={image}
                  alt={`Listing Image ${index + 1}`}
                  className="object-cover"
                  layout="fill"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
          <CarouselNext className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer" />
        </Carousel>

        <div className="absolute top-3 right-3">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </motion.div>
    </div>
  );
};

export default ListingHead;
