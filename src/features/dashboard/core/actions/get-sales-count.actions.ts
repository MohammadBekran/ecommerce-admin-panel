import prisma from "@/lib/db";

const getSalesCount = async (storeId: string) => {
  const salesCount = await prisma.order.count({
    where: {
      storeId,
    },
  });

  return salesCount;
};

export default getSalesCount;
