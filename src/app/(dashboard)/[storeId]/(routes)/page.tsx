import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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

  return <div className="px-5">Active store: {store?.name}</div>;
};

export default StorePage;
