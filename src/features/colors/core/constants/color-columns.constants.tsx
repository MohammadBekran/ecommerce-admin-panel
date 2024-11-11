"use client";

import { ColumnDef } from "@tanstack/react-table";

import { deleteColor } from "@/features/colors/core/services/api";
import type { TColorColumn } from "@/features/colors/core/types";

import CellAction from "@/components/ui/cell-action";
import Color from "@/components/ui/color";

const COLOR_COLUMNS: ColumnDef<TColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <Color color={row.original.value} />,
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
