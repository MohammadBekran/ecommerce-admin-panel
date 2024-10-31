import Products from "@/features/products/components";
import type { TProductColumn } from "@/features/products/core/types";

import { priceFormatter } from "@/core/utils";
import dateTimeFormatter from "@/core/utils/date-formatter.utils";
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
    createdAt: dateTimeFormatter(product.createdAt),
  }));

  return <Products storeId={params.storeId} products={formattedBillboards} />;
};

export default ProductsPage;
