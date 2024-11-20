"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { changeOrderStatus } from "@/features/orders/core/services/api";

import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyText } from "@/core/utils";

interface ICellActionProps<T> {
  data: T;
  dataKey: string;
  apiKey: string;
  id?: string;
  update?: boolean;
  order?: boolean;
  onDelete?: (id: string, onDelete: () => void) => void;
}

const CellAction = <T extends { id: string }>({
  data,
  dataKey,
  apiKey,
  id,
  update = true,
  order,
  onDelete,
}: ICellActionProps<T>) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [orderStatusOpen, setOrderStatusOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isChangeStatusPending, startStatusTransition] = useTransition();
  const router = useRouter();
  const params = useParams();

  const onChange = (setOpen: (open: boolean) => void) => {
    router.refresh();
    setOpen(false);
  };

  const handleDelete = () => {
    startDeleteTransition(() =>
      onDelete?.(params.storeId as string, () => onChange(setDeleteOpen))
    );
  };

  const handleChangeOrderStatus = () => {
    startStatusTransition(() =>
      changeOrderStatus(params.storeId, id!, () => onChange(setOrderStatusOpen))
    );
  };

  return (
    <>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={isDeletePending}
      />
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={orderStatusOpen}
        onClose={() => setOrderStatusOpen(false)}
        onConfirm={handleChangeOrderStatus}
        loading={isChangeStatusPending}
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
              copyText(data.id, `${dataKey} Id copied to clipboard.`)
            }
          >
            <Copy className="cell-action-icon" />
            Copy id
          </DropdownMenuItem>
          {update && (
            <DropdownMenuItem
              onClick={() =>
                router.push(`/${params.storeId}/${apiKey}/${data.id}`)
              }
            >
              <Edit className="cell-action-icon" />
              Update
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              <Trash className="cell-action-icon" />
              Delete
            </DropdownMenuItem>
          )}
          {order && (
            <DropdownMenuItem onClick={() => setOrderStatusOpen(true)}>
              <Edit className="cell-action-icon" />
              Change Status
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
