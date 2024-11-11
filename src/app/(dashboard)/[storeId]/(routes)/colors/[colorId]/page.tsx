import prisma from "@/lib/db";

import Color from "@/features/colors/components/color";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId, storeId: params.storeId },
  });

  return <Color color={color} storeId={params.storeId} />;
};

export default ColorPage;
