import { NextRequest, NextResponse } from "next/server";

import { createCategorySchema } from "@/features/categories/core/validations";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { params: sendParams } = params;

    const categories = await prisma.category.findMany({
      where: {
        storeId: sendParams.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { name, billboardId } = body;
    const { params: sendParams } = params;

    const validation = createCategorySchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newStore = await prisma.category.create({
      data: {
        storeId: sendParams.storeId,
        name,
        billboardId,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
