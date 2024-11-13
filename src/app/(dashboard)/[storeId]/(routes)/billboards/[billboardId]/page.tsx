import type { Metadata } from "next";

import Billboard from "@/features/billboards/components/billboard";

import prisma from "@/lib/db";

interface IBillboardPageProps {
  params: { storeId: string; billboardId: string };
}

const BillboardPage = async ({ params }: IBillboardPageProps) => {
  const billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId, storeId: params.storeId },
  });

  return <Billboard billboard={billboard} storeId={params.storeId} />;
};

export async function generateMetadata({
  params,
}: IBillboardPageProps): Promise<Metadata> {
  const billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId, storeId: params.storeId },
  });

  const billboardImage = billboard?.imageUrl ?? "/placeholder.jpeg";

  return {
    title: billboard?.label,
    description: `On this page, you can edit the billboard '${billboard?.label}'`,
    openGraph: {
      images: [billboardImage],
    },
  };
}

export default BillboardPage;
