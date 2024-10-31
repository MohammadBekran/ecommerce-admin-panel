import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { name, value } = await request.json();
    const { params: sendParams } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!sendParams.sizeId) {
      return NextResponse.json(
        { message: "sizeId is required." },
        { status: 400 }
      );
    }

    if (!sendParams.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const size = await prisma.size.findUnique({
      where: { id: sendParams.sizeId, storeId: sendParams.storeId },
    });

    if (!size) {
      return NextResponse.json({ message: "Invalid size" }, { status: 404 });
    }

    const updatedSize = await prisma.size.update({
      where: {
        id: sendParams.sizeId,
        storeId: sendParams.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.error("[SIZE_ERROR]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  params: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.sizeId, storeId: sendParams.storeId };

    const size = await prisma.size.findUnique({
      where,
    });

    if (!size)
      return NextResponse.json({ message: "Invalid size" }, { status: 404 });

    const deletedSize = await prisma.size.delete({
      where,
    });

    return NextResponse.json(deletedSize);
  } catch (error) {
    console.error("[SIZE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
