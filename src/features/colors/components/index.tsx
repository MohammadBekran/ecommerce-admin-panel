import { Plus } from "lucide-react";
import Link from "next/link";

import { COLOR_COLUMNS } from "@/features/colors/core/constants";
import type { TColorColumn } from "@/features/colors/core/types";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IColorsProps {
  storeId: string;
  colors: TColorColumn[];
}

const Colors = ({ storeId, colors }: IColorsProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <div className="flex justify-between">
          <Heading
            title={`Colors (${colors.length})`}
            description="Manage colors for your store"
          />
          <Link href={`/${storeId}/colors/new`}>
            <Button>
              <Plus />
              Add new
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
      <DataTable columns={COLOR_COLUMNS} data={colors} searchKey="name" />
      <Heading title="API " description="API calls for Colors" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="colors" entityIdName="colorId" />
      </div>
    </div>
  );
};

export default Colors;
