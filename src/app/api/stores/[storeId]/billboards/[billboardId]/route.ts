import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { billboardId: string } }
) => {
  try {
    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return NextResponse.json(
        { message: "Invalid billboard" },
        { status: 404 }
      );
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { label, imageUrl } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!params.billboardId) {
      return NextResponse.json(
        { message: "BillboardId is required." },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const billboard = await prisma.billboard.findUnique({
      where: { id: params.billboardId, storeId: params.storeId },
    });

    if (!billboard) {
      return NextResponse.json(
        { message: "Invalid billboard" },
        { status: 404 }
      );
    }

    const updatedBillboard = await prisma.billboard.update({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const where = { id: params.billboardId, storeId: params.storeId };

    const billboard = await prisma.billboard.findUnique({
      where,
    });

    if (!billboard)
      return NextResponse.json(
        { message: "Invalid billboard" },
        { status: 404 }
      );

    const deletedBillboard = await prisma.billboard.delete({
      where,
    });

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
