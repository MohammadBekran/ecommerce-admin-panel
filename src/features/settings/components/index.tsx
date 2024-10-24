import { redirect } from "next/navigation";

import SettingsForm from "@/features/settings/components/settings-form";
import SettingsHeading from "@/features/settings/components/settings-heading";

import { Separator } from "@/components/ui/separator";
import getStore from "@/core/services/api/store/get-store.api";

const Settings = async ({ storeId }: { storeId: string }) => {
  const store = await getStore({
    where: {
      id: storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <SettingsHeading />
        <Separator />
      </div>
      <SettingsForm store={store} />
    </div>
  );
};

export default Settings;
