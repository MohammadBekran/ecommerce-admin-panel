"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TBillboardFormData } from "@/features/billboards/core/types";
import { createBillboardSchema } from "@/features/billboards/core/validations";

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
import { UploadButton } from "@/lib/uploadthing";

interface IBillboardFormProps {
  billboard: (Billboard | null) | undefined;
  storeId: string;
}

const BillboardForm = ({ billboard, storeId }: IBillboardFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TBillboardFormData>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: {
      label: billboard?.label || "",
    },
  });

  const onSubmit = async (values: TBillboardFormData) => {
    try {
      setIsLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/stores/${storeId}/billboards/${billboard!.id}`,
          values
        );
      } else await axios.post(`/api/stores/${storeId}/billboards`, values);
      toast.success("Store has been updated.");

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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    field.onChange(res[0].url);
                    toast.success("File uploaded.");
                  }}
                  onUploadError={() => {
                    toast.error("Something went wrong,");
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="label" {...field} />
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

export default BillboardForm;
