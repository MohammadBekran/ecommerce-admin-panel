"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { TProductFormData } from "@/features/products/core/types";
import { createProductSchema } from "@/features/products/core/validations";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { UploadDropzone } from "@/lib/uploadthing";

interface IProductFormProps {
  product: ((Product & { images: Image[] }) | null) | undefined;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  storeId: string;
}

const ProductForm = ({
  product,
  categories,
  sizes,
  colors,
  storeId,
}: IProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>(
    product?.images ?? []
  );
  const router = useRouter();

  const form = useForm<TProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product
      ? {
          ...product,
          price: parseFloat(String(product?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          sizeId: "",
          colorId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const buttonTitle = product ? "Edit product" : "Create product";
  const toastMessage = product
    ? "Product has been edited."
    : "Product has been created.";

  const handleUploadComplete = (
    field: { value: { url: string }[] },
    res: { url: string }[]
  ) => {
    const newImages = res.map(({ url }: { url: string }) => ({ url }));

    const updatedImages = [...images, ...newImages].filter(
      (image) => "url" in image
    );

    setImages(updatedImages);
    form.setValue("images", updatedImages);

    toast.success("File uploaded.");
  };

  const handleDeleteImage = (imageUrl: string) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.url !== imageUrl)
    );

    const fieldImages = form.getValues("images");
    form.setValue(
      "images",
      fieldImages.filter((image) => image.url !== imageUrl)
    );
  };

  const onSubmit = async (values: TProductFormData) => {
    console.log("submitted!", values);
    try {
      setIsLoading(true);
      if (product) {
        await axios.patch(
          `/api/stores/${storeId}/products/${product!.id}`,
          values
        );
      } else await axios.post(`/api/stores/${storeId}/products`, values);
      toast.success(toastMessage);

      router.push(`/${storeId}/products`);
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
        className="max-w-[800px] space-y-6 py-4"
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <div className="grid grid-cols-3 gap-4 mb-2">
                {images &&
                  images.map((image) => (
                    <div
                      key={image.url}
                      className="relative w-[170px] h-[200px] overflow-hidden rounded-2xl"
                    >
                      <NextImage
                        src={image.url}
                        fill
                        objectFit="cover"
                        alt="product image"
                        className="rounded-xl overflow-hidden"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-4 right-2"
                        onClick={() => handleDeleteImage(image.url)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))}
              </div>
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
        <div className="grid grid-cols-3 gap-8">
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isLoading}
                    placeholder="9.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a size"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a color"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    This product will appear on the home page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    This product will not appear anywhere in the store
                  </FormDescription>
                </div>
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

export default ProductForm;
