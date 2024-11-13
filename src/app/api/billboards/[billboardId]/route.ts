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
