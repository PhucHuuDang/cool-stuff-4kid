"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/hooks/use-cart-store";
import useFromStore from "@/store/use-from-store";
import { CreditCard, MapPin } from "lucide-react";
import Image from "next/image";
import { ProductCheckout } from "./_checkout-infor-components/product-checkout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { PaymentMethodOnline } from "./_checkout-infor-components/payments-online";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ElementRef, useRef, useState } from "react";
import { AddressReceiveOrder } from "./_checkout-infor-components/address-receive-order";
import { CreditCardContent } from "./_tabscontent-checkout/credit-card-content";
import { PaymentUponReceive } from "./_tabscontent-checkout/payment-upon-receive";
import { toast } from "sonner";
import {
  UserInformationDetail,
  UserInformationDetailProps,
  Vouchers,
} from "@/interface";
import { FormSubmit } from "@/components/form/form-submit";

import { useQuery } from "@tanstack/react-query";
import { getDataInClient } from "@/get-data-actions/get-data";
import {
  formatDateFns,
  vietnameseDate,
} from "@/handle-transform/format-date-fns";
import { useAddress } from "@/hooks/use-address";
import { useRouter } from "next/navigation";
import { calculateDiscountedPrice } from "@/handle-transform/handle-discount";
import { ConfettiFireworks } from "@/confetti/confetti";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { ConfirmDialog } from "./confirm-dialog";
import { useAction } from "@/hooks/use-action";
import { handlePaymentAction } from "@/actions/payment";
import { useFormStatus } from "react-dom";

const tabsProps = [
  {
    value: "payment-upon-receipt",
    label: "Thanh toán khi nhận hàng",
  },
  {
    value: "credit-card",
    label: "Thẻ tín dụng/Ghi nợ",
  },
];

interface CheckoutInformationProps {
  userInformationDetail: UserInformationDetailProps;
  information: any;
}

type OrderDetailsTypes = {
  productId: number;
  quantity: number;
};

export const CheckoutInformation = ({
  userInformationDetail,
  information,
}: CheckoutInformationProps) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const [voucherCode, setVoucherCode] = useState<
    Record<string, any> | Vouchers
  >();
  const [isOpenVoucherDialog, setIsOpenVoucherDialog] =
    useState<boolean>(false);

    const {pending} = useFormStatus()

  console.log({ voucherCode });

  const formRefSubmitOrder = useRef<ElementRef<"form">>(null);
  const warningRefLackOfAddress = useRef<ElementRef<"div">>(null);

  const address = useAddress();
  const { address: addressValue } = address;
  const confirmDialog = useConfirmDialog();

  const router = useRouter();

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc +
        (product.discountPercent > 0
          ? product.discountPrice * (product.quantityOrder as number)
          : product.price * (product.quantityOrder as number)),
      0,
    );
  }

  const {
    data: vouchers,
    isError,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["voucher"],
    queryFn: () => getDataInClient("/Vouchers/GetAllVouchers"),
  });

  const {
    execute,
    data: paymentData,
    error: paymentError,
    isLoading: isPaymentLoading,
    fieldErrors,
  } = useAction(handlePaymentAction, {
    onSuccess(data) {
      toast.success("Vui lòng thanh toán đơn hàng của bạn!");
      console.log({ data });
      router.push(data.data.paymentUrl);
    },
    onError(error) {
      toast.error(error);
      console.log({ error });
    },
  });

  console.log({ fieldErrors, paymentData, paymentError, isPaymentLoading });

  // console.log({ vouchers });

  const handleSubmitOrder = async (formData: FormData) => {
    const message = formData.get("message-form") as string;
    const info = formData.get("informationUserOrder") as string;
    const voucherId = voucherCode?.voucherId;

    // console.log({ cart });

    let orderDetails: any;

    if (cart && cart.length > 0) {
      orderDetails = cart.map((product) => {
        return {
          productId: Number(product.productId),
          quantity: Number(product.quantityOrder),
        };
      });
    }

    const id = information.nameid as string;

    if (!addressValue) {
      warningRefLackOfAddress.current?.scrollIntoView({
        behavior: "smooth",
      });

      console.log("first");
      toast.error("Vui lòng nhập địa chỉ nhận hàng");
      return;
    }
    // formRefSubmitOrder.current?.s

    console.log({ message, id, orderDetails, voucherId });

    const addressShipping = addressValue;

    execute({ id, orderDetails, voucherId, addressShipping });
  };

  //* final price
  const currencyTransformed = formatCurrency(total);

  const { formattedDiscountAmount, formattedFinalTotal, discountPercent } =
    calculateDiscountedPrice(total, voucherCode?.discountPercent);

  return (
    <form
      className="px-10 pb-20"
      action={handleSubmitOrder}
      ref={formRefSubmitOrder}
    >
      <AddressReceiveOrder
        userInformationDetail={userInformationDetail}
        id="informationUserOrder"
        ref={warningRefLackOfAddress}
      />

      <Card className="my-4">
        <CardContent className="rounded-lg p-5">
          <Table>
            <TableCaption className="flex items-center justify-between">
              {/* test */}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#020918]">
                  <CardTitle>Sản Phẩm</CardTitle>
                </TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Thành tiền</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cart?.map((product) => (
                <ProductCheckout key={product.productId} product={product} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Voucher của shop</TableCell>
                <TableCell className="text-right">
                  {/* Todo: dialog to choose voucher in onClick button */}
                  <Dialog
                    open={isOpenVoucherDialog}
                    onOpenChange={setIsOpenVoucherDialog}
                  >
                    <DialogTrigger asChild>
                      <Button variant="book">Chọn Voucher</Button>
                    </DialogTrigger>
                    <DialogContent className="h-[70%] overflow-y-auto">
                      {/* <div className="flex gap-x-3"> */}
                      <div>
                        {vouchers?.map((voucher: Vouchers) => {
                          return (
                            <div
                              key={voucher.voucherId}
                              className="relative my-4 w-full cursor-pointer rounded-lg border border-slate-400 p-8 shadow-md duration-200 hover:border-slate-600 hover:shadow-xl"
                            >
                              <div className="flex items-center gap-x-1 text-base font-bold text-slate-700">
                                Mã giảm giá:
                                <h1 className="text-sky-500">{voucher.code}</h1>
                              </div>

                              <h2 className="text-xl font-bold text-[#ff6347]">
                                Giảm {voucher.discountPercent}%
                              </h2>

                              <h4 className="text-base font-semibold">
                                Cho tất cả sản phẩm trong giỏ hàng
                              </h4>

                              <p className="my-1 text-wrap text-base font-bold">
                                Từ{" "}
                                <span className="text-[#e58777]">
                                  {vietnameseDate(voucher.dateFrom)}
                                </span>{" "}
                              </p>

                              <p className="my-1 text-wrap text-base font-bold">
                                Đến{" "}
                                <span className="text-[#e58777]">
                                  {" "}
                                  {vietnameseDate(voucher.dateTo)}
                                </span>
                              </p>
                              {/* <p className="font-sm font-normal">
                                {voucher.additionalInfo}
                              </p> */}

                              {voucherCode?.voucherId === voucher.voucherId ? (
                                <Button
                                  variant="book"
                                  className="absolute right-3 top-1/2 z-30 flex justify-end"
                                  disabled
                                >
                                  Đã lưu
                                </Button>
                              ) : (
                                <Button
                                  variant="book"
                                  className="absolute right-3 top-1/2 flex justify-end"
                                  onClick={() => {
                                    setVoucherCode({ ...voucher });
                                    setIsOpenVoucherDialog(
                                      !isOpenVoucherDialog,
                                    );
                                  }}
                                >
                                  Lưu
                                </Button>
                              )}
                              {/* <Button
                                variant="book"
                                className="absolute right-3 top-1/2 flex justify-end"
                                onClick={() => {
                                  setVoucherCode({ ...voucher });
                                  setIsOpenVoucherDialog(!isOpenVoucherDialog);
                                }}
                              >
                                Lưu
                              </Button> */}
                            </div>
                          );
                        })}
                      </div>
                      {/* </div> */}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Separator />

          <div className="flex">
            <div className="flex w-[40%] flex-1 items-center gap-x-1">
              <h3 className="w-20 flex-1">Lời nhắn: </h3>
              {/* <form onSubmit={handleMessage}> */}
              <FormInput
                id="message-form"
                placeholder="Lưu ý cho admin shop"
                disabled={false}
                className="h-12 w-[400px]"
                labelClassName="text-neutral-700"
              />
              {/* </form> */}

              {/* <MessageForm /> */}
            </div>

            <Table className="w-full flex-1">
              <TableHeader>
                <TableRow>
                  <TableHead>Đơn vị vận chuyển:</TableHead>
                  <TableHead>Nhanh</TableHead>
                  <TableHead>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Thay Đổi</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <div className="flex flex-col gap-4">
                          <div>Nhanh</div>
                          <div>Tiét Kiệm</div>
                          <div>Hoả Tốc</div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableHead>
                  {/* <TableHead className="text-[#ff6347]">81.000</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody className="w-full hover:bg-transparent">
                <TableRow className="w-full hover:bg-transparent">
                  <TableCell colSpan={1}></TableCell>
                  <TableCell className="flex items-center gap-x-1 text-sm text-[#36ae9d]">
                    <Image
                      height={20}
                      width={20}
                      alt="express-delivery"
                      src="/images/express-delivery.svg"
                    />
                    Đảm bảo nhận hàng từ 30 Tháng 6 - 1 Tháng 7
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <CardFooter className="text-right">
            {/* Todo: Render number of product */}
            <div className="flex items-center gap-x-5">
              <h2>Tổng số tiền ({cart?.length} sản phẩm): </h2>
              <h2 className="font-bold text-[#ff6347]">
                {currencyTransformed}
              </h2>
            </div>
          </CardFooter>
        </CardContent>
      </Card>

      <Card className="my-5">
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs className="w-full" defaultValue="payment-upon-receipt">
            <TabsList className="w-full space-x-1">
              {tabsProps.map((tab) => (
                <TabsTrigger
                  className="w-52 border border-slate-600 data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <PaymentUponReceive value="payment-upon-receipt" />
            <CreditCardContent value="credit-card" />
          </Tabs>

          <CardFooter className="flex justify-end">
            <div className="flex flex-col space-y-4 rounded-lg p-4 duration-200 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Tổng số tiền:</span>
                <span className="text-lg font-bold">{currencyTransformed}</span>
              </div>
              {voucherCode?.discountPercent && (
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">
                    Giảm giá với voucher của shop
                  </span>
                  <span className="rounded-md px-2 py-1 text-right text-lg font-medium text-sky-600">
                    {discountPercent}%
                  </span>
                </div>
              )}
              {voucherCode?.voucherId && (
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">
                    Tổng cộng voucer giảm giá:
                  </span>
                  <span className="rounded-md px-2 py-1 text-right text-lg font-medium text-[#ed9080]">
                    {formattedDiscountAmount}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between gap-x-1">
                <span className="text-lg font-medium">Tổng thanh toán:</span>
                <h1 className="text-2xl font-bold text-[#ff6347]">
                  {formattedFinalTotal}
                </h1>
              </div>
            </div>
          </CardFooter>

          <CardFooter className="flex items-center justify-between">
            <div>
              Để đảm bảo đơn hàng của bạn, bạn hãy kiểm tra lại đơn hàng của
              mình trước khi Đặt Hàng
            </div>
            <Button
              disabled={pending}
              type="button"
              className="w-64 text-right"
              variant="book"
              onClick={() => confirmDialog.onOpen()}
            >
              Đặt hàng
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
      <ConfirmDialog
        handleSubmitOrder={() => formRefSubmitOrder.current?.requestSubmit()}
      />
    </form>
  );
};
