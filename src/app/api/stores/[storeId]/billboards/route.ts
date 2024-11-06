import { NextRequest, NextResponse } from "next/server";

import { createBillboardSchema } from "@/features/billboards/core/validations";

import prisma from "@/lib/db";

export const POST = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { label, imageUrl } = body;

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const validation = createBillboardSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newBillboard = await prisma.billboard.create({
      data: {
        storeId: params.storeId,
        label,
        imageUrl,
      },
    });

    return NextResponse.json(newBillboard, { status: 201 });
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
