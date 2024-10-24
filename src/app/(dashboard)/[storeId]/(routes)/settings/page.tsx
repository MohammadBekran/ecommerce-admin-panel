import Settings from "@/features/settings/components";

const SettingsPage = ({ params }: { params: { storeId: string } }) => {
  return <Settings storeId={params.storeId} />;
};

export default SettingsPage;
