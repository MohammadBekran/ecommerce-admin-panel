import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

import deleteStore from "@/features/settings/core/services/api/delete-store.api";

import AlertModal from "@/components/ui/alert-modal";

interface IDeleteStoreModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteStoreModal = ({ open, setOpen }: IDeleteStoreModalProps) => {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteStore = () => {
    startTransition(() =>
      deleteStore(params.storeId, () => {
        router.push("/");
        router.refresh();
      })
    );
  };

  return (
    <AlertModal
      title="Are you sure?"
      description="This action cannot be undone."
      open={open}
      onClose={() => setOpen(false)}
      loading={isPending}
      onConfirm={handleDeleteStore}
    />
  );
};

export default DeleteStoreModal;
