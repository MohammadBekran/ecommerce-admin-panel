import { z } from "zod";

const createBillboardSchema = z.object({
  label: z.string().min(1, "Label is required."),
  imageUrl: z.string().min(1, "Image is required."),
});

export default createBillboardSchema;
