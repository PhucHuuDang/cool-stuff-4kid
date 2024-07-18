"use client";

import { Product, ProductApiProps } from "@/interface";
import { CardProduct } from "../card-product";
import useFromStore from "@/store/use-from-store";
import { useCartStore } from "@/hooks/use-cart-store";

interface CartProps {
  // products: Product[];
  products: ProductApiProps[];
}

export const Cart: React.FC<CartProps> = ({ products }) => {
  return (
    <>
      {products.map((item) => (
        <CardProduct key={item.productId} product={item} />
      ))}
    </>
  );
};
