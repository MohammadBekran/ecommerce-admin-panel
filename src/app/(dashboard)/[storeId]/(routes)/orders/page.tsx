import type { Metadata } from "next";

import Orders from "@/features/orders/components";
import type { TOrderColumn } from "@/features/orders/core/types";

import { dateTimeFormatter, priceFormatter } from "@/core/utils";
import prisma from "@/lib/db";

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
    createdAt: dateTimeFormatter.format(order.createdAt),
  }));

  return <Orders orders={formattedOrders} />;
};

export const metadata: Metadata = {
  title: "Orders",
  description: "On this page, you can see all of the orders of your store",
};

export default OrdersPage;
