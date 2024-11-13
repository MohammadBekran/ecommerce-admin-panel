import type { Metadata } from "next";

import Billboards from "@/features/billboards/components";
import type { TBillboardColumn } from "@/features/billboards/core/types";

import { dateTimeFormatter } from "@/core/utils";
import prisma from "@/lib/db";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: TBillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: dateTimeFormatter.format(billboard.createdAt),
    })
  );

  return (
    <Billboards storeId={params.storeId} billboards={formattedBillboards} />
  );
};

export const metadata: Metadata = {
  title: "Billboards",
  description: "On this page, you can see all of the billboards of your store",
};

export default BillboardsPage;
