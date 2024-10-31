import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { createStoreSchema } from "@/features/store/core/validations";

import prisma from "@/lib/db";

export const PATCH = async (request: NextRequest) => {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;

    if (!userId)
      return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });

    const validation = createStoreSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error("[STORE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
