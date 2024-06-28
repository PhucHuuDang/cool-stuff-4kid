"use client";

import { GlareCard } from "@/components/glare-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { removeMarks } from "@/handle-transform/remove-marks";
import { useCartStore } from "@/hooks/use-cart-store";
import { Product } from "@/interface";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProductProps {
  product: Product;
}

export const CardProduct = ({ product }: CardProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const description =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const MAX_LENGTH = 54;

  const handleAddToCart = (e: any, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleRoute = (title: string) => {
    const titleTransformed = removeMarks(title);

    router.push(`/${titleTransformed}`);
  };

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => handleRoute(product.title)}
    >
      <div className="relative flex w-full flex-col gap-2">
        <div className="absolute right-0 top-0 z-10 m-0 flex items-center gap-1 rounded-bl-xl bg-[#489bee] p-2 text-xs font-semibold text-white">
          <span>Sale</span>
          <span>
            {/* {data?.discountPercent !== undefined
          ? `-${data?.discountPercent}%`
          : "-0%"} */}
            {`-${product.discountPercent}%`}
          </span>
        </div>
        <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
          {/* <GlareCard className="flex flex-col items-center justify-center"> */}
          <Image
            fill
            alt={`product-${product.title}`}
            src={product.image}
            className="h-full w-full object-cover transition group-hover:scale-110"
            // className="absolute size-full object-cover transition group-hover:scale-110"
          />

          {/* can add here the icon cart or not */}
          {/* </GlareCard> */}
        </div>
        <div className="min-h-[56px] text-lg font-semibold">
          {/* {data?.serviceName} */}
          {product.title}
        </div>
        <div className="h-[65px] font-light text-neutral-500">
          {description.length > MAX_LENGTH
            ? description.slice(0, MAX_LENGTH) + "..."
            : description}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-md mt-3 flex flex-row items-center gap-1">
            <div className="flex flex-row items-center gap-2">
              <del className="font-light text-[#ed9080]">
                {/* {formattedPrice(data?.originalPrice as number)} */}
                {formatCurrency(product.originalPrice)}
              </del>{" "}
            </div>

            <h1 className="text-xl font-semibold text-neutral-500">|</h1>

            <div className="flex flex-row items-center gap-2">
              <span className="font-bold text-[#ff6347]">
                {formatCurrency(product.discountPrice)}
              </span>
            </div>
          </div>

          <ShoppingCart
            onClick={(e) => handleAddToCart(e, product)}
            className="size-10 cursor-pointer rounded-lg p-1 text-slate-600 duration-200 hover:scale-110 hover:bg-slate-200 hover:text-slate-800 hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
