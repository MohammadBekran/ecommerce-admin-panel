"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { TOrderColumn } from "@/features/orders/core/types";
import CellAction from "@/components/ui/cell-action";

const ORDER_COLUMNS: ColumnDef<TOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        dataKey="Orders"
        apiKey="orders"
        order
        id={row.original.id}
        update={false}
      />
    ),
  },
];

export default ORDER_COLUMNS;
