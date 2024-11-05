"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Store } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { TSettingsFormData } from "@/features/settings/core/types";
import { settingsFormSchema } from "@/features/settings/core/validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/core/utils";

const SettingsForm = ({ store }: { store: Store }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TSettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = async (values: TSettingsFormData) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${store.id}`, values);
      toast.success("Store has been edited.");

      router.refresh();
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
