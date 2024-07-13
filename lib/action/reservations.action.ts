"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";

export async function createReservation(params: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("يجب تسجيل الدخول للقيام بعملية الحجز");
  }
  const { listingId, startDate, endDate, totalPrice, servicePrice } = params;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    throw new Error("تاكد من تعبئة البيانات");
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          startDate,
          endDate,
          totalPrice,
          servicePrice,
          userId: currentUser.id,
        },
      },
    },
  });

  return listingAndReservation;
}

export async function getReservations(params: any) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteReservation(params: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("يجب ان تسجل دخولك لالغاء الحجز");
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return reservation;
}
