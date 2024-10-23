import { z } from "zod";

const updateStoreSchema = z.object({
  name: z.string().min(1).optional(),
});

export default updateStoreSchema;
