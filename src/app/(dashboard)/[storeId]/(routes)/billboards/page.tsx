import Billboards from "@/features/billboards/components";
import TBillboardColumn from "@/features/billboards/core/types/billboard-columns.type";

import dateTimeFormatter from "@/core/utils/date-formatter.utils";
import prisma from "@/lib/db";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedBillboards: TBillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: dateTimeFormatter(billboard.createdAt),
    })
  );

  return (
    <Billboards storeId={params.storeId} billboards={formattedBillboards} />
  );
};

export default BillboardsPage;
