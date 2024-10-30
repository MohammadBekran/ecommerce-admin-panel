import axios from "axios";

import { toast } from "@/core/utils";

const deleteCategory = async (
  storeId: string | string[],
  categoryId: string,
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}/categories/${categoryId}`);

    toast.success("Category has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and billboards first.");
  }
};

export default deleteCategory;
