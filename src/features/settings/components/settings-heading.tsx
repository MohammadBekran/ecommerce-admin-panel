"use client";

import { Trash } from "lucide-react";
import { useState } from "react";

import DeleteStoreModal from "@/features/settings/components/delete-store-modal";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

const SettingsHeading = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <Heading title="Settings" description="Manage store preferences." />
      <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
        <Trash />
      </Button>
      <DeleteStoreModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default SettingsHeading;
