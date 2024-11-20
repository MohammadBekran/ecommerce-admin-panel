import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return NextResponse.json(
        { message: "ColorId is required." },
        { status: 400 }
      );
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
      include: {
        Product: true,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { name, value } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!params.colorId) {
      return NextResponse.json(
        { message: "ColorId is required." },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const color = await prisma.color.findUnique({
      where: { id: params.colorId, storeId: params.storeId },
    });

    if (!color) {
      return NextResponse.json({ message: "Invalid color" }, { status: 404 });
    }

    const updatedSize = await prisma.color.update({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    if (!params.colorId) {
      return NextResponse.json(
        { message: "ColorId is required." },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const where = { id: params.colorId, storeId: params.storeId };

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
