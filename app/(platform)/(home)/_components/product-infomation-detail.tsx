"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductInformationDetailProps {
  carouselItems: CarouselItem[];
}

interface CarouselItem {
  url: string;
  rating: number;
  title: string;
  price: number;
}

export const ProductInformationDetail = ({
  carouselItems,
}: ProductInformationDetailProps) => {
  const [api, setApi] = useState<CarouselApi>();

  const [imageProduct, setImageProduct] = useState<string>(
    carouselItems[0].url,
  );

  useEffect(
    function setApiCarousel() {
      if (!api) return;

      api.on("select", (event) => {
        // todo: do something in here
      });
    },
    [api],
  );

  return (
    <Card className="rounded-lg p-5">
      <CardContent>
        <div className="flex gap-5">
          <div className="flex flex-col items-center gap-y-2">
            <Image
              src={imageProduct}
              alt="main image"
              className="rounded-lg"
              height={600}
              width={600}
            />

            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-2xl"
              setApi={setApi}
            >
              <CarouselContent className="ml-1 h-20 w-full p-1">
                {carouselItems.map((product) => (
                  <CarouselItem
                    key={product.title}
                    className="ml-1 flex h-full cursor-pointer items-center justify-center rounded-lg md:basis-1/2 lg:basis-1/4"
                    style={{
                      backgroundImage: `url(${product.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => setImageProduct(product.url)}
                  />
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg">
              Thương hiệu:{" "}
              <span className="text-xl font-bold">Herbs of Gold</span>
            </h3>
            <h1 className="text-3xl font-bold">
              Thực phẩm bảo vệ sức khoẻ Herbs of Gold Herbs of Gold
              Breastfeeding Support
            </h1>

            <div className="flex items-center gap-3">
              <div>5.0</div>
              {/* //Todo: stars in here */}
              <span>|</span>
              <div>10 đánh giá</div>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-x-4">
                <h1 className="text-2xl font-bold text-sky-400">899.000₫</h1>
                <span className="text-lg text-rose-400">-10%</span>
              </div>
            </Card>

            <del className="text-xl font-bold text-[#ed9080]">1.200.000d</del>

            <div className="flex items-center gap-x-10">
              <span className="text-lg font-semibold text-slate-600">
                So luong
              </span>

              <div className="flex items-center gap-x-4 *:cursor-pointer">
                <Minus className="size-6" />
                <span>1</span>
                <Plus className="size-6" />
              </div>
            </div>

            <div className="flex items-center gap-x-4 *:h-12 *:w-full *:transition">
              <Button className="bg-sky-400 text-lg font-semibold duration-200 hover:scale-105 hover:bg-sky-600">
                Add to card
              </Button>

              <Button className="bg-pink-400 text-lg font-semibold text-white duration-200 hover:scale-105 hover:bg-pink-700/80">
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
