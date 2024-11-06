import { NextRequest, NextResponse } from "next/server";

import { createProductSchema } from "@/features/products/core/validations";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { params: sendParams } = params;
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
        storeId: sendParams.storeId,
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

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
      images,
    } = body;
    const { params: sendParams } = params;

    const validation = createProductSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newStore = await prisma.product.create({
      data: {
        storeId: sendParams.storeId,
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
