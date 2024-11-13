import type { Metadata } from "next";

import Categories from "@/features/categories/components";
import type { TCategoryColumn } from "@/features/categories/core/types";

import { dateTimeFormatter } from "@/core/utils";
import prisma from "@/lib/db";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: TCategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: dateTimeFormatter.format(category.createdAt),
  }));

  return (
    <Categories storeId={params.storeId} categories={formattedCategories} />
  );
};

export const metadata: Metadata = {
  title: "Categories",
  description: "On this page, you can see all of the categories of your store",
};

export default CategoriesPage;
