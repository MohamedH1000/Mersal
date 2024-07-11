"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";

export async function createReservation(params: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("يجب تسجيل الدخول للقيام بعملية الحجز");
  }
  const { listingId, startDate, endDate, totalPrice } = params;

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
          user: {
            connect: {
              id: currentUser.id,
            },
          },
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
      query.authorId = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
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
