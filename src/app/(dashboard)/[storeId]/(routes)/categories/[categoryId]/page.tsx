import Category from "@/features/categories/components/category";

import prisma from "@/lib/db";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
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

export default CategoryPage;
