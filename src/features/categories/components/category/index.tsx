import type { Billboard, Category } from "@prisma/client";

import CategoryForm from "@/features/categories/components/category/category-form";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IBillboardProps {
  category: Category | null;
  billboards: Billboard[];
  storeId: string;
}

const Category = async ({ category, billboards, storeId }: IBillboardProps) => {
  const heading = category ? "Edit category" : "Create category";
  const description = category
    ? "Edit a category"
    : "Create a new category in your store";

  return (
    <div>
      <div className="space-y-2">
        <Heading title={heading} description={description} />
        <Separator />
      </div>
      <CategoryForm
        category={category}
        billboards={billboards}
        storeId={storeId}
      />
    </div>
  );
};

export default Category;
