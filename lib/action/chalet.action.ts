"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";

export async function createChalet(params: any) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "admin") {
    throw new Error("you are not authorized to create the chalet");
  }
  const {
    title,
    description,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
    price,
  } = params;
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount: parseInt(roomCount),
      bathroomCount: parseInt(bathroomCount),
      guestCount: parseInt(guestCount),
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return listing;
}
