"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "@/components/ui/cell-action";
import TBillboardColumn from "@/features/billboards/core/types/billboard-column.type";
import deleteBillboard from "../services/api/delete-billboard.api";

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
