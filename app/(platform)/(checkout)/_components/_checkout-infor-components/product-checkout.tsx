"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { Product } from "@/interface";
import Image from "next/image";

interface ProductCheckoutProps {
  product: Product;
}

export const ProductCheckout = ({ product }: ProductCheckoutProps) => {
  const MAX_LENGTH = 45;

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-x-4">
          <div className="relative aspect-square size-14 overflow-hidden rounded-xl">
            {/* <GlareCard className="flex flex-col items-center justify-center"> */}
            <Image
              fill
              src={product.image}
              alt={`product-${product.title}`}
              className="size-full object-cover transition group-hover:scale-110"
              // className="absolute size-full object-cover transition group-hover:scale-110"
            />

            {/* can add here the icon cart or not */}
            {/* </GlareCard> */}
          </div>

          <div>
            <h1 className="text-lg font-bold">
              {product.title.length > MAX_LENGTH
                ? product.title.slice(0, MAX_LENGTH) + "..."
                : product.title}
            </h1>
            {/* <div>SKU: 123456789</div> */}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-bold">
        {formatCurrency(product.discountPrice)}
      </TableCell>
      <TableCell className="font-bold">{product.quantityOrder}</TableCell>
      <TableCell className="font-bold text-[#ff6347]">
        {formatCurrency(
          product.discountPrice * (product.quantityOrder as number),
        )}
      </TableCell>
    </TableRow>
  );
};
