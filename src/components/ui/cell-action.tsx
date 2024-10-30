"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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

interface ICellActionProps<T> {
  data: T;
  dataKey: string;
  apiKey: string;
  onDelete: (id: string, onDelete: () => void) => void;
}

const CellAction = <T extends { id: string }>({
  data,
  dataKey,
  apiKey,
  onDelete,
}: ICellActionProps<T>) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();

  const onDeleteFunc = () => {
    router.refresh();
    setOpen(false);
  };

  const handleDelete = () => {
    startTransition(() => onDelete(params.storeId as string, onDeleteFunc));
  };

  return (
    <>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
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
              copyText(data.id, `${dataKey} Id copied to clipboard.`)
            }
          >
            <Copy className="cell-action-icon" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/${apiKey}/${data.id}`)
            }
          >
            <Edit className="cell-action-icon" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="cell-action-icon" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
