import BillboardForm from "@/features/billboards/components/billboard/billboard-form";

import prisma from "@/lib/db";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return <BillboardForm billboard={billboard} storeId={params.storeId} />;
};

export default BillboardPage;
