import { z } from "zod";

import { createSizeSchema } from "@/features/sizes/core/validations";

type TColorFormData = z.infer<typeof createSizeSchema>;

export default TColorFormData;
