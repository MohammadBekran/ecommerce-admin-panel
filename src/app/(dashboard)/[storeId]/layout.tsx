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
      <div className="max-w-[1440px] mx-auto px-5 pb-5">{children}</div>
    </div>
  );
};

export default StoreLayout;
