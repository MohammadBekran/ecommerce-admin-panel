import Orders from "@/features/orders/components";
import type { TOrderColumn } from "@/features/orders/core/types";

import dateTimeFormatter from "@/core/utils/date-formatter.utils";
import prisma from "@/lib/db";
import { priceFormatter } from "@/core/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: TOrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: dateTimeFormatter(order.createdAt),
  }));

  return <Orders orders={formattedOrders} />;
};

export default OrdersPage;
