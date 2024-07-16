"use client";

import { NavItem } from "@/components/nav-item";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { getDataInClient } from "@/get-data-actions/get-data";
import { ProductsInCategoryProps } from "@/interface";
import { useQuery } from "@tanstack/react-query";

const NAV_ITEMS = [
  {
    label: "Milk",
    href: "/milk",
    children: [
      {
        label: "Vina Milk",
        href: "/milk",
      },
      {
        label: "Japan Milk",
        href: "/milk",
      },
    ],
  },
  {
    label: "Cheese",
    href: "/cheese",
    children: [
      {
        label: "Cheese 1",
        href: "/cheese",
      },
      {
        label: "Cheese 2",
        href: "/cheese",
      },
    ],
  },
  {
    label: "Toys",
    href: "/toys",
    children: [
      {
        label: "Toys 1",
        href: "/toys",
      },
      {
        label: "Toys 2",
        href: "/toys",
      },
    ],
  },
];

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

  console.log({ products });
  console.log({ isLoading });
  console.log({ isFetching });

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
