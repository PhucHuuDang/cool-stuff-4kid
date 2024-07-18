"use client";

import { NavItem } from "@/components/nav-item";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { handleClickConfetti } from "@/confetti/handle-confetti-server";
import { useConfetti } from "@/confetti/use-confetti";
import { getDataInClient, postDataClient } from "@/get-data-actions/get-data";
import { ProductsInCategoryProps } from "@/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Sidebar = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["sidebar"],
    queryFn: () => getDataInClient("/Category/GetProductInCategory"),
  });

  const [data, setData] = useState();

 

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code") === "00") {
      // confetti();
      handleClickConfetti();
    }
    if (searchParams.get("id")) {
      console.log(searchParams.get("id"));
      const res = async () => {
        const data = await postDataClient("/Payment/confirm-payment", {
          transactionId: searchParams.get("id"),
        });

        toast.success("Bạn đã thanh toán thành công");

        console.log({ data });

        setData(data);
      };
      res();
    }
  }, []);


  return (
    <div className="w-64">
      <div className="fixed z-50 h-full w-64 rounded-lg bg-slate-500/10 2xl:h-screen">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <NavItem.Skeleton key={index} />
            ))
          : products.map((category: ProductsInCategoryProps) => (
              <HoverCard
                openDelay={0}
                closeDelay={100}
                key={category.categoryId}
              >
                <NavItem
                  key={category.categoryId}
                  label={category.categoryName}
                  childNode={category.product}
                />
              </HoverCard>
            ))}
        {/* {products.map((category: ProductsInCategoryProps) => (
          <HoverCard openDelay={0} closeDelay={100} key={category.categoryId}>
            <NavItem
              key={category.categoryId}
              label={category.categoryName}
              childNode={category.product}
            />
          </HoverCard>
        ))} */}
        {/* {renderNavItems(NAV_ITEMS)} */}
      </div>
    </div>
  );
};

export default Sidebar;
