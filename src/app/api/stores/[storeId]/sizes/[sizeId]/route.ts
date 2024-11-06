import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SizeId is required." },
        { status: 400 }
      );
    }

    const size = await prisma.size.findUnique({
      where: {
        storeId: params.storeId,
        id: params.sizeId,
      },
      include: {
        Product: true,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error("[SIZE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { name, value } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SizeId is required." },
        { status: 400 }
      );
    }

    const size = await prisma.size.findUnique({
      where: { id: params.sizeId, storeId: params.storeId },
    });

    if (!size) {
      return NextResponse.json({ message: "Invalid size" }, { status: 404 });
    }

    const updatedSize = await prisma.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
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
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SizeId is required." },
        { status: 400 }
      );
    }

    const where = { id: params.sizeId, storeId: params.storeId };

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
