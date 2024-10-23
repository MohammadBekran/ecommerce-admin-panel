import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import updateStoreSchema from "@/features/store/core/validations/update-store.validation";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { storeId: string }
) => {
  try {
    const body = await request.json();
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const validation = updateStoreSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const where = { id: params.storeId, userId };

    const store = await prisma.store.findUnique({
      where,
    });

    if (!store)
      return NextResponse.json({ message: "Invalid store" }, { status: 404 });

    const updatedStore = await prisma.store.update({
      where,
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error("[STORE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
