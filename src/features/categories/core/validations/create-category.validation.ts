import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required."),
  billboardId: z.string().min(1, "Billboard is required."),
});

export default createCategorySchema;
