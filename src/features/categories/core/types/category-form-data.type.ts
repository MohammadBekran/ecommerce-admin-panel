import { z } from "zod";

import { createCategorySchema } from "@/features/categories/core/validations";

type TCategoryFormData = z.infer<typeof createCategorySchema>;

export default TCategoryFormData;
