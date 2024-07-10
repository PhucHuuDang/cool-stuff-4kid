"use client";

import { Drawer } from "vaul";

import { useDrawerCart } from "@/hooks/use-drawer-cart";
import { CartItem } from "./cart-item";
import useFromStore from "@/store/use-from-store";
import { useCartStore } from "@/hooks/use-cart-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreditCard, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useLoginModal } from "@/hooks/use-login-modal";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { useRouter } from "next/navigation";

export const DrawerCheckoutCart = () => {
  const drawerCart = useDrawerCart();
  const openLoginModal = useLoginModal((state) => state.onOpen);

  const cart = useFromStore(useCartStore, (state) => state.cart);
  const router = useRouter();

  let total = 0;

  // console.log({ cart });

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc +
        (product.discountPercent > 0
          ? product.discountPrice * (product.quantityOrder as number)
          : product.price * (product.quantityOrder as number)),
      0,
    );
  }

  // console.log({ cart });

  const cartCondition = cart?.length! >= 1;

  const onOpenChange = (e: boolean) => !e && drawerCart.onClose();

  const handleCheckout = async () => {
    const isLogin = await checkAuthenticate();

    if (isLogin) {
      console.log("payment");
      drawerCart.onClose();
      router.push("/checkout");
      return;
    }

    openLoginModal();
  };

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
        <Drawer.Content className="fixed bottom-0 right-0 z-40 mt-24 flex h-full w-[550px] flex-col overflow-y-auto overflow-x-hidden rounded-t-[10px] bg-white 2xl:w-[600px]">
          <div className="h-full flex-1 border-0 border-s-transparent bg-slate-300/10 p-4">
            <Drawer.Close asChild>
              <div className="absolute left-0 top-[40%] mt-4 h-[100px] w-2 rotate-180 transform cursor-pointer rounded-full bg-sky-600/40 duration-200 hover:bg-sky-700/50" />
            </Drawer.Close>
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 text-lg font-medium">
                Your cart
              </Drawer.Title>
              {cartCondition ? (
                <Drawer.Description className="mb-2 text-zinc-600">
                  Thanks for your interest in our products! 🎉
                </Drawer.Description>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <ShoppingCart className="h-16 w-16 text-sky-400" />

                    <div className="my-4">
                      Look like your cart is empty. Start shopping now!
                    </div>
                  </div>

                  <Drawer.Close asChild>
                    <div className="duration-70000 animate-bounce cursor-pointer text-center text-slate-400 hover:text-slate-600 hover:underline">
                      Continue shopping
                    </div>
                  </Drawer.Close>
                </>
              )}
              <ul className="space-y-5">
                {cart?.map((product) => (
                  <CartItem key={product.productId} product={product} />
                ))}
              </ul>
            </div>
            <Separator className="my-6" />
            {cartCondition && (
              <div className="my-5">
                <div className="item-center flex gap-1">
                  <p className="text-lg font-bold text-zinc-600">Tạm tính:</p>
                  <p className="text-lg font-bold text-[#ff6347]">
                    {formatCurrency(total)}
                    {/* {total} */}
                  </p>
                </div>
              </div>
            )}
          </div>

          {cartCondition && (
            <div className="my-6 flex flex-col items-center gap-y-5">
              <Button
                onClick={handleCheckout}
                variant="book"
                className="w-full gap-x-1 text-base transition duration-300 hover:scale-105 hover:text-lg"
              >
                <CreditCard className="h-6 w-6" /> Checkout
              </Button>

              <Drawer.Close asChild>
                <div className="cursor-pointer text-center text-slate-400 duration-200 hover:text-slate-600 hover:underline">
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
