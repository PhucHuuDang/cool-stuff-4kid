"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/handle-transform/formatCurrency";

interface VoucherCarouselProps {
  titleCard: string;
  voucherItems: CarouselItemProps[];
  delay?: number;
  stopOnInteraction?: boolean;
  loop?: boolean;
  classNameCarouselItem?: string;
}

interface CarouselItemProps {
  price: number;
  condition: string;
  additionalInfo: string;
  product: string;
}

export const VoucherCarousel = ({
  titleCard = "Sản phẩm tương tự",
  voucherItems,
  delay = 3000,
  stopOnInteraction = false,
  loop = true,
  classNameCarouselItem,
}: VoucherCarouselProps) => {
  return (
    <Card className="my-4">
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
            {voucherItems.map((voucher) => {
              return (
                <CarouselItem
                  key={voucher.product}
                  className={cn(
                    "md:basis-1/2 lg:basis-1/3 2xl:basis-1/4",
                    classNameCarouselItem,
                  )}
                >
                  <div className="flex h-36 cursor-pointer items-center justify-center gap-x-1 rounded-lg border border-green-600 bg-green-500/5 p-2 duration-200 hover:bg-green-500/10">
                    {/* <div className="flex gap-x-1"> */}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-bold text-[#ff6347]">
                        {formatCurrency(voucher.price)}
                      </h2>
                      <p className="w-40 text-wrap text-sm font-semibold">
                        {voucher.condition}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-semibold text-slate-600">
                        {voucher.product}
                      </h4>
                      <p className="text-sm font-semibold">
                        {voucher.additionalInfo}
                      </p>
                    </div>
                    {/* </div> */}
                  </div>

                  <CardFooter className="flex justify-end p-1 px-4">
                    <Button variant="book">Lấy mã</Button>
                  </CardFooter>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-8 transition hover:-translate-x-1 hover:scale-110" />
          <CarouselNext className="mr-8 transition hover:translate-x-1 hover:scale-110" />
        </Carousel>
      </CardContent>
    </Card>
  );
};
