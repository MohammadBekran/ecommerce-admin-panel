"use client";

import { ColumnDef } from "@tanstack/react-table";

import deleteProduct from "@/features/products/core/services/api/delete-product.api";
import type { TProductColumn } from "@/features/products/core/types";

import CellAction from "@/components/ui/cell-action";
import Color from "@/components/ui/color";

const PRODUCT_COLUMNS: ColumnDef<TProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <Color color={row.original.color} />,
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
        dataKey="Products"
        apiKey="products"
        onDelete={async (storeId, onDelete) =>
          await deleteProduct(storeId, row.original.id, onDelete)
        }
      />
    ),
  },
];

export default PRODUCT_COLUMNS;
