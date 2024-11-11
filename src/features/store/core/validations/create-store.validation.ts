import { z } from "zod";

const createStoreSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

export default createStoreSchema;
