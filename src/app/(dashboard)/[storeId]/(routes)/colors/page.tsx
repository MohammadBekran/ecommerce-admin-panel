import Colors from "@/features/colors/components";
import { TColorColumn } from "@/features/colors/core/types";

import dateTimeFormatter from "@/core/utils/date-formatter.utils";
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
    createdAt: dateTimeFormatter(color.createdAt),
  }));

  return <Colors storeId={params.storeId} colors={formattedColors} />;
};

export default ColorsPage;