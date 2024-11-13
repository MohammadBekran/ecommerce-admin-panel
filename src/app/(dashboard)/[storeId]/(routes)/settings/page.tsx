import type { Metadata } from "next";

import Settings from "@/features/settings/components";

const SettingsPage = ({ params }: { params: { storeId: string } }) => {
  return <Settings storeId={params.storeId} />;
};

export const metadata: Metadata = {
  title: "Settings",
  description:
    "On this page, you can see and change the information of your store",
};

export default SettingsPage;
