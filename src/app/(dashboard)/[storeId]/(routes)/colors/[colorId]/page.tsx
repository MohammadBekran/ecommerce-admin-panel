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

  return {
    title: color?.name,
    description: `On this page, you can edit the color '${color?.name}'`,
  };
}

export default ColorPage;
