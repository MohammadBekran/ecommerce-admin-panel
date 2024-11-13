import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return NextResponse.json(
        { message: "CategoryId is required." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
