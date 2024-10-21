import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import getStore from "@/core/services/api/store/get-store.api";

const StoreLayout = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await getStore({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return <div>StoreLayout</div>;
};

export default StoreLayout;
