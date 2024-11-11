import prisma from "@/lib/db";

import Size from "@/features/sizes/components/size";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = await prisma.size.findUnique({
    where: { id: params.sizeId, storeId: params.storeId },
  });

  return <Size size={size} storeId={params.storeId} />;
};

export default SizePage;
