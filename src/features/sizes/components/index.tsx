import { Plus } from "lucide-react";
import Link from "next/link";

import { SIZE_COLUMNS } from "@/features/sizes/core/constants";
import type { TSizeColumn } from "@/features/sizes/core/types";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ISizesProps {
  storeId: string;
  sizes: TSizeColumn[];
}

const Sizes = ({ storeId, sizes }: ISizesProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <div className="flex justify-between">
          <Heading
            title={`Sizes (${sizes.length})`}
            description="Manage sizes for your store"
          />
          <Link href={`/${storeId}/sizes/new`}>
            <Button>
              <Plus />
              Add new
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
      <DataTable columns={SIZE_COLUMNS} data={sizes} searchKey="name" />
      <Heading title="API " description="API calls for Sizes" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="sizes" entityIdName="sizeId" />
      </div>
    </div>
  );
};

export default Sizes;
