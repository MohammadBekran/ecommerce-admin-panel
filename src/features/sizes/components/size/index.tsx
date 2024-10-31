import type { Size } from "@prisma/client";

import SizeForm from "@/features/sizes/components/size/size-form";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ISizeProps {
  size: Size | null;
  storeId: string;
}

const Size = async ({ size, storeId }: ISizeProps) => {
  const heading = size ? "Edit size" : "Create size";
  const description = size ? "Edit a size" : "Create a new size in your store";

  return (
    <div>
      <div className="space-y-2">
        <Heading title={heading} description={description} />
        <Separator />
      </div>
      <SizeForm size={size} storeId={storeId} />
    </div>
  );
};

export default Size;
