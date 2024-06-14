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

interface CardCarouselProps {
  titleCard: string;
  carouselItems: CarouselItem[];
  delay?: number;
  stopOnInteraction?: boolean;
  loop?: boolean;
}

interface CarouselItem {
  url: string;
  rating: number;
  title: string;
  price: number;
}

export const CardCarousel = ({
  titleCard = "Sản phẩm tương tự",
  carouselItems,
  delay = 3000,
  stopOnInteraction = false,
  loop = true,
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
                key={product.title}
                className="md:basis-1/3 lg:basis-1/5"
              >
                <div className="flex cursor-pointer flex-col justify-center gap-y-2 p-2 transition hover:scale-105">
                  <Image
                    src={product.url}
                    alt={product.title}
                    height={300}
                    className="rounded-lg"
                    width={300}
                  />

                  <div>
                    <h1 className="text-lg">{product.title}</h1>
                    <span>{product.rating}</span>
                    <h2 className="text-xl font-bold">{product.price}d</h2>
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
