"use client";

import { Product } from "@/interface";
import { CardProduct } from "../card-product";
import useFromStore from "@/store/use-from-store";
import { useCartStore } from "@/hooks/use-cart-store";

interface CartProps {
  product: Product[];
}

export const Cart: React.FC<CartProps> = ({ product }) => {
  return (
    <>
      {product.map((item) => (
        <>
          <CardProduct key={item.id} product={item} />
          <CardProduct key={item.id} product={item} />
          <CardProduct key={item.id} product={item} />
          <CardProduct key={item.id} product={item} />
        </>
      ))}
    </>
  );
};
