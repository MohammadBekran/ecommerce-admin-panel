import Sizes from "@/features/sizes/components";
import type { TSizeColumn } from "@/features/sizes/core/types";

import { dateTimeFormatter } from "@/core/utils";
import prisma from "@/lib/db";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedSizes: TSizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: dateTimeFormatter.format(size.createdAt),
  }));

  return <Sizes storeId={params.storeId} sizes={formattedSizes} />;
};

export default SizesPage;
