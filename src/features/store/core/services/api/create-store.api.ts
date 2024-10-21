import axios from "axios";
import { Store } from "@prisma/client";

import { toast } from "@/core/utils";

import type { TCreateStoreFields } from "@/features/store/core/types";

const createStore = async (data: TCreateStoreFields) => {
  try {
    const response = await axios.post<Store>("/api/stores", data);

    window.location.assign(`/${response.data.id}`);
  } catch {
    toast.error("Something went wrong.");
  }
};

export default createStore;
