import type { Color } from "@prisma/client";

import ColorForm from "@/features/colors/components/color/color-form";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IColorProps {
  color: Color | null;
  storeId: string;
}

const Color = async ({ color, storeId }: IColorProps) => {
  const heading = color ? "Edit color" : "Create color";
  const description = color
    ? "Edit a color"
    : "Create a new color in your store";

  return (
    <div>
      <div className="space-y-2">
        <Heading title={heading} description={description} />
        <Separator />
      </div>
      <ColorForm color={color} storeId={storeId} />
    </div>
  );
};

export default Color;
