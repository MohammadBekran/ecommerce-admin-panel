import prisma from "@/lib/db";

const getSalesCount = async (storeId: string) => {
  const salesCount = await prisma.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};

export default getSalesCount;
