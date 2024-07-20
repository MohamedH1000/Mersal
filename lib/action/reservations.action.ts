"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user.action";
import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";
import twilio from "twilio";

export async function createReservation(params: any) {
  const currentUser = await getCurrentUser();
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    servicePrice,
    nameOfReserver,
    email,
    phoneNumber,
  } = params;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return {
      success: false,
      message: "تأكد من تحديد تاريخ الحجز والبيانات الأساسية",
    };
  }
  if (!currentUser) {
    if (!nameOfReserver || !phoneNumber) {
      return {
        success: false,
        message: "تأكد من تعبئة البيانات التالية: الاسم، رقم الهاتف",
      };
    }
  }
  let listingAndReservation;
  if (!currentUser) {
    listingAndReservation = await prisma.listing.update({
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
            nameOfReserver,
            email,
            phoneNumber,
          },
        },
      },
    });
  } else {
    listingAndReservation = await prisma.listing.update({
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
  }

  return { success: true, data: listingAndReservation };
}

export async function sendEmail(params: any) {
  const { startDate, endDate, nameOfReserver, email, phoneNumber } = params;
  const message = "شكرا لك للحجز على موقعنا ";
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Mersal <mersall.ksa@gmail.com>",
      to: [email],
      subject: "بيانات حجز منتجع مرسال",
      react: EmailTemplate({
        startDate,
        endDate,
        nameOfReserver,
        phoneNumber,
        message,
      }),
    });
    return {
      success: true,
      message: "تم ارسال الايميل بنجاح",
    };
  } catch (error) {
    console.log(error);
  }
}
export async function sendSMS(params: any) {
  const accountSid = process.env.ACCOUNT_ID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const { phoneNumber, reservation } = params;
  try {
    const result = await client.messages.create({
      body: reservation.nameOfReserver,
      from: "+13312156493",
      to: phoneNumber,
    });
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "لا يوجد حجوزات خاصة بهذا الرقم",
    };
  }
}
export async function getReservations(params: any) {
  try {
    const { listingId, userId, authorId, phoneNumber } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (phoneNumber) {
      query.phoneNumber = phoneNumber;
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
