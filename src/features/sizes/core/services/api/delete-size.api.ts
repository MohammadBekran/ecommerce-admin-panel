import axios from "axios";

import { toast } from "@/core/utils";

const deleteSize = async (
  storeId: string | string[],
  sizeId: string,
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}/sizes/${sizeId}`);

    toast.success("Size has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and categories first.");
  }
};

export default deleteSize;
