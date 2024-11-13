import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
