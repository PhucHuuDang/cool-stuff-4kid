"use client";

import { createReviewProduct } from "@/actions/review";
import { FormError } from "@/components/form/form-error";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { useAction } from "@/hooks/use-action";
import { ProductDetailProps } from "@/interface";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { IconType } from "react-icons";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

interface ReviewDialogProps {
  productDetail: ProductDetailProps;
}

export const ReviewDialog = ({ productDetail }: ReviewDialogProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const { pending } = useFormStatus();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [rating, setRating] = useState<number | undefined>();

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  const { execute, error, fieldErrors, isLoading } = useAction(
    createReviewProduct,
    {
      onSuccess(data) {
        toast.success("Cảm ơn bạn đã đánh giá");
        setIsOpen(false);
        console.log({ data });
      },

      onError(error) {
        toast.error(error);
        console.log({ error });
      },
    },
  );

  const MAX_LENGTH = 50;

  const onSubmit = (formData: FormData) => {
    const commentDetail = formData.get("commentDetail") as string;
    // const rating = formData.get("rating") as string;

    console.log({ commentDetail, rating });

    execute({
      productId: Number(productDetail.productId),
      commentDetail,
      rating,
      productName: productDetail.productName,
    });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit();
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  const formatPrice = formatCurrency(
    productDetail.discountPrice > 0
      ? productDetail.discountPrice
      : productDetail.price,
  );

  const tooltipArray = [
    "Rất tệ 🙁",
    "Tệ 😐",
    "Tạm được 👍",
    "Tốt 🙂",
    "Rất tốt 👏",
  ];

  useEventListener("keydown", handleKeydown);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="book" className="w-32">
          Đánh giá ngay
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-x-4">
          <div className="relative aspect-square size-14 overflow-hidden rounded-xl">
            {/* <GlareCard className="flex flex-col items-center justify-center"> */}
            <Image
              fill
              src={productDetail.image}
              alt={`product-${productDetail.productName}`}
              className="size-full object-cover transition group-hover:scale-110"
              // className="absolute size-full object-cover transition group-hover:scale-110"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              {productDetail.productName.length > MAX_LENGTH
                ? productDetail.productName.slice(0, MAX_LENGTH) + "..."
                : productDetail.productName}
            </h1>

            <div className="text-lg font-bold text-[#ff6437]">
              {formatPrice}
            </div>
            {/* <div>SKU: 123456789</div> */}
          </div>
        </div>

        <form action={onSubmit} ref={formRef} className="my-2">
          <FormInput
            placeholder="Đánh giá của bạn về sản phẩm"
            disabled={pending}
            className="mb-4 h-12"
            ref={inputRef}
            id="commentDetail"
            icon={SendHorizontal as IconType}
            // iconClassName="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          />

          <FormError id="commentDetail" errors={fieldErrors} />

          <div className="flex items-center gap-x-1">
            <h2 className="text-lg font-semibold">Chất lượng sản phẩm</h2>
            <Rating
              fillColorArray={[
                "#f14f45",
                "#f16c45",
                "#f18845",
                "#f1b345",
                "#f1d045",
              ]}
              allowFraction={false}
              onClick={handleRating}
              showTooltip
              transition
              tooltipArray={tooltipArray}
              emptyStyle={{ display: "flex" }}
              SVGstyle={{
                display: "inline-block",
                marginBottom: 10,
                // height: "40px",
                // size
              }}
              disableFillHover={pending}
              id="rating"
              name="rating"
              tooltipDefaultText="Chọn đánh giá"
              tooltipStyle={{
                backgroundColor: "#338eb8",
                width: "150px",
                marginTop: 8,
              }}
              size={25}
            />
          </div>
          <DialogFooter className="my-2">
            <FormSubmit disabled={pending}>Hoàn thành</FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
