"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DotButton,
  useDotButton,
} from "@/app/(platform)/(home)/_components/embla-carousel-dot-button";

interface CardCarouselProps {
  titleCard: string;
  carouselItems: CarouselItemProps[];
  delay?: number;
  stopOnInteraction?: boolean;
  loop?: boolean;
  classNameCarouselItem?: string;
}

interface CarouselItemProps {
  url: string;
  onClick?: () => void;
}

export const CardCarouselHome = ({
  titleCard = "Sản phẩm tương tự",
  carouselItems,
  delay = 3000,
  stopOnInteraction = false,
  loop = true,
  classNameCarouselItem,
}: CardCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(api);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleCard}</CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: loop,
            containScroll: false,
          }}
          plugins={[
            Autoplay({
              delay: delay,
              stopOnInteraction: stopOnInteraction,
            }),
            Fade(),
          ]}
        >
          <CarouselContent>
            {carouselItems.map((product) => (
              <CarouselItem
                key={product.url}
                className={cn(classNameCarouselItem)}
              >
                <div className="relative flex cursor-pointer flex-col justify-center p-2 transition">
                  <Image
                    src={product.url}
                    alt={`image-${product.url}`}
                    height={0}
                    className="h-full w-full rounded-lg"
                    width={1000}
                  />

                  <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-x-4">
                    {scrollSnaps.map((_, index) => {
                      return (
                        <DotButton
                          key={index}
                          onClick={() => onDotButtonClick(index)}
                          className={`flex size-6 flex-row items-center justify-center rounded-full border ${index === selectedIndex ? "bg-sky-500" : ""} `}
                        >
                          <input
                            type="radio"
                            className="mx-2 rounded-full accent-green-700"
                            checked={index === selectedIndex}
                          />
                        </DotButton>
                      );
                    })}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="transition hover:-translate-x-1 hover:scale-110" /> */}
          {/* <CarouselNext className="transition hover:translate-x-1 hover:scale-110" /> */}
        </Carousel>
      </CardContent>

      {/* <Button onClick={() => api?.scrollPrev()}>Click</Button> */}
    </Card>
  );
};
