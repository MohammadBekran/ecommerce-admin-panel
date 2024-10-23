import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/header/store-switcher";
import { Separator } from "@/components/ui/separator";
import getStores from "@/core/services/api/store/get-stores.api";

const Header = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await getStores({
    where: {
      userId,
    },
  });

  const formattedStores = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  return (
    <div className="py-3 space-y-3">
      <div className="px-3">
        <StoreSwitcher stores={formattedStores} />
      </div>
      <Separator />
    </div>
  );
};

export default Header;
