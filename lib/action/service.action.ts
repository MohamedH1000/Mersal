"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";

export async function createService(params: any) {
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
