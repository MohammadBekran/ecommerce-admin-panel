import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return NextResponse.json(
        { message: "ProductId is required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

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

    if (!params.productId) {
      return NextResponse.json(
        { message: "ProductId is required." },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const where = { id: params.productId, storeId: params.storeId };

    const product = await prisma.product.findUnique({
      where,
    });

    if (!product) {
      return NextResponse.json({ message: "Invalid product" }, { status: 404 });
    }

    const imageIdsToKeep = images
      .filter(({ id }: { id: string }) => id)
      .map(({ id }: { id: string }) => id);

    const updatedProduct = await prisma.product.update({
      where,
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
            productId: params.productId,
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
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    if (!params.productId) {
      return NextResponse.json(
        { message: "ProductId is required." },
        { status: 400 }
      );
    }

    const where = { id: params.productId, storeId: params.storeId };

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
