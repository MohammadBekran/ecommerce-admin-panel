import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    const { address, phone, isPaid } = await request.json();

    if (!params.orderId) {
      return NextResponse.json(
        { error: "OrderId is required" },
        { status: 400 }
      );
    }

    const where = {
      id: params.orderId,
    };

    const order = await prisma.order.findUnique({
      where,
    });

    if (!order) {
      return NextResponse.json({ error: "Invalid order" }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
      where,
      data: {
        address,
        phone,
        isPaid,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDER_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
