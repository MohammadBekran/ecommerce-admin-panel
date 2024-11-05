import { create } from "zustand";

interface ICreateStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateStoreModal = create<ICreateStore>((set) => ({
  open: false,
  onOpen: () =>
    set(() => ({
      open: true,
    })),
  onClose: () =>
    set(() => ({
      open: false,
    })),
}));

export default useCreateStoreModal;
