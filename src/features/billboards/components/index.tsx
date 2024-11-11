import { Plus } from "lucide-react";
import Link from "next/link";

import { BILLBOARDS_COLUMNS } from "@/features/billboards/core/constants";
import type { TBillboardColumn } from "@/features/billboards/core/types";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IBillboardsProps {
  storeId: string;
  billboards: TBillboardColumn[];
}

const Billboards = ({ storeId, billboards }: IBillboardsProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <div className="flex justify-between">
          <Heading
            title={`Billboards (${billboards.length})`}
            description="Manage billboards for your store"
          />
          <Link href={`/${storeId}/billboards/new`}>
            <Button>
              <Plus />
              Add new
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
      <DataTable
        columns={BILLBOARDS_COLUMNS}
        data={billboards}
        searchKey="label"
      />
      <Heading title="API " description="API calls for Billboards" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
    </div>
  );
};

export default Billboards;
