import { Plus } from "lucide-react";
import Link from "next/link";

import { TCategoryColumn } from "@/features/categories/core/types";
import { CATEGORY_COLUMNS } from "@/features/categories/core/constants";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ICategoriesProps {
  storeId: string;
  categories: TCategoryColumn[];
}

const Categories = ({ storeId, categories }: ICategoriesProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <div className="flex justify-between">
          <Heading
            title={`Categories (${categories.length})`}
            description="Manage categories for your store"
          />
          <Link href={`/${storeId}/categories/new`}>
            <Button>
              <Plus />
              Add new
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
      <DataTable
        columns={CATEGORY_COLUMNS}
        data={categories}
        searchKey="name"
      />
      <Heading title="API " description="API calls for Categories" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </div>
  );
};

export default Categories;
