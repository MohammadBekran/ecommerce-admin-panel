import type { Metadata } from "next";

import Products from "@/features/products/components";
import type { TProductColumn } from "@/features/products/core/types";

import { dateTimeFormatter, priceFormatter } from "@/core/utils";
import prisma from "@/lib/db";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: TProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: priceFormatter.format(Number(product.price)),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: dateTimeFormatter.format(product.createdAt),
  }));

  return <Products storeId={params.storeId} products={formattedBillboards} />;
};

export const metadata: Metadata = {
  title: "Products",
  description: "On this page, you can see all of the products of your store",
};

export default ProductsPage;
