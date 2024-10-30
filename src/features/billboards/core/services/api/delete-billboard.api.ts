import axios from "axios";

import { toast } from "@/core/utils";

const deleteBillboard = async (
  storeId: string | string[],
  billboardId: string,
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}/billboards/${billboardId}`);

    toast.success("Billboard has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and categories first.");
  }
};

export default deleteBillboard;
