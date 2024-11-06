import { NextRequest, NextResponse } from "next/server";

import { createColorSchema } from "@/features/colors/core/validations";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const colors = await prisma.color.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { name, value } = body;

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const validation = createColorSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newColor = await prisma.color.create({
      data: {
        storeId: params.storeId,
        name,
        value,
      },
    });

    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
