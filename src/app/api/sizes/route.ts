import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async () => {
  try {
    const sizes = await prisma.size.findMany({
      include: {
        Product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("[SIZE_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
