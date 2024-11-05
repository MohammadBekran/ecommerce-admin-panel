"use client";

import { useCreateStoreModal } from "@/features/store/core/hooks";

import Modal from "@/components/ui/modal";
import CreateStoreForm from "@/features/store/components/CreateStoreForm";

const CreateStoreModal = () => {
  const { open, onClose } = useCreateStoreModal();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Store"
      description="Add a new store to manage products and categories"
    >
      <CreateStoreForm />
    </Modal>
  );
};

export default CreateStoreModal;
