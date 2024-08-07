"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Rating } from "react-simple-star-rating";

export const EvaluateProduct = () => {
  const handleRating = (rating: number) => {
    console.log({ rating });
  };

  const tooltipArray = [
    "Rất tệ 🙁",
    "Tệ 😐",
    "Tạm được 👍",
    "Tốt 🙂",
    "Rất tốt 👏",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm được đánh giá</CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        <div className="flex gap-x-2">
          <Avatar className="size-12">
            <AvatarImage className="" src="/images/tiny-home.webp" />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col gap-x-2">
            <h2 className="text-lg font-bold">Harry Dang.</h2>
            <div className="flex items-center gap-x-1">
              {/* <div>5 sao</div> */}

              <div className="text-slate-400">15/09/2024</div>
            </div>
          </div>
        </div>
        <Rating
          fillColorArray={[
            "#f14f45",
            "#f16c45",
            "#f18845",
            "#f1b345",
            "#f1d045",
          ]}
          allowFraction={false}
          readonly
          onClick={handleRating}
          transition
          showTooltip
          tooltipArray={tooltipArray}
          emptyStyle={{ display: "flex" }}
          SVGstyle={{ display: "inline-block", marginBottom: 10 }}
          style={{ marginBottom: -10 }}
          id="rating"
        />
      </CardContent>
    </Card>
  );
};
