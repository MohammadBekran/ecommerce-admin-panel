import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required."),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, "It is necessary to select at least one image."),
  price: z.coerce.number().min(1, "Price is required."),
  categoryId: z.string().min(1, "Category is required."),
  sizeId: z.string().min(1, "Size is required."),
  colorId: z.string().min(1, "Color is required."),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export default createProductSchema;
