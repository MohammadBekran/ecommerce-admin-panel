import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS = () => {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    }
  );
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDER_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();

    const { userId, productIds, phone, address, isPaid } = body;

    if (!params.storeId) {
      return NextResponse.json(
        { message: "StoreId is required." },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "Invalid products." },
        { status: 400 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        storeId: params.storeId,
        userId,
        address,
        phone,
        isPaid,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("[ORDER_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
