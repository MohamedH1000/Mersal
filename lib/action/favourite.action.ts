import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./user.action";

export async function getFavouriteListing() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    const safeFavourites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
