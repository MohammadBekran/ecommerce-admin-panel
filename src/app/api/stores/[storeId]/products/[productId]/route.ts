import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string; productId: string } }
) => {
  try {
    const {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
      images,
    } = await request.json();
    const { params: sendParams } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!sendParams.productId) {
      return NextResponse.json(
        { message: "ProductId is required." },
        { status: 400 }
      );
    }

    if (!sendParams.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: sendParams.productId, storeId: sendParams.storeId },
    });

    if (!product) {
      return NextResponse.json({ message: "Invalid product" }, { status: 404 });
    }

    const imageIdsToKeep = images
      .filter(({ id }: { id: string }) => id)
      .map(({ id }: { id: string }) => id);

    const updatedProduct = await prisma.product.update({
      where: {
        id: sendParams.productId,
        storeId: sendParams.storeId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {
            productId: sendParams.productId,
            id: { notIn: imageIdsToKeep },
          },
          upsert: images.map(({ id, url }: { id: string; url: string }) => ({
            where: { id: id ?? "" },
            update: { url },
            create: { url },
          })),
        },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("[PRODUCT_ERROR]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  params: { params: { storeId: string; productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.productId, storeId: sendParams.storeId };

    const product = await prisma.product.findUnique({
      where,
    });

    if (!product)
      return NextResponse.json({ message: "Invalid product" }, { status: 404 });

    const deletedProduct = await prisma.product.delete({
      where,
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("[PRODUCT_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
