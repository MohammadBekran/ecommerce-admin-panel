import { z } from "zod";

const createColorSchema = z.object({
  name: z.string().min(1, "Name is required."),
  value: z.string().min(4).regex(/^#/, {
    message: "String must be valid hex code",
  }),
});

export default createColorSchema;
