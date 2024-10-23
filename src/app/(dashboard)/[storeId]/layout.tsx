import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "@/components/header";

const StoreLayout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default StoreLayout;
