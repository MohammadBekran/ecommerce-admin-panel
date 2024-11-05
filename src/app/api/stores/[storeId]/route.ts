import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { createStoreSchema } from "@/features/store/core/validations";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;
    const { storeId } = params.params;

    if (!userId)
      return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });

    const validation = createStoreSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const updatedStore = await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(updatedStore, { status: 201 });
  } catch (error) {
    console.error("[STORE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
