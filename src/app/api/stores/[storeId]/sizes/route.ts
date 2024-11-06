import { NextRequest, NextResponse } from "next/server";

import { createSizeSchema } from "@/features/sizes/core/validations";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { params: sendParams } = params;

    const sizes = await prisma.size.findMany({
      where: {
        storeId: sendParams.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("[SIZE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { name, value } = body;
    const { params: sendParams } = params;

    const validation = createSizeSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newSize = await prisma.size.create({
      data: {
        storeId: sendParams.storeId,
        name,
        value,
      },
    });

    return NextResponse.json(newSize, { status: 201 });
  } catch (error) {
    console.error("[SIZE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
