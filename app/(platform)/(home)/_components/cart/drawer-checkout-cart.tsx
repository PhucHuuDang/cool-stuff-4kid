"use client";

import { Drawer } from "vaul";

import { useDrawerCart } from "@/hooks/use-drawer-cart";
import { CartItem } from "./cart-item";
import useFromStore from "@/store/use-from-store";
import { useCartStore } from "@/hooks/use-cart-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const DrawerCheckoutCart = () => {
  const drawerCart = useDrawerCart();

  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc + product.discountPrice * (product.quantity as number),
      0
    );
  }

  const cartCondition = cart?.length! >= 1;

  const onOpenChange = (e: boolean) => !e && drawerCart.onClose();

  //? when we use space-y-4 the children will be affected

  return (
    <Drawer.Root
      direction="right"
      open={drawerCart.isOpen}
      onOpenChange={(e) => onOpenChange(e)}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] 2xl:w-[600px] mt-24 fixed bottom-0 right-0 z-20 overflow-y-auto overflow-x-hidden">
          <div className="p-4 bg-slate-300/10 flex-1 h-full border-0 border-s-transparent ">
            <Drawer.Close asChild>
              <div className=" mt-4 h-[100px] w-2 rounded-full bg-sky-600/40 transform rotate-180 absolute top-[40%] left-0 hover:bg-sky-700/50 cursor-pointer duration-200" />
            </Drawer.Close>
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4 text-lg">
                Your cart
              </Drawer.Title>
              {cartCondition ? (
                <Drawer.Description className="text-zinc-600 mb-2">
                  Thanks for your interest in our products! 🎉
                </Drawer.Description>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <ShoppingCart className="h-16 w-16 text-sky-400 " />

                    <div className="my-4">
                      Look like your cart is empty. Start shopping now!
                    </div>
                  </div>

                  <Drawer.Close asChild>
                    <div className="hover:underline text-slate-400 animate-bounce hover:text-slate-600 cursor-pointer duration-70000 text-center">
                      Continue shopping
                    </div>
                  </Drawer.Close>
                </>
              )}
              <ul className="space-y-5">
                {cart?.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ul>
            </div>
            <Separator className="my-6" />
            {cartCondition && (
              <div className="my-5">
                <div className="flex item-center gap-1">
                  <p className="text-lg text-zinc-600">Total:</p>
                  <p className="text-lg text-sky-500">{total.toFixed(2)}đ</p>
                </div>
              </div>
            )}
          </div>

          {cartCondition && (
            <div className="my-6 flex flex-col items-center gap-y-5">
              <Button
                onClick={() => console.log("payment")}
                variant="book"
                className="w-full text-base hover:text-lg hover:scale-105 transition duration-300"
              >
                Checkout
              </Button>

              <Drawer.Close asChild>
                <div className="hover:underline text-slate-400 hover:text-slate-600 cursor-pointer duration-200 text-center">
                  Continue shopping
                </div>
              </Drawer.Close>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
