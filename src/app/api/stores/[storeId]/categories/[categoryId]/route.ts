import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return NextResponse.json(
        { message: "CategoryId is required." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { name, billboardId } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!params.categoryId) {
      return NextResponse.json(
        { message: "CategoryId is required." },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: params.categoryId, storeId: params.storeId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const where = { id: params.categoryId, storeId: params.storeId };

    const category = await prisma.category.findUnique({
      where,
    });

    if (!category)
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 404 }
      );

    const deletedCategory = await prisma.category.delete({
      where,
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
