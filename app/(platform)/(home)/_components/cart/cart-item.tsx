"use client";

import Image from "next/image";

import { Product, ProductApiProps } from "@/interface";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { formatCurrency } from "@/handle-transform/formatCurrency";

interface CartItemProps {
  product: ProductApiProps;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const increaseQuantity = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const handleDecreaseQuantity = (product: ProductApiProps) => {
    if (product.quantityOrder! > 1) {
      decreaseQuantity(product);
    }
  };

  const MAX_LENGTH = 7;

  return (
    <li className="flex cursor-pointer items-center gap-4 duration-200 hover:scale-105">
      <Image
        src={product.image}
        alt="tiny"
        height={64}
        width={64}
        className="size-16 rounded object-cover"
      />

      <div>
        <h3 className="text-sm text-gray-900">
          {product.productName.length > MAX_LENGTH
            ? product.productName.slice(0, MAX_LENGTH)
            : product.productName}
        </h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">Size:</dt>
            <dd className="inline">XXS</dd>
          </div>

          <div>
            <dt className="inline">Color:</dt>
            <dd className="inline">White</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col items-center">
        <div className="mx-2 flex items-center gap-x-1 rounded-md p-1">
          <span className="font-bold text-slate-600">Giá: </span>
          <span className="font-bold text-sky-400">
            {formatCurrency(
              product.discountPrice > 0 ? product.discountPrice : product.price,
            )}
          </span>
        </div>
        <div className="mx-2 flex items-center gap-x-1 rounded-md p-1">
          <span className="font-bold text-slate-600">Tổng: </span>
          <span className="font-bold text-[#ff6347]">
            {formatCurrency(
              product.discountPrice > 0
                ? product.discountPrice * product.quantityOrder!
                : product.price * product.quantityOrder!,
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <form className="flex items-center 2xl:gap-2">
          <label htmlFor="Line1Qty" className="sr-only">
            {" "}
            Quantity{" "}
          </label>
          <Minus
            // onClick={() => {
            //   if (product.quantityOrder! > 1) {
            //     decreaseQuantity(product);
            //   }
            // }}
            onClick={() => handleDecreaseQuantity(product)}
            className="size-5 cursor-pointer 2xl:size-6"
          />

          <input
            type="number"
            min="1"
            value={product.quantityOrder}
            id="Line1Qty"
            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-base text-sky-400 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <Plus
            onClick={() => increaseQuantity(product)}
            className="size-5 cursor-pointer 2xl:size-6"
          />
        </form>

        <div className="text-xl text-slate-400 2xl:mx-2">|</div>

        <Button
          variant="destructive"
          className="h-8 2xl:h-9"
          onClick={() => removeFromCart(product)}
        >
          <span className="sr-only">Remove item</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </li>
  );
};
