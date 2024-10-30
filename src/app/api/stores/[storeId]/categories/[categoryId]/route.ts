import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { name, billboardId } = await request.json();
    const { params: sendParams } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!sendParams.categoryId) {
      return NextResponse.json(
        { message: "CategoryId is required." },
        { status: 400 }
      );
    }

    if (!sendParams.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const billboard = await prisma.category.findUnique({
      where: { id: sendParams.categoryId, storeId: sendParams.storeId },
    });

    if (!billboard) {
      return NextResponse.json(
        { message: "Invalid billboard" },
        { status: 404 }
      );
    }

    const updatedBillboard = await prisma.category.update({
      where: {
        id: sendParams.categoryId,
        storeId: sendParams.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(updatedBillboard);
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
  params: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.categoryId, storeId: sendParams.storeId };

    const billboard = await prisma.category.findUnique({
      where,
    });

    if (!billboard)
      return NextResponse.json(
        { message: "Invalid billboard" },
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
