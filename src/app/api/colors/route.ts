import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export const revalidate = 0;

export const GET = async () => {
  try {
    const colors = await prisma.color.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error("[COLOR_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
