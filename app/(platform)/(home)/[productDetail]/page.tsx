"use client";

import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/db";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { CardCarousel } from "@/components/card-carousel";

const ProductDetailPage = ({
  params,
}: {
  params: { productDetail: string };
}) => {
  const { productDetail } = params;

  const [api, setApi] = useState<CarouselApi>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageProduct, setImageProduct] = useState<string>(
    carouselItems[0].url,
  );

  const MAX_LENGTH_DESCRIPTION = 150;

  const description = `
  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
  Doloremque quo, consectetur deleniti aliquam iste magnam. Sequi
  cupiditate placeat aspernatur quod sit minus, cumque quis quisquam
  quo natus id consequuntur laudantium. lorem, cumque quis quisquam
  quo natus id consequuntur laudantium. lorem,
  
  `;

  useEffect(
    function onListenEvent() {
      if (!api) return;

      // console.log(api.rootNode());

      api.on("pointerDown", (index) => {
        // console.log({ index });
      });
    },

    [api],
  );

  // console.log({ productDetail });

  return (
    <div className="2xl:max-w-screen pt-28">
      <div className="space-y-8 px-20 py-10">
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
                <h3>Thương hiệu: Herbs of Gold</h3>
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
                    <h1 className="text-2xl font-bold text-sky-400">
                      899.000₫
                    </h1>
                    <span className="text-lg text-rose-400">-10%</span>
                  </div>
                </Card>

                <del className="text-xl font-bold text-[#ed9080]">
                  1.200.000d
                </del>

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

                  <Button className="bg-rose-300 text-lg font-semibold text-white duration-200 hover:scale-105 hover:bg-rose-500">
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CardCarousel
          titleCard="Thường được mua cùng"
          carouselItems={carouselItems}
        />

        {/* <Card>
          <CardHeader>
            <CardTitle>Thường được mua cùng</CardTitle>
          </CardHeader>
          <CardContent className="rounded-lg p-5">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent>
                {carouselItems.map((product) => (
                  <CarouselItem
                    key={product.title}
                    className="md:basis-1/3 lg:basis-1/5"
                  >
                    <div
                      className="flex cursor-pointer flex-col justify-center gap-y-2 p-2 transition hover:scale-105"
                      onClick={() => console.log(product.title)}
                    >
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
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm tương tự</CardTitle>
          </CardHeader>
          <CardContent className="rounded-lg p-5">
            <Carousel
              opts={{
                align: "start",
                // direction: "rtl",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  // jump: true,
                  stopOnInteraction: false,
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

        <Card>
          {/* <CardHeader>
            <CardTitle>Miêu tả sản phẩm</CardTitle>

            <Collapsible>
              <CardDescription>
                {description.length > MAX_LENGTH_DESCRIPTION
                  ? description.slice(0, MAX_LENGTH_DESCRIPTION) + "..."
                  : description}
              </CardDescription>

              <CollapsibleTrigger asChild>
                <Button className="h-12 bg-sky-500">Xem thêm</Button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardDescription>{description}</CardDescription>
              </CollapsibleContent>
            </Collapsible>
          </CardHeader> */}
          <CardHeader>
            <CardTitle>Miêu tả sản phẩm</CardTitle>

            <Collapsible className="space-y-2">
              <CardDescription>
                {description.length > MAX_LENGTH_DESCRIPTION
                  ? isCollapsed
                    ? description
                    : description.slice(0, MAX_LENGTH_DESCRIPTION) + "..."
                  : description}
              </CardDescription>

              <CollapsibleContent>
                <div>{description}</div>
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <Button
                  className="h-12 bg-sky-500"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  {!isCollapsed ? "Xem thêm" : "Thu gọn"}
                  {/* Xem thêm */}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </CardHeader>
          <CardContent className="p-5"></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
