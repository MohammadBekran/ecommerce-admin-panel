import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SizeId is required." },
        { status: 400 }
      );
    }

    const size = await prisma.size.findUnique({
      where: {
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
