import axios from "axios";

import { toast } from "@/core/utils";

const deleteColor = async (
  storeId: string | string[],
  colorId: string,
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}/colors/${colorId}`);

    toast.success("Color has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and categories first.");
  }
};

export default deleteColor;
