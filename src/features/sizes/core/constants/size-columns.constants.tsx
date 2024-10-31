"use client";

import { ColumnDef } from "@tanstack/react-table";

import deleteSize from "@/features/sizes/core/services/api/delete-size.api";
import { TSizeColumn } from "@/features/sizes/core/types";

import CellAction from "@/components/ui/cell-action";

const SIZE_COLUMNS: ColumnDef<TSizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
        dataKey="Sizes"
        apiKey="sizes"
        onDelete={async (storeId, onDelete) =>
          await deleteSize(storeId, row.original.id, onDelete)
        }
      />
    ),
  },
];

export default SIZE_COLUMNS;
