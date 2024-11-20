import axios from "axios";

import { toast } from "@/core/utils";

const changeOrderStatus = async (
  storeId: string | string[],
  orderId: string,
  onChange: () => void
) => {
  try {
    await axios.patch(`/api/stores/${storeId}/orders/${orderId}`, {
      isPaid: true,
    });

    toast.success("The status of order has been edited.");
    onChange();
  } catch {
    toast.error("Something went wrong.");
  }
};

export default changeOrderStatus;
