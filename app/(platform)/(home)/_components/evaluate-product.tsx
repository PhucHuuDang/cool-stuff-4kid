"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Rating } from "react-simple-star-rating";

export const EvaluateProduct = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đánh giá sản phẩm</CardTitle>
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
        {/* <div
          style={{
            direction: "ltr",
            fontFamily: "sans-serif",
            touchAction: "none",
            display: "flex",
            alignItems: "center",
          }}
        > */}
        <Rating
          fillColorArray={[
            "#f14f45",
            "#f16c45",
            "#f18845",
            "#f1b345",
            "#f1d045",
          ]}
          style={{
            direction: "ltr",
            display: "flex",
          }}
          // onClick={function noRefCheck(){}}
          transition
        />
        {/* </div> */}
      </CardContent>
    </Card>
  );
};
