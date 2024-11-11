import { z } from "zod";

import { createSizeSchema } from "@/features/sizes/core/validations";

type TSizeFormData = z.infer<typeof createSizeSchema>;

export default TSizeFormData;
