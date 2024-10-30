import type { Billboard } from "@prisma/client";

import BillboardForm from "@/features/billboards/components/billboard/billboard-form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IBillboardProps {
  billboard: Billboard | null;
  storeId: string;
}

const Billboard = async ({ billboard, storeId }: IBillboardProps) => {
  const heading = billboard ? "Update billboard" : "Billboard creation";
  const description = billboard
    ? "Update a billboard"
    : "Create a new billboard in your store";

  return (
    <div>
      <div className="space-y-2">
        <Heading title={heading} description={description} />
        <Separator />
      </div>
      <BillboardForm billboard={billboard} storeId={storeId} />
    </div>
  );
};

export default Billboard;
