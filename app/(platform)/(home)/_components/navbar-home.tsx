"use client";

import { FormInput } from "@/components/form/form-input";
import { SearchIcon } from "@/components/search-icon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/hooks/use-cart-store";
import { useDrawerCart } from "@/hooks/use-drawer-cart";
import useFromStore from "@/store/use-from-store";
import { ShoppingCart } from "lucide-react";
import { Logo } from "./logo";

const NavbarHome = () => {
  const drawerCart = useDrawerCart();
  const cart = useFromStore(useCartStore, (state) => state.cart);

  return (
    <div className="fixed top-0 z-40 flex h-14 w-full items-center justify-between px-8 pt-8">
      <div className="flex w-full items-center justify-between gap-x-10 rounded-xl bg-gradient-to-r from-white to-slate-200 p-2 shadow-lg duration-200 hover:shadow-xl">
        {/* Mobile side bar */}
        <Logo height={150} width={150} className="md:text-lg" />

        {/* <h1 className="font-xl font-bold">Children Stuff</h1> */}

        <div className="w-1/3">
          <FormInput
            // icon={Search as IconType}
            searchIcon={<SearchIcon fillColor="#a8b3cf" />}
            placeholder="Search posts"
            id="search"
            className="rounded-xl border-[1px] border-slate-600 p-5 text-slate-400 caret-sky-600 focus:ring-0 focus:ring-slate-300 focus:ring-opacity-50 focus:ring-offset-0 focus:ring-offset-slate-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {}}
            variant="default"
            className="h-10 rounded-xl border border-slate-300 px-7 font-semibold"
          >
            New Post
          </Button>

          <div
            onClick={drawerCart.onOpen}
            className="group relative rounded-xl bg-slate-700 p-3 transition hover:cursor-pointer hover:bg-slate-600"
          >
            <ShoppingCart className="text-slate-400 group-hover:text-slate-100" />
            <div className="absolute left-7 top-6 h-6 w-6 rounded-full text-center text-sm text-white">
              {cart?.length}
            </div>
          </div>

          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
