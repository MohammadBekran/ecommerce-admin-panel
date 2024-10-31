import { NextRequest, NextResponse } from "next/server";

import { createColorSchema } from "@/features/colors/core/validations";

import prisma from "@/lib/db";

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { name, value } = body;
    const { params: sendParams } = params;

    const validation = createColorSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newSize = await prisma.color.create({
      data: {
        storeId: sendParams.storeId,
        name,
        value,
      },
    });

    return NextResponse.json(newSize, { status: 201 });
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
