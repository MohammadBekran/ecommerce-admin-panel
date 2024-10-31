import axios from "axios";

import { toast } from "@/core/utils";

const deleteProduct = async (
  storeId: string | string[],
  productId: string,
  onDelete: () => void
) => {
  try {
    await axios.delete(`/api/stores/${storeId}/products/${productId}`);

    toast.success("Product has been deleted.");
    onDelete();
  } catch {
    toast.error("Make sure you removed all products and categories first.");
  }
};

export default deleteProduct;
