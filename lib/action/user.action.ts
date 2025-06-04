"use server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Prisma, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(userData: any) {
  try {
    const { email, name, password, phoneNumber, role } = userData;
    if (!name || !email || !password) {
      return { success: false, error: "جميع الحقول مطلوبة" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "البريد الإلكتروني مستخدم بالفعل" };
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
        phoneNumber,
        hashedPassword,
      },
    });
    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (e) {
    console.error("Failed to create user:", e);
    return { success: false, error: "حدث خطأ أثناء إنشاء المستخدم" };
  }
}

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    const numberOfUsers = users.length;

    return { users, numberOfUsers };
  } catch (error) {
    console.log(error);
  }
}

// Update existing user
export async function updateUser(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;

    const data: Partial<User> = { name, role };

    if (password) {
      data.hashedPassword = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "حدث خطأ أثناء تحديث المستخدم" };
  }
}

// Delete user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "حدث خطأ أثناء حذف المستخدم" };
  }
}
