import axios from "axios";

import { toast } from "@/core/utils";

const deleteStore = async (
  storeId: string | string[],
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}`);

    toast.success("Store has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and categories first.");
  }
};

export default deleteStore;
