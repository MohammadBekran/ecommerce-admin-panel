import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const PATCH = async (
  request: NextRequest,
  params: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const body = await request.json();
    const { params: sendParams } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (!sendParams.billboardId) {
      return NextResponse.json(
        { message: "BillboardId is required." },
        { status: 400 }
      );
    }

    if (!sendParams.storeId) {
      return NextResponse.json(
        { message: "storeId is required." },
        { status: 400 }
      );
    }

    const billboard = await prisma.billboard.findUnique({
      where: { id: sendParams.billboardId, storeId: sendParams.storeId },
    });

    if (!billboard) {
      return NextResponse.json(
        { message: "Invalid billboard" },
        { status: 404 }
      );
    }

    const updatedBillboard = await prisma.billboard.update({
      where: {
        id: sendParams.billboardId,
        storeId: sendParams.storeId,
      },
      data: {
        label: body.label,
        imageUrl: body.imageUrl,
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
  params: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    const { params: sendParams } = params;

    const where = { id: sendParams.billboardId, storeId: sendParams.storeId };

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
