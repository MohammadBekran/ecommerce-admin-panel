import { z } from "zod";

const settingsFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

export default settingsFormSchema;
