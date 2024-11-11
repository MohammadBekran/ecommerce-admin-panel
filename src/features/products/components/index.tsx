import { Plus } from "lucide-react";
import Link from "next/link";

import { PRODUCT_COLUMNS } from "@/features/products/core/constants";
import type { TProductColumn } from "@/features/products/core/types";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IProductsProps {
  storeId: string;
  products: TProductColumn[];
}

const Products = ({ storeId, products }: IProductsProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <div className="flex justify-between">
          <Heading
            title={`Products (${products.length})`}
            description="Manage products for your store"
          />
          <Link href={`/${storeId}/products/new`}>
            <Button>
              <Plus />
              Add new
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
      <DataTable columns={PRODUCT_COLUMNS} data={products} searchKey="name" />
      <Heading title="API " description="API calls for Products" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </div>
  );
};

export default Products;
