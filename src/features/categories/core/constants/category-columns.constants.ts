"use client";

import { ColumnDef } from "@tanstack/react-table";

import TCategoryColumn from "@/features/categories/core/types/category-columns.type";

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
];

export default CATEGORY_COLUMNS;
