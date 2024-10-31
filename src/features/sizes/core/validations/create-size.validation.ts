import { z } from "zod";

const createSizeSchema = z.object({
  name: z.string().min(1, "Name is required."),
  value: z.string().min(1, "Value is required."),
});

export default createSizeSchema;
