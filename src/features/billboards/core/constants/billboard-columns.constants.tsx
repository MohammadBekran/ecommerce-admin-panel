"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "@/features/billboards/components/cell-action";
import TBillboardColumn from "@/features/billboards/core/types/billboard-columns.type";

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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default BILLBOARDS_COLUMNS;
