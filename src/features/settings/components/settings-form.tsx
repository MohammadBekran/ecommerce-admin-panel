"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";

import { settingsFormSchema } from "@/features/settings/core/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type TSettingsFormData = z.infer<typeof settingsFormSchema>;

const SettingsForm = ({ store }: { store: Store }) => {
  const form = useForm<TSettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = (values: TSettingsFormData) => {
    console.log(values);
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
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
