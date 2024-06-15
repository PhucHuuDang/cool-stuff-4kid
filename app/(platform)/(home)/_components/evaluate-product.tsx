"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <h2 className="text-lg font-bold">Harry Dang</h2>
            <div className="flex items-center gap-x-1">
              <div>5 sao</div>
              <div className="text-slate-400">15/09/2024</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
