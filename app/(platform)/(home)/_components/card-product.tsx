"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/interface";
import Image from "next/image";

interface CardProductProps {
  product: Product;
}

export const CardProduct = ({ product }: CardProductProps) => {
  const description =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const MAX_LENGTH = 54;
  return (
    <div
      className="
    col-span-1 
    cursor-pointer 
    group

"
      onClick={() => console.log("first")}
    >
      <div className="flex flex-col gap-2 w-full relative">
        <div
          className="
                        absolute
                        top-0
                        right-0
                        m-0
                        p-2
                        bg-[#489bee]
                        text-white
                        rounded-bl-xl
                        font-semibold
                        text-xs
                        z-10
                        flex  
                        items-center
                        gap-1
                      "
        >
          <span>Sale</span>
          <span>
            {/* {data?.discountPercent !== undefined
          ? `-${data?.discountPercent}%`
          : "-0%"} */}
            {`-${product.discountPercent}%`}
          </span>
        </div>
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl"
        >
          <Image
            fill
            alt="Listing"
            src={product.image}
            className="
            object-cover
            h-full
            w-full
            group-hover:scale-110
            transition
        "
          />

          {/* can add here the icon cart or not */}
        </div>
        <div className="font-semibold text-lg min-h-[56px]">
          {/* {data?.serviceName} */}
          {product.title}
        </div>
        <div className="font-light text-neutral-500 h-[65px]">
          {description.length > MAX_LENGTH
            ? description.slice(0, MAX_LENGTH) + "..."
            : description}
        </div>
        <div className="flex flex-row text-md items-center gap-3 mt-3">
          <div className="flex flex-row items-center gap-2">
            <del className="font-light text-[#ed9080]">
              {/* {formattedPrice(data?.originalPrice as number)} */}
              {product.originalPrice}
            </del>{" "}
            <span>₫</span>
          </div>

          <h1
            className="
            font-semibold
            text-neutral-500
            text-xl
            ml-1
            mr-1
          "
          >
            |
          </h1>

          <div className="flex flex-row items-center gap-2">
            <span className="font-light text-[#ff6347] ">
              {product.discountPrice}
            </span>{" "}
            <span>₫</span>
          </div>
        </div>
        <Button variant="book">Add to cart</Button>
      </div>
    </div>
  );
};
