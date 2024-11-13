import type { Metadata } from "next";

import Category from "@/features/categories/components/category";

import prisma from "@/lib/db";

interface ICategoryPageProps {
  params: { storeId: string; categoryId: string };
}

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId, storeId: params.storeId },
  });

  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <Category
      category={category}
      billboards={billboards}
      storeId={params.storeId}
    />
  );
};

export async function generateMetadata({
  params,
}: ICategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId, storeId: params.storeId },
    include: {
      billboard: true,
    },
  });

  const billboardImage = category?.billboard.imageUrl ?? "/placeholder.jpeg";

  return {
    title: category?.name,
    description: `On this page, you can edit the category '${category?.name}'`,
    openGraph: {
      images: [billboardImage],
    },
  };
}

export default CategoryPage;
