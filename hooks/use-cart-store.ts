import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/interface";

interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  decreaseQuantity: (productId: Product) => void;
}

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;

        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity! + 1 }
              : item
          );

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.discountPrice,
          }));
        } else {
          const updateCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updateCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.discountPrice,
          }));
        }
      },

      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.discountPrice,
        }));
      },

      decreaseQuantity: (product: Product) => {
        const cart = get().cart;

        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updateCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, ...product, quantity: item.quantity! - 1 }
              : item
          );

          set((state) => ({
            cart: updateCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.discountPrice,
          }));
        } else {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== product.id),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.discountPrice,
          }));
        }
      },
    }),
    {
      name: "cart-store",
      version: 1, // State version number,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // if the stored value is in version 0, we rename the field to the new name
          persistedState.totalProducts = persistedState.totalItems;
          delete persistedState.totalItems;
        }

        return persistedState as State & Actions;
      },
    }
  )
);
