import SettingsHeading from "@/features/settings/components/settings-heading";

import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div>
      <div className="space-y-2">
        <SettingsHeading />
        <Separator />
      </div>
    </div>
  );
};

export default Settings;
