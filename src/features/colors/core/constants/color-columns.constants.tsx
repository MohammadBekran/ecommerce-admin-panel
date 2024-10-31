"use client";

import { ColumnDef } from "@tanstack/react-table";

import deleteColor from "@/features/colors/core/services/api/delete-color.api";
import { TColorColumn } from "@/features/colors/core/types";

import CellAction from "@/components/ui/cell-action";

const COLOR_COLUMNS: ColumnDef<TColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="size-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
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
        dataKey="Colors"
        apiKey="colors"
        onDelete={async (storeId, onDelete) =>
          await deleteColor(storeId, row.original.id, onDelete)
        }
      />
    ),
  },
];

export default COLOR_COLUMNS;
