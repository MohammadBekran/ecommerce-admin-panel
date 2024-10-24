"use client";

import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/core/hooks/use-origin";

const SettingsApiAlert = ({ storeId }: { storeId: string }) => {
  const origin = useOrigin();

  return (
    <ApiAlert
      title="NEXT_PUBLIC_API_URL"
      description={`${origin}/api/${storeId}`}
      variant="public"
    />
  );
};

export default SettingsApiAlert;
