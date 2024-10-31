import { z } from "zod";

import { createProductSchema } from "@/features/products/core/validations";

type TBillboardFormData = z.infer<typeof createProductSchema>;

export default TBillboardFormData;
