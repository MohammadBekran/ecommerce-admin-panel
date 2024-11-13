import prisma from "@/lib/db";

const getStuckCount = async (storeId: string) => {
  const stuckCount = await prisma.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stuckCount;
};

export default getStuckCount;
