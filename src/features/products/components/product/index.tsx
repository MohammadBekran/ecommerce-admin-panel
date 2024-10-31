import type { Category, Color, Image, Product, Size } from "@prisma/client";

import ProductForm from "@/features/products/components/product/product-form";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IProductProps {
  product: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  storeId: string;
}

const Product = async ({
  product,
  categories,
  sizes,
  colors,
  storeId,
}: IProductProps) => {
  const heading = product ? "Edit product" : "Create product";
  const description = product
    ? "Edit a product"
    : "Create a new product in your store";

  return (
    <div>
      <div className="space-y-2">
        <Heading title={heading} description={description} />
        <Separator />
      </div>
      <ProductForm
        product={product}
        categories={categories}
        sizes={sizes}
        colors={colors}
        storeId={storeId}
      />
    </div>
  );
};

export default Product;
