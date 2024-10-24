import { z } from "zod";

import { settingsFormSchema } from "@/features/settings/core/validations";

type TSettingsFormData = z.infer<typeof settingsFormSchema>;

export default TSettingsFormData;
