import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import getStore from "@/core/services/api/store/get-store.api";

const StorePage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const store = await getStore({
    where: {
      id: params.id,
      userId,
    },
  });

  if (store) redirect("/");

  return <div></div>;
};

export default StorePage;
