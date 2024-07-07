"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { Product, ProductApiProps } from "@/interface";
import Image from "next/image";

interface ProductCheckoutProps {
  product: ProductApiProps;
}

export const ProductCheckout = ({ product }: ProductCheckoutProps) => {
  const MAX_LENGTH = 45;

  const price =
    product.discountPrice > 0
      ? product.discountPrice * (product.quantityOrder as number)
      : product.price * (product.quantityOrder as number);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-x-4">
          <div className="relative aspect-square size-14 overflow-hidden rounded-xl">
            {/* <GlareCard className="flex flex-col items-center justify-center"> */}
            <Image
              fill
              src={product.image}
              alt={`product-${product.productName}`}
              className="size-full object-cover transition group-hover:scale-110"
              // className="absolute size-full object-cover transition group-hover:scale-110"
            />

            {/* can add here the icon cart or not */}
            {/* </GlareCard> */}
          </div>

          <div>
            <h1 className="text-lg font-bold">
              {product.productName.length > MAX_LENGTH
                ? product.productName.slice(0, MAX_LENGTH) + "..."
                : product.productName}
            </h1>
            {/* <div>SKU: 123456789</div> */}
          </div>
        </div>
      </TableCell>
      {product.discountPrice > 0 ? (
        <TableCell className="font-bold">
          {formatCurrency(product.discountPrice)}
        </TableCell>
      ) : (
        <TableCell className="font-bold">
          {formatCurrency(product.price)}
        </TableCell>
      )}
      <TableCell className="font-bold">{product.quantityOrder}</TableCell>
      <TableCell className="font-bold text-[#ff6347]">
        {formatCurrency(price)}
      </TableCell>
    </TableRow>
  );
};
