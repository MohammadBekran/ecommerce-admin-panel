"use client";

import { ColumnDef } from "@tanstack/react-table";

import { deleteBillboard } from "@/features/billboards/core/services/api";
import { TBillboardColumn } from "@/features/billboards/core/types";

import CellAction from "@/components/ui/cell-action";

const BILLBOARDS_COLUMNS: ColumnDef<TBillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
        dataKey="Billboards"
        apiKey="billboards"
        onDelete={async (storeId, onDelete) =>
          await deleteBillboard(storeId, row.original.id, onDelete)
        }
      />
    ),
  },
];

export default BILLBOARDS_COLUMNS;
