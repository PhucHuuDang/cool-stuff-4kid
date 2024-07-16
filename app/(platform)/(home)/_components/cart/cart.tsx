"use client";

import { Product, ProductApiProps } from "@/interface";
import { CardProduct, CardProductSkeleton } from "../card-product";
import useFromStore from "@/store/use-from-store";
import { useCartStore } from "@/hooks/use-cart-store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData, infiniteData } from "@/get-data-actions/get-data";
import { useCallback, useMemo, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import { Loading } from "../loading";
import { FailedToFetch } from "../fail-to-fetch";

interface CartProps {
  // products: Product[];
  products: ProductApiProps[];
}

export const Cart: React.FC<CartProps> = ({ products }) => {
  const MAX_LENGTH_PAGE_PRODUCT = 10;
  const observer = useRef<IntersectionObserver>();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    isRefetching,
    error,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }: any) => {
      // ?? pay attention to this, pageParam not pageParams, misspelled will return undefined value
      // console.log({ pageParam });
      return infiniteData(
        `/Product?Page=${pageParam}&Limit=${MAX_LENGTH_PAGE_PRODUCT}`,
      );
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => {
      // console.log({ lastPageParam });
      // console.log({ allPagesParams });

      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  // console.log(data?.pageParams);

  const productsData = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    });
  }, [data]);

  if (isLoading) return <Loading />;

  // console.log({ isFetching });

  if (error) return <FailedToFetch route="Home page route (cart)" />;

  return (
    <>
      {productsData &&
        productsData.map((item: ProductApiProps) => (
          <CardProduct
            key={item.productId}
            product={item}
            ref={lastElementRef}
          />
        ))}

      {isFetching && (
        <>
          <CardProductSkeleton />
          <CardProductSkeleton />
        </>
      )}

      {isFetching && (
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            <LoaderCircle className="size-5 animate-spin" />
            <p className="mt-4 text-lg font-bold">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};
