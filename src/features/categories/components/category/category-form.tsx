"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { TCategoryFormData } from "@/features/categories/core/types";
import { createCategorySchema } from "@/features/categories/core/validations";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/core/utils";

interface ICategoryFormProps {
  category: (Category | null) | undefined;
  billboards: Billboard[];
  storeId: string;
}

const CategoryForm = ({
  category,
  billboards,
  storeId,
}: ICategoryFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      billboardId: category?.billboardId ?? "",
    },
  });

  const buttonTitle = category ? "Edit category" : "Create";
  const toastMessage = category
    ? "Category has been edited."
    : "Category has been created.";

  const onSubmit = async (values: TCategoryFormData) => {
    try {
      setIsLoading(true);
      if (category) {
        await axios.patch(
          `/api/stores/${storeId}/categories/${category!.id}`,
          values
        );
      } else await axios.post(`/api/stores/${storeId}/categories`, values);
      toast.success(toastMessage);

      router.push(`/${storeId}/categories`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-5">
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a billboard"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm;
