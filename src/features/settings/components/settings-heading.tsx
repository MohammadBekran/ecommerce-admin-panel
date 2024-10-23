"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

const SettingsHeading = () => {
  const handleDeleteStore = () => {};

  return (
    <div className="flex justify-between items-center">
      <Heading title="Settings" description="Manage store preferences." />
      <Button variant="destructive" size="icon" onClick={handleDeleteStore}>
        <Trash />
      </Button>
    </div>
  );
};

export default SettingsHeading;
