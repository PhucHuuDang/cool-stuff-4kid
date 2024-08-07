"use client";

import { GlareCard } from "@/components/glare-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { removeMarks } from "@/handle-transform/remove-marks";
import { useCartStore } from "@/hooks/use-cart-store";
import { Product, ProductApiProps } from "@/interface";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

interface CardProductProps {
  // product: Product;
  product: ProductApiProps;
}

export const CardProduct = forwardRef<HTMLDivElement, CardProductProps>(
  ({ product }, ref) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const router = useRouter();

    const MAX_LENGTH = 54;

    const handleAddToCart = (e: any, product: ProductApiProps) => {
      e.stopPropagation();
      addToCart(product);
    };

    const handleRoute = (title: string, id: string) => {
      const titleTransformed = removeMarks(title);

      const params = {
        titleTransformed,
        id,
      };

      console.log({ params });

      router.push(`/${params.titleTransformed}/${params.id}`);
    };

    return (
      <div
        className="group col-span-1 cursor-pointer"
        onClick={() => handleRoute(product.productName, product.productId)}
        ref={ref}
      >
        <div className="relative flex w-full flex-col gap-2">
          {product.discountPercent > 0 && product.discountPercent && (
            <div className="absolute right-0 top-0 z-10 m-0 flex items-center gap-1 rounded-bl-xl bg-[#489bee] p-2 text-xs font-semibold text-white">
              <span>Sale</span>
              <span>{`-${product.discountPercent}%`}</span>
            </div>
          )}
          <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
            {/* <GlareCard className="flex flex-col items-center justify-center"> */}
            <Image
              fill
              alt={`product-${product.productName}`}
              src={product.image}
              className="h-full w-full object-cover transition group-hover:scale-110"
              // className="absolute size-full object-cover transition group-hover:scale-110"
            />

            {/* can add here the icon cart or not */}
            {/* </GlareCard> */}
          </div>
          <div className="min-h-[56px] text-lg font-semibold">
            {/* {data?.serviceName} */}
            {product.productName}
          </div>
          <div className="h-[65px] font-light text-neutral-500">
            {product.productDescription.length > MAX_LENGTH
              ? product.productDescription.slice(0, MAX_LENGTH) + "..."
              : product.productDescription}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-md mt-3 flex flex-row items-center gap-1">
              {product.discountPercent && product.discountPercent > 0 ? (
                <>
                  <div className="flex flex-row items-center gap-2">
                    <del className="font-light text-[#ed9080]">
                      {/* {formattedPrice(data?.originalPrice as number)} */}
                      {formatCurrency(product.price)}
                    </del>{" "}
                  </div>

                  <h1 className="text-xl font-semibold text-neutral-500">|</h1>

                  <div className="flex flex-row items-center gap-2">
                    <span className="font-bold text-[#ff6347]">
                      {formatCurrency(product.discountPrice)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  <div className="font-bold text-[#ed9080]">
                    {/* {formattedPrice(data?.originalPrice as number)} */}
                    {formatCurrency(product.price)}
                  </div>{" "}
                </div>
              )}
            </div>

            <ShoppingCart
              onClick={(e) => handleAddToCart(e, product)}
              className="size-10 cursor-pointer rounded-lg p-1 text-slate-600 duration-200 hover:scale-110 hover:bg-slate-200 hover:text-slate-800 hover:shadow-lg"
            />
          </div>
        </div>
      </div>
    );
  },
);

CardProduct.displayName = "CardProduct";
