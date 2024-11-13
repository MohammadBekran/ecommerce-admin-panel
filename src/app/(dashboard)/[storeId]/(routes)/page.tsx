import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import getStore from "@/core/services/api/store/get-store.api";

const StorePage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const store = await getStore({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return <div>Active store: {store?.name}</div>;
};

export const metadata: Metadata = {
  title: "Dashboard",
  description: "On this page, you can see the summary of your store",
};

export default StorePage;
