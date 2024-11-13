import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return NextResponse.json(
        { message: "ProductId is required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
