import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async () => {
  try {
    const billboards = await prisma.billboard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error("[BILLBOARD_ERROR]", error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
