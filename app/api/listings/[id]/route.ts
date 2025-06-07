import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Transform the data to match Prisma expectations
    const { id, userId, ...updateData } = body;

    // If you need to update the user relation, use the correct syntax
    if (userId) {
      updateData.user = {
        connect: { id: userId },
      };
    }

    const updatedListing = await prisma.listing.update({
      where: { id: params.id },
      data: updateData,
    });

    if (!updatedListing) {
      return NextResponse.json(
        { error: "الشاليه غير متواجد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تعديل الشاليه بنجاح",
      status: 200,
      data: updatedListing,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء التعديل" },
      { status: 500 }
    );
  }
}
