import { z } from "zod";

import { createBillboardSchema } from "@/features/billboards/core/validations";

type TBillboardFormData = z.infer<typeof createBillboardSchema>;

export default TBillboardFormData;
