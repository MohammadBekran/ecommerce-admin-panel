import type { Metadata } from "next";

import prisma from "@/lib/db";

import Color from "@/features/colors/components/color";

interface IColorPageProps {
  params: { storeId: string; colorId: string };
}

const ColorPage = async ({ params }: IColorPageProps) => {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId, storeId: params.storeId },
  });

  return <Color color={color} storeId={params.storeId} />;
};

export async function generateMetadata({
  params,
}: IColorPageProps): Promise<Metadata> {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId, storeId: params.storeId },
  });

  const title = color ? color?.name : "New color";
  const description = color
    ? `On this page, you can edit the color '${color?.name}'`
    : "On this page, you can create a new color";

  return {
    title,
    description,
  };
}

export default ColorPage;
