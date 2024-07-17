"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizontal } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useFormStatus } from "react-dom";
import { IconType } from "react-icons";
import { Rating } from "react-simple-star-rating";
import { useEventListener } from "usehooks-ts";
import { ReviewDialog } from "../[...productDetail]/_components/review-dialog";
import { ProductDetailProps } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import { findUserPaidOrders } from "@/get-data-actions/get-data";
import { PaymentDetailByUserID } from "@/types/payment-detail";

interface ReviewProps {
  productDetail: ProductDetailProps;
  information: any;
}

export const Review = ({ productDetail, information }: ReviewProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const { pending } = useFormStatus();

  const onSubmit = (formData: FormData) => {
    const question = formData.get("question") as string;

    console.log({ question });
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["review"],
    queryFn: () => findUserPaidOrders(`/Payment/Payment/${information.nameid}`),
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit();
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  const userBoughtProduct = data?.flatMap((payment: PaymentDetailByUserID) =>
    payment.order.orderDetails.map((detail) => detail.productId),
  );

  console.log({ userBoughtProduct });

  const hasUserBoughtProduct = userBoughtProduct?.includes(
    productDetail.productId,
  );

  console.log({ hasUserBoughtProduct });

  const tooltipArray = [
    "Rất tệ 🙁",
    "Tệ 😐",
    "Tạm được 👍",
    "Tốt 🙂",
    "Rất tốt 👏",
  ];

  useEventListener("keydown", handleKeydown);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hỏi đáp & Đánh giá sản phẩm</CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        {/* {information.nameid === } */}
        {hasUserBoughtProduct && <ReviewDialog productDetail={productDetail} />}

        <div className="my-4 flex gap-x-2">
          <Avatar className="size-12">
            <AvatarImage className="" src="/images/tiny-home.webp" />
            <AvatarFallback />
          </Avatar>

          <div className="flex w-auto flex-col gap-x-2">
            <h2 className="text-lg font-bold">Harry Dang</h2>
            <Card>
              <CardContent className="rounded-lg bg-slate-400/50 p-2 text-black">
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
