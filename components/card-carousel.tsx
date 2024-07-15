"use client";

import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardCarouselPropsPicked } from "@/interface";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { handleRouter } from "@/lib/handle-router";
import { useRouter } from "next/navigation";

interface CardCarouselProps {
  titleCard: string;
  carouselItems: CardCarouselPropsPicked[];
  delay?: number;
  stopOnInteraction?: boolean;
  loop?: boolean;
  classNameCarouselItem?: string;
}

export const CardCarousel = ({
  titleCard = "Sản phẩm tương tự",
  carouselItems,
  delay = 3000,
  stopOnInteraction = false,
  loop = true,
  classNameCarouselItem,
}: CardCarouselProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleCard}</CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        <Carousel
          opts={{
            align: "start",
            loop: loop,
          }}
          plugins={[
            Autoplay({
              delay: delay,
              stopOnInteraction: stopOnInteraction,
            }) as any,
          ]}
        >
          <CarouselContent>
            {carouselItems.map((product) => (
              <CarouselItem
                key={product.productId}
                className={cn(
                  "md:basis-1/3 lg:basis-1/5",
                  classNameCarouselItem,
                )}
                onClick={() =>
                  handleRouter(product.productName, product.productId, router)
                }
              >
                <div className="flex cursor-pointer flex-col justify-center gap-y-2 p-2 transition hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.productName}
                    height={300}
                    className="rounded-lg"
                    width={300}
                  />

                  <div>
                    <h1 className="truncate text-lg">{product.productName}</h1>
                    <span>{product.discountPercent}</span>
                    {/* <h2 className="text-xl font-bold">
                      {formatCurrency(
                        product.discountPercent > 0
                          ? product.discountPercent
                          : product.price,
                      )}
                    </h2> */}
                    <div className="text-md mt-3 flex flex-row items-center gap-1">
                      {product.discountPercent &&
                      product.discountPercent > 0 ? (
                        <>
                          <div className="flex flex-row items-center gap-2">
                            <del className="font-light text-[#ed9080]">
                              {/* {formattedPrice(data?.originalPrice as number)} */}
                              {formatCurrency(product.price)}
                            </del>{" "}
                          </div>

                          <h1 className="text-xl font-semibold text-neutral-500">
                            |
                          </h1>

                          <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-[#ff6347]">
                              {formatCurrency(product.discountPrice)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-row items-center gap-2">
                          <div className="font-bold text-[#ff6347]">
                            {/* {formattedPrice(data?.originalPrice as number)} */}
                            {formatCurrency(product.price)}
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="transition hover:-translate-x-1 hover:scale-110" />
          <CarouselNext className="transition hover:translate-x-1 hover:scale-110" />
        </Carousel>
      </CardContent>
    </Card>
  );
};
