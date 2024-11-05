import { NextRequest, NextResponse } from "next/server";

import { createProductSchema } from "@/features/products/core/validations";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { params: sendParams } = params;

    const products = await prisma.product.findMany({
      where: {
        storeId: sendParams.storeId,
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

    console.log(products);

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
