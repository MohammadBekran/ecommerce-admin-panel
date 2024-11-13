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
