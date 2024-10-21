"use client";

import { useEffect } from "react";

import { useCreateStoreModal } from "@/features/store/hooks";

const HomePage = () => {
  const { open, onOpen } = useCreateStoreModal();

  useEffect(() => {
    if (!open) onOpen();
  }, [open, onOpen]);

  return null;
};

export default HomePage;
