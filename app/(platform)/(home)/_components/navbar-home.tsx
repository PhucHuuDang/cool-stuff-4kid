"use client";

import { FormInput } from "@/components/form/form-input";
import { SearchIcon } from "@/components/search-icon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

const NavbarHome = () => {
  return (
    <div className="fixed top-0 h-14 pt-8 w-full px-8 flex items-center justify-between">
      <div className="flex items-center justify-between gap-x-10 w-full p-2 bg-gradient-to-r from-slate-300 to-slate-500 rounded-xl">
        {/* Mobile side bar */}
        {/* <Logo height={30} width={30} className="md:text-lg" /> */}

        <h1 className="font-xl font-bold">Children Stuff</h1>
        <div className="w-1/3">
          <FormInput
            // icon={Search as IconType}
            searchIcon={<SearchIcon fillColor="#a8b3cf" />}
            placeholder="Search posts"
            id="search"
            className="p-5 border-[1px] border-slate-600 text-slate-400 rounded-xl caret-sky-600 focus:ring-0 focus:ring-offset-0 focus:ring-offset-slate-400 focus:ring-slate-300 focus:ring-opacity-50"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {}}
            variant="default"
            className="h-10 font-semibold px-7 rounded-xl border border-slate-300"
          >
            New Post
          </Button>

          <div className="group bg-slate-700 rounded-xl hover:cursor-pointer p-3 hover:bg-slate-600 transition">
            <ShoppingCart className=" text-slate-400 group-hover:text-slate-100" />
          </div>

          <Skeleton className="rounded-full h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
