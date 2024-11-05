"use client";

import { ColumnDef } from "@tanstack/react-table";

import { deleteCategory } from "@/features/categories/core/services/api";
import type { TCategoryColumn } from "@/features/categories/core/types";

import CellAction from "@/components/ui/cell-action";

const CATEGORY_COLUMNS: ColumnDef<TCategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
        dataKey="Categories"
        apiKey="categories"
        onDelete={async (storeId, onDelete) =>
          await deleteCategory(storeId, row.original.id, onDelete)
        }
      />
    ),
  },
];

export default CATEGORY_COLUMNS;
