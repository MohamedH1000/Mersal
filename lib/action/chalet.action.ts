"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
    pathname,
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

  revalidatePath(pathname);

  return listing;
}

export async function getAllChalets() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error) {
    console.log(error);
  }
}

export async function addToFavourite({ params }: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({
      error: "يجب ان تسجل دخولك قبل ان تضيف للمفضلة",
    });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favoriteIds || [])];

  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function deleteFromFavourite({ params }: any) {
  const currentUser = await getCurrentUser();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!currentUser) {
    return NextRequest.json({ error: "يجب ان تسجل دخولك للحذف من المفضلة" });
  }

  let favouriteIds = [...(currentUser.favoriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}
