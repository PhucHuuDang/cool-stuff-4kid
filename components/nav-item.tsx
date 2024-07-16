"use client";

import { ArrowRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "./ui/skeleton";
import { FilterProductProps } from "@/interface";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { handleRouter } from "@/lib/handle-router";

interface NavProps {
  label: string;
  href?: string;
  childNode?: FilterProductProps[];
}

export const NavItem = ({ label, href, childNode }: NavProps) => {
  const router = useRouter();

  // const handleRoute = (title: string, id: string) => {
  //   const titleTransformed = remove
  // };

  return (
    <>
      <HoverCardTrigger asChild>
        <div className="group/nav flex h-10 cursor-pointer items-center justify-between px-4 transition duration-200 hover:rounded-sm hover:bg-slate-500/10">
          {label}{" "}
          <ArrowRight className="text-slate-400 duration-300 group-hover/nav:scale-x-150" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="z-50 w-[500px] *:flex *:items-center"
      >
        <h1 className="my-4 text-lg font-bold">{label}</h1>
        {childNode?.map((product) => (
          <>
            <div
              className="h-10 cursor-pointer rounded-lg p-2 pl-4 font-semibold duration-200 hover:bg-slate-200 hover:text-slate-800 hover:shadow-lg"
              key={product.productId}
              onClick={() =>
                handleRouter(product.productName, product.productId, router)
              }
            >
              {product.productName}
            </div>
            <Separator className="h-1" />
          </>
        ))}
      </HoverCardContent>
    </>
  );
};

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="my-4 flex h-10 cursor-pointer items-center justify-between rounded-sm px-4 *:bg-slate-500/20">
      <Skeleton className="h-10 w-36 rounded-lg" />
      <Skeleton className="size-10" />
    </div>
  );
};
