"use client";

import Autoplay from "embla-carousel-autoplay";

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

interface CardCarouselProps {
  titleCard: string;
  carouselItems: CardCarouselPropsPicked[];
  delay?: number;
  stopOnInteraction?: boolean;
  loop?: boolean;
  classNameCarouselItem?: string;
}

// interface CarouselItemProps {
//   url: string;
//   rating: number;
//   title: string;
//   price: number;
// }

export const CardCarousel = ({
  titleCard = "Sản phẩm tương tự",
  carouselItems,
  delay = 3000,
  stopOnInteraction = false,
  loop = true,
  classNameCarouselItem,
}: CardCarouselProps) => {
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
            }),
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
                    <h2 className="text-xl font-bold">
                      {formatCurrency(
                        product.discountPercent > 0
                          ? product.discountPercent
                          : product.price,
                      )}
                    </h2>
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
