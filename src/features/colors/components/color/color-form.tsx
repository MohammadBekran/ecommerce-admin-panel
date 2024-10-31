"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Color } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TColorFormData } from "@/features/colors/core/types";
import { createColorSchema } from "@/features/colors/core/validations";

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

interface IColorFormProps {
  color: (Color | null) | undefined;
  storeId: string;
}

const ColorForm = ({ color, storeId }: IColorFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TColorFormData>({
    resolver: zodResolver(createColorSchema),
    defaultValues: {
      name: color?.name ?? "",
      value: color?.value ?? "",
    },
  });

  const buttonTitle = color ? "Edit color" : "Create color";
  const toastMessage = color
    ? "Color has been edited."
    : "Color has been created.";

  const onSubmit = async (values: TColorFormData) => {
    try {
      setIsLoading(true);
      if (color) {
        await axios.patch(`/api/stores/${storeId}/colors/${color!.id}`, values);
      } else await axios.post(`/api/stores/${storeId}/colors`, values);
      toast.success(toastMessage);

      router.push(`/${storeId}/colors`);
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
                  <div className="flex items-center gap-x-4">
                    <Input placeholder="value" {...field} />
                    <div
                      className="border p-4 rounded-full"
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
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

export default ColorForm;
