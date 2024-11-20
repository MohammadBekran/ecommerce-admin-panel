import type { Metadata } from "next";

import Product from "@/features/products/components/product";

import prisma from "@/lib/db";

interface IProductPageProps {
  params: { storeId: string; productId: string };
}

const ProductPage = async ({ params }: IProductPageProps) => {
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

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.productId, storeId: params.storeId },
    include: {
      images: true,
    },
  });

  const title = product ? product?.name : "New product";
  const description = product
    ? `On this page, you can edit the product '${product?.name}'`
    : "On this page, you can create a new product";
  const productImage = product?.images[0] ?? "/placeholder.jpeg";

  return {
    title,
    description,
    openGraph: {
      images: [productImage],
    },
  };
}

export default ProductPage;
