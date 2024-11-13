import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const revalidate = 0;

export const GET = async (request: NextRequest) => {
  try {
    const query = request.nextUrl.searchParams;

    const getIsArchivedQuery = Boolean(query.get("isArchived"));
    const getIsFeaturedQuery = Boolean(query.get("isFeatured"));

    const categoryId = query.get("categoryId") ?? undefined;
    const sizeId = query.get("sizeId") ?? undefined;
    const colorId = query.get("colorId") ?? undefined;
    const isArchived =
      getIsArchivedQuery === true ? getIsArchivedQuery : undefined;
    const isFeatured =
      getIsFeaturedQuery === true ? getIsFeaturedQuery : undefined;

    const products = await prisma.product.findMany({
      where: {
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCT_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
