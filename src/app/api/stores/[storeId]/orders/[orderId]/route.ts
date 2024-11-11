import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    if (!params.orderId) {
      return NextResponse.json(
        { message: "OrderId is required." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
