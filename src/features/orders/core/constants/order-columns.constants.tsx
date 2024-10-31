"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TOrderColumn } from "@/features/orders/core/types";

const ORDER_COLUMNS: ColumnDef<TOrderColumn>[] = [
  {
    accessorKey: "Products",
    header: "products",
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
];

export default ORDER_COLUMNS;
