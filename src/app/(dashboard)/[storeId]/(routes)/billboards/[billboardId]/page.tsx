import Billboard from "@/features/billboards/components/billboard";

import prisma from "@/lib/db";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId, storeId: params.storeId },
  });

  return <Billboard billboard={billboard} storeId={params.storeId} />;
};

export default BillboardPage;
