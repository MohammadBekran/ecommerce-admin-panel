import Product from "@/features/products/components/product";

import prisma from "@/lib/db";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: { id: params.productId, storeId: params.storeId },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });

  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
  });

  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <Product
      product={product}
      categories={categories}
      sizes={sizes}
      colors={colors}
      storeId={params.storeId}
    />
  );
};

export default ProductPage;
