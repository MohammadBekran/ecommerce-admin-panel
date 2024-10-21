import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import getStore from "@/core/services/api/store/get-store.api";
import { TPropsWithChildren } from "@/core/types";

const Layout = async ({ children }: TPropsWithChildren) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await getStore({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default Layout;
