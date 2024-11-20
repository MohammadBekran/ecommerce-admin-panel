import IGraphData from "@/features/dashboard/core/types";
import prisma from "@/lib/db";

const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let orderRevenue = 0;

    for (const item of order.orderItems) {
      orderRevenue += Number(item.product.price);
      monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + orderRevenue;
    }
  }

  const graphData: IGraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[month].total = monthlyRevenue[Number(month)];
  }

  return graphData;
};

export default getGraphRevenue;
