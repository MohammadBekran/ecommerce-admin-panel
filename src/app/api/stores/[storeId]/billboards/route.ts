import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { createBillboardSchema } from "@/features/billboards/core/validations";

import prisma from "@/lib/db";

export const POST = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { label, imageUrl } = body;
    const { params: sendParams } = params;

    if (!userId)
      return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });

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
