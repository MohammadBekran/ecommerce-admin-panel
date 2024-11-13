import type { Metadata } from "next";

import prisma from "@/lib/db";

import Size from "@/features/sizes/components/size";

interface ISizePageProps {
  params: { storeId: string; sizeId: string };
}

const SizePage = async ({ params }: ISizePageProps) => {
  const size = await prisma.size.findUnique({
    where: { id: params.sizeId, storeId: params.storeId },
  });

  return <Size size={size} storeId={params.storeId} />;
};

export async function generateMetadata({
  params,
}: ISizePageProps): Promise<Metadata> {
  const size = await prisma.size.findUnique({
    where: { id: params.sizeId, storeId: params.storeId },
  });

  return {
    title: size?.name,
    description: `On this page, you can edit the size '${size?.name}'`,
  };
}

export default SizePage;
