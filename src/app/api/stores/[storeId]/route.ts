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

export const DELETE = async (
  request: NextRequest,
  params: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.storeId };

    const store = await prisma.store.findUnique({
      where,
    });

    if (!store)
      return NextResponse.json({ message: "Invalid store" }, { status: 404 });

    const deletedStore = await prisma.store.delete({
      where,
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.error("[STORE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
