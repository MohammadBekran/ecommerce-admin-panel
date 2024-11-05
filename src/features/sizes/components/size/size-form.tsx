"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { TSizeFormData } from "@/features/sizes/core/types";
import { createSizeSchema } from "@/features/sizes/core/validations";

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

interface ISizeFromProps {
  size: (Size | null) | undefined;
  storeId: string;
}

const SizeForm = ({ size, storeId }: ISizeFromProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TSizeFormData>({
    resolver: zodResolver(createSizeSchema),
    defaultValues: {
      name: size?.name ?? "",
      value: size?.value ?? "",
    },
  });

  const buttonTitle = size ? "Edit size" : "Create size";
  const toastMessage = size
    ? "Size has been edited."
    : "Size has been created.";

  const onSubmit = async (values: TSizeFormData) => {
    try {
      setIsLoading(true);
      if (size) {
        await axios.patch(`/api/stores/${storeId}/sizes/${size!.id}`, values);
      } else await axios.post(`/api/stores/${storeId}/sizes`, values);
      toast.success(toastMessage);

      router.push(`/${storeId}/sizes`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="max-w-xl grid grid-cols-2 gap-8">
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
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder="value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {buttonTitle}
        </Button>
      </form>
    </Form>
  );
};

export default SizeForm;
