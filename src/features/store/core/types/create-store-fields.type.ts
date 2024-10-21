import { z } from "zod";

import { createStoreSchema } from "@/features/store/core/validations";

type TCreateStoreFields = z.infer<typeof createStoreSchema>;

export default TCreateStoreFields;
