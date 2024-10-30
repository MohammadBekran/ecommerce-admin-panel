"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import deleteBillboard from "@/features/billboards/core/services/api/delete-billboard.api";
import TBillboardColumn from "@/features/billboards/core/types/billboard-column.type";

import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import copyText from "@/core/utils/copy-text.utils";

const CellAction = ({ data }: { data: TBillboardColumn }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();

  const onDeleteBillboard = () => {
    router.refresh();
    setOpen(false);
  };

  const handleDeleteBillboard = () => {
    startTransition(() =>
      deleteBillboard(params.storeId, data.id, onDeleteBillboard)
    );
  };

  return (
    <>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeleteBillboard}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              copyText(data.id, "Billboard Id copied to clipboard.")
            }
          >
            <Copy className="billboard-cell-action-icon" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className="billboard-cell-action-icon" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="billboard-cell-action-icon" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
