"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
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
import { UploadDropzone } from "@/lib/uploadthing";

interface IBillboardFormProps {
  billboard: (Billboard | null) | undefined;
  storeId: string;
}

const BillboardForm = ({ billboard, storeId }: IBillboardFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(billboard?.imageUrl ?? "");
  const router = useRouter();
  const form = useForm<TBillboardFormData>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
      imageUrl: billboard?.imageUrl ?? "",
    },
  });

  const buttonTitle = billboard ? "Edit billboard" : "Create billboard";
  const toastMessage = billboard
    ? "Billboard has been edited."
    : "Billboard has been created.";

  const handleUploadComplete = (
    field: { onChange: (imageUrl: string) => void },
    res: { url: string }[]
  ) => {
    field.onChange(res[0].url);
    setImage(res[0].url);

    toast.success("File uploaded.");
  };

  const handleDeleteImage = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value = "";
    setImage("");
  };

  const onSubmit = async (values: TBillboardFormData) => {
    try {
      setIsLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/stores/${storeId}/billboards/${billboard!.id}`,
          values
        );
      } else await axios.post(`/api/stores/${storeId}/billboards`, values);
      toast.success(toastMessage);

      router.push(`/${storeId}/billboards`);
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
        className="max-w-xl space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {image && (
                <div className="relative w-[170px] h-[200px] overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    fill
                    objectFit="cover"
                    alt="billboard image"
                    className="rounded-xl overflow-hidden"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-4 right-2"
                    onClick={() => handleDeleteImage(field.value)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              )}
              <FormControl>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) =>
                    handleUploadComplete(field, res)
                  }
                  onUploadError={() => {
                    toast.error("Something went wrong.");
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
          {buttonTitle}
        </Button>
      </form>
    </Form>
  );
};

export default BillboardForm;
