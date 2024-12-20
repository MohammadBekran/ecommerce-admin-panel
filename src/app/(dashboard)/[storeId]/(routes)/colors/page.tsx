import type { Metadata } from "next";

import Colors from "@/features/colors/components";
import type { TColorColumn } from "@/features/colors/core/types";

import { dateTimeFormatter } from "@/core/utils";
import prisma from "@/lib/db";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedColors: TColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: dateTimeFormatter.format(color.createdAt),
  }));

  return <Colors storeId={params.storeId} colors={formattedColors} />;
};

export const metadata: Metadata = {
  title: "Colors",
  description: "On this page, you can see all of the colors of your store",
};

export default ColorsPage;
