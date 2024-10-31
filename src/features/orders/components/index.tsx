import type { TOrderColumn } from "@/features/orders/core/types";
import { ORDER_COLUMNS } from "@/features/orders/core/constants";

import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IOrdersProps {
  orders: TOrderColumn[];
}

const Orders = ({ orders }: IOrdersProps) => {
  return (
    <div>
      <div className="space-y-4 mb-5">
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage orders for your store"
        />
        <Separator />
      </div>
      <DataTable columns={ORDER_COLUMNS} data={orders} searchKey="name" />
      <Heading title="API " description="API calls for Orders" />
      <div className="my-4 space-y-4">
        <Separator />
        <ApiList entityName="orders" entityIdName="orderId" />
      </div>
    </div>
  );
};

export default Orders;
