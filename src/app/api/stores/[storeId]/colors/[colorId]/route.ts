import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { name, value } = await request.json();
    const { params: sendParams } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!sendParams.colorId) {
      return NextResponse.json(
        { message: "colorId is required." },
        { status: 400 }
      );
    }

    if (!sendParams.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const color = await prisma.color.findUnique({
      where: { id: sendParams.colorId, storeId: sendParams.storeId },
    });

    if (!color) {
      return NextResponse.json({ message: "Invalid color" }, { status: 404 });
    }

    const updatedSize = await prisma.color.update({
      where: {
        id: sendParams.colorId,
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
  params: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.colorId, storeId: sendParams.storeId };

    const color = await prisma.color.findUnique({
      where,
    });

    if (!color)
      return NextResponse.json({ message: "Invalid color" }, { status: 404 });

    const deletedSize = await prisma.color.delete({
      where,
    });

    return NextResponse.json(deletedSize);
  } catch (error) {
    console.error("[COLOR_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
