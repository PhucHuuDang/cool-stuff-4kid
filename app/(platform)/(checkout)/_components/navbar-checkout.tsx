"use client";

import { FormInput } from "@/components/form/form-input";
import { SearchIcon } from "@/components/search-icon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/hooks/use-cart-store";
import { useDrawerCart } from "@/hooks/use-drawer-cart";
import useFromStore from "@/store/use-from-store";
import { Facebook, Instagram, LogOut, ShoppingCart } from "lucide-react";
import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { deleteCookie } from "@/store/actions";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Logo } from "../../(home)/_components/logo";

interface NavbarHomeProps {
  isAuthenticate: boolean;
}

export const NavbarCheckout = () => {
  const drawerCart = useDrawerCart();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const { onOpen: openLoginModal } = loginModal;
  const { onOpen: openRegisterModal } = registerModal;

  const handleLogout = () => {
    deleteCookie();
    toast.success("Logout successfully!");
    router.refresh();
  };

  return (
    <div className="fixed top-0 z-40 flex h-8 w-full items-center justify-between">
      <div className="flex w-full items-center justify-between gap-x-10 rounded-xl bg-gradient-to-r from-white to-slate-200 p-2 px-10 shadow-lg duration-200 hover:shadow-xl">
        {/* Mobile side bar */}
        {/* <Logo height={100} width={100} className="md:text-lg" /> */}

        <div className="flex items-center gap-x-2">
          <span>Connect</span>
          <div className="flex items-center gap-x-1">
            <Facebook className="size-6 text-slate-500" />
            <Instagram className="size-6 text-slate-500" />
          </div>
        </div>

        {/* <h1 className="font-xl font-bold">Children Stuff</h1> */}

        <div className="flex items-center gap-4">
          {/* <Button
            onClick={() => {}}
            variant="default"
            className="h-10 rounded-xl border border-slate-300 px-7 font-semibold"
          >
            New Post
          </Button> */}

          {/* <div
            onClick={drawerCart.onOpen}
            className="group relative rounded-xl bg-slate-700 p-3 transition hover:cursor-pointer hover:bg-slate-600"
          >
            <ShoppingCart className="text-slate-400 group-hover:text-slate-100" />
            <div className="absolute left-7 top-6 h-6 w-6 rounded-full text-center text-sm text-white">
              {cart?.length}
            </div>
          </div> */}

          {/* {isAuthenticate ? ( */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-x-2">
              <Skeleton className="size-5 cursor-pointer rounded-full bg-slate-500" />
              <div>dang huu phuc</div>
              {/* 123asdasdasdasd */}
            </PopoverTrigger>
            <PopoverContent className="flex w-80 flex-col gap-y-2">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-[2px] text-slate-600 duration-200 hover:border-slate-800 hover:text-slate-950"
              >
                <LogOut className="mr-1" />
                Log out
              </Button>
              <Button
                variant="outline"
                className="border-[2px] text-slate-600 duration-200 hover:border-slate-800 hover:text-slate-950"
              >
                <LogOut className="mr-1" />
                Profile
              </Button>
            </PopoverContent>
          </Popover>
          {/* ) : (
            <div className="flex items-center gap-x-2">
              <Button
                variant="book"
                className="h-10 rounded-xl"
                onClick={openLoginModal}
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={openRegisterModal}
                className="border duration-200 hover:border-slate-800 hover:text-slate-900"
              >
                Register
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
