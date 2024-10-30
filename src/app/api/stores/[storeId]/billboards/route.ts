import { NextRequest, NextResponse } from "next/server";

import { createBillboardSchema } from "@/features/billboards/core/validations";

import prisma from "@/lib/db";

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { label, imageUrl } = body;
    const { params: sendParams } = params;

    const validation = createBillboardSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newStore = await prisma.billboard.create({
      data: {
        storeId: sendParams.storeId,
        label,
        imageUrl,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
